"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface AuditLogEntry {
  id: string;
  user_id: string;
  admin_name: string;
  admin_email: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: Record<string, any>;
  ip_address: string;
  created_at: string;
}

interface AuditLogsResponse {
  logs: AuditLogEntry[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

interface AuditLogsPageProps {
  user: User;
}

const AuditLogsContent: React.FC<AuditLogsPageProps> = ({ user }) => {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    userId: "",
    action: "",
    entityType: "",
  });

  useEffect(() => {
    fetchLogs();
  }, [page, filters]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("limit", "50");

      if (filters.userId) {
        params.append("userId", filters.userId);
      }
      if (filters.action) {
        params.append("action", filters.action);
      }
      if (filters.entityType) {
        params.append("entityType", filters.entityType);
      }

      const response = await fetch(`/api/admin/audit-logs?${params}`);

      if (response.ok) {
        const data: AuditLogsResponse = await response.json();
        setLogs(data.logs);
        setTotalPages(data.pagination.totalPages);
      } else {
        console.error("Error fetching audit logs:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (
    field: string,
    value: string
  ) => {
    setFilters({
      ...filters,
      [field]: value,
    });
    setPage(1); // Reset to first page when filtering
  };

  const getActionBadgeClass = (action: string): string => {
    if (action.includes("CREATE")) return "badge-success";
    if (action.includes("UPDATE")) return "badge-info";
    if (action.includes("DELETE")) return "badge-danger";
    if (action.includes("PUBLISH")) return "badge-warning";
    return "badge-secondary";
  };

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title text-center mb-50">
            <h2>Audit Logs</h2>
            <p>Track all admin actions and changes</p>
          </div>

          {/* Filters */}
          <div className="row mb-30">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by User ID..."
                value={filters.userId}
                onChange={(e) => handleFilterChange("userId", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-control"
                value={filters.action}
                onChange={(e) => handleFilterChange("action", e.target.value)}
              >
                <option value="">All Actions</option>
                <option value="USER_CREATE">User Create</option>
                <option value="USER_UPDATE">User Update</option>
                <option value="USER_DELETE">User Delete</option>
                <option value="SITE_CREATE">Site Create</option>
                <option value="SITE_UPDATE">Site Update</option>
                <option value="SITE_DELETE">Site Delete</option>
                <option value="NEWS_CREATE">News Create</option>
                <option value="NEWS_UPDATE">News Update</option>
                <option value="NEWS_DELETE">News Delete</option>
                <option value="NEWS_PUBLISH">News Publish</option>
              </select>
            </div>
            <div className="col-md-4">
              <select
                className="form-control"
                value={filters.entityType}
                onChange={(e) => handleFilterChange("entityType", e.target.value)}
              >
                <option value="">All Entity Types</option>
                <option value="user">User</option>
                <option value="site">Site</option>
                <option value="news">News</option>
                <option value="book">Book</option>
              </select>
            </div>
          </div>

          {/* Audit Logs Table */}
          {loading ? (
            <div className="text-center">
              <div className="spinner"></div>
              <p>Loading audit logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="admin-info-alert">
              <i className="fa fa-info-circle"></i>
              No audit logs found
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Admin</th>
                      <th>Action</th>
                      <th>Entity Type</th>
                      <th>Entity ID</th>
                      <th>IP Address</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td>
                          <small>
                            {new Date(log.created_at).toLocaleString()}
                          </small>
                        </td>
                        <td>
                          <small>{log.admin_name || log.admin_email}</small>
                        </td>
                        <td>
                          <span className={`status-badge ${getActionBadgeClass(log.action)}`}>
                            {log.action}
                          </span>
                        </td>
                        <td>
                          <code>{log.entity_type}</code>
                        </td>
                        <td>
                          <code style={{ fontSize: "0.8rem" }}>
                            {log.entity_id?.substring(0, 8)}...
                          </code>
                        </td>
                        <td>
                          <small>{log.ip_address || "N/A"}</small>
                        </td>
                        <td>
                          <details>
                            <summary style={{ cursor: "pointer", color: "#3498db" }}>
                              View
                            </summary>
                            <pre style={{ fontSize: "0.75rem", marginTop: "10px" }}>
                              {JSON.stringify(log.details, null, 2)}
                            </pre>
                          </details>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination-controls" style={{ marginTop: "30px", textAlign: "center" }}>
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="btn btn-sm"
                  style={{ marginRight: "10px" }}
                >
                  ← Previous
                </button>
                <span style={{ margin: "0 20px" }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                  className="btn btn-sm"
                  style={{ marginLeft: "10px" }}
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </AdminLayout>
  );
};

const AuditLogsPage = withAdminAuth(AuditLogsContent);

export default AuditLogsPage;
