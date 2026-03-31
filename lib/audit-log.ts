import { logAuditAction } from "@/lib/auth";

export type AuditAction =
  | "USER_CREATE"
  | "USER_UPDATE"
  | "USER_DELETE"
  | "SITE_CREATE"
  | "SITE_UPDATE"
  | "SITE_DELETE"
  | "NEWS_CREATE"
  | "NEWS_UPDATE"
  | "NEWS_DELETE"
  | "NEWS_PUBLISH"
  | "NEWS_UNPUBLISH"
  | "BOOK_CREATE"
  | "BOOK_UPDATE"
  | "BOOK_DELETE"
  | "CATEGORY_CREATE"
  | "CATEGORY_UPDATE"
  | "CATEGORY_DELETE"
  | "SUBMISSION_CREATE"
  | "SUBMISSION_REVIEW"
  | "SUBMISSION_DELETE"
  | "ADMIN_LOGIN"
  | "ADMIN_LOGOUT"
  | "SETTINGS_UPDATE"
  | "UPLOAD_FILE"
  | "DELETE_FILE";

export interface AuditLogInput {
  userId?: string;
  action: AuditAction;
  entityType?: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
}

/**
 * Create an audit log entry for admin actions
 * Uses existing logAuditAction from auth.ts
 */
export async function createAuditLog(input: AuditLogInput): Promise<void> {
  try {
    await logAuditAction(
      input.userId || null,
      input.action,
      input.entityType,
      input.entityId,
      input.details,
      input.ipAddress
    );
  } catch (error) {
    console.error("Error creating audit log:", error);
    // Don't throw - audit logging should not break the main operation
  }
}

/**
 * Log a user creation
 */
export async function logUserCreate(
  adminId: string,
  userId: string,
  userData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "USER_CREATE",
    entityType: "user",
    entityId: userId,
    details: {
      email: userData.email,
      role: userData.role,
      full_name: userData.full_name,
    },
    ipAddress,
  });
}

/**
 * Log a user update
 */
export async function logUserUpdate(
  adminId: string,
  userId: string,
  changes: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "USER_UPDATE",
    entityType: "user",
    entityId: userId,
    details: changes,
    ipAddress,
  });
}

/**
 * Log a user deletion
 */
export async function logUserDelete(
  adminId: string,
  userId: string,
  userData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "USER_DELETE",
    entityType: "user",
    entityId: userId,
    details: {
      email: userData.email,
      role: userData.role,
      full_name: userData.full_name,
    },
    ipAddress,
  });
}

/**
 * Log a site creation
 */
export async function logSiteCreate(
  adminId: string,
  siteId: string,
  siteData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "SITE_CREATE",
    entityType: "site",
    entityId: siteId,
    details: {
      subdomain: siteData.subdomain,
      name: siteData.name,
    },
    ipAddress,
  });
}

/**
 * Log a site update
 */
export async function logSiteUpdate(
  adminId: string,
  siteId: string,
  changes: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "SITE_UPDATE",
    entityType: "site",
    entityId: siteId,
    details: changes,
    ipAddress,
  });
}

/**
 * Log a site deletion
 */
export async function logSiteDelete(
  adminId: string,
  siteId: string,
  siteData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "SITE_DELETE",
    entityType: "site",
    entityId: siteId,
    details: {
      subdomain: siteData.subdomain,
      name: siteData.name,
    },
    ipAddress,
  });
}

/**
 * Log a news creation
 */
export async function logNewsCreate(
  adminId: string,
  newsId: string,
  newsData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "NEWS_CREATE",
    entityType: "news",
    entityId: newsId,
    details: {
      title: newsData.title,
      siteId: newsData.siteId,
    },
    ipAddress,
  });
}

/**
 * Log a news update
 */
export async function logNewsUpdate(
  adminId: string,
  newsId: string,
  changes: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "NEWS_UPDATE",
    entityType: "news",
    entityId: newsId,
    details: changes,
    ipAddress,
  });
}

/**
 * Log a news deletion
 */
export async function logNewsDelete(
  adminId: string,
  newsId: string,
  newsData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "NEWS_DELETE",
    entityType: "news",
    entityId: newsId,
    details: {
      title: newsData.title,
      siteId: newsData.siteId,
    },
    ipAddress,
  });
}

/**
 * Log a news publish action
 */
export async function logNewsPublish(
  adminId: string,
  newsId: string,
  newsData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "NEWS_PUBLISH",
    entityType: "news",
    entityId: newsId,
    details: {
      title: newsData.title,
      siteId: newsData.siteId,
    },
    ipAddress,
  });
}

/**
 * Log a news unpublish action
 */
export async function logNewsUnpublish(
  adminId: string,
  newsId: string,
  newsData: Record<string, any>,
  ipAddress?: string
): Promise<void> {
  await createAuditLog({
    userId: adminId,
    action: "NEWS_UNPUBLISH",
    entityType: "news",
    entityId: newsId,
    details: {
      title: newsData.title,
      siteId: newsData.siteId,
    },
    ipAddress,
  });
}

/**
 * Get IP address from request headers
 */
export function getIpFromRequest(request: Request): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") || undefined;
}
