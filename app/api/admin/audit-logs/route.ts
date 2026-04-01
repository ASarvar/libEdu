import { NextRequest } from "next/server";
import { withAuthAndRateLimit } from "@/lib/api-auth";
import { apiError, apiOk } from "@/lib/api-response";
import { query as dbQuery } from "@/lib/db";

const AUDIT_LOGS_PER_PAGE = 50;

export const GET = withAuthAndRateLimit(
  async (request: NextRequest, user: any) => {
    // Verify admin/superadmin access
    if (user.role !== "admin" && user.role !== "superadmin") {
      return apiError(403, {
        code: "UNAUTHORIZED",
        message: "Admin access required",
      });
    }

    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "1");
      const limit = parseInt(
        url.searchParams.get("limit") || String(AUDIT_LOGS_PER_PAGE)
      );
      const userId = url.searchParams.get("userId");
      const action = url.searchParams.get("action");
      const entityType = url.searchParams.get("entityType");
      const ALLOWED_SORT_COLUMNS = ['created_at', 'action', 'entity_type', 'user_id'] as const;
      const sortByParam = url.searchParams.get("sortBy") || "created_at";
      const sortBy = (ALLOWED_SORT_COLUMNS as readonly string[]).includes(sortByParam)
        ? sortByParam
        : "created_at";
      const sortOrder = url.searchParams.get("sortOrder") || "DESC";

      // Validate pagination
      if (page < 1 || limit < 1 || limit > 200) {
        return apiError(400, {
          code: "INVALID_INPUT",
          message: "Invalid pagination parameters",
        });
      }

      // Validate sort order
      if (!["ASC", "DESC"].includes(sortOrder.toUpperCase())) {
        return apiError(400, {
          code: "INVALID_INPUT",
          message: "Invalid sort order",
        });
      }

      // Build query with filters
      let whereClause = "WHERE 1=1";
      const params: any[] = [];

      if (userId) {
        params.push(userId);
        whereClause += ` AND user_id = $${params.length}`;
      }

      if (action) {
        params.push(action);
        whereClause += ` AND action = $${params.length}`;
      }

      if (entityType) {
        params.push(entityType);
        whereClause += ` AND entity_type = $${params.length}`;
      }

      // Get total count
      const countQueryStr = `SELECT COUNT(*) as count FROM audit_logs ${whereClause}`;
      const countResult = await dbQuery(countQueryStr, params);
      const totalCount = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalCount / limit);

      // Get paginated results
      const offset = (page - 1) * limit;
      params.push(limit);
      params.push(offset);

      const selectQueryStr = `
        SELECT 
          al.id,
          al.user_id,
          al.action,
          al.entity_type,
          al.entity_id,
          al.details,
          al.ip_address,
          al.created_at,
          u.full_name as admin_name,
          u.email as admin_email
        FROM audit_logs al
        LEFT JOIN users u ON al.user_id = u.id
        ${whereClause}
        ORDER BY ${sortBy} ${sortOrder.toUpperCase()}
        LIMIT $${params.length - 1} OFFSET $${params.length}
      `;

      const result = await dbQuery(selectQueryStr, params);

      return apiOk({
        logs: result.rows,
        pagination: {
          page,
          limit,
          totalCount,
          totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      return apiError(500, {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch audit logs",
      });
    }
  },
  { allowedRoles: ["admin", "superadmin"] }
);
