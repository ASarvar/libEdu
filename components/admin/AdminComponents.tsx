/**
 * Reusable Admin UI Components
 * Consistent styling and behavior across admin pages
 */

import React from 'react';

// Admin Card Component
interface AdminCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  title,
  children,
  className = '',
  actions,
}) => {
  return (
    <div className={`admin-card ${className}`}>
      {(title || actions) && (
        <div className="admin-card-header">
          {title && <h3 className="admin-card-title">{title}</h3>}
          {actions && <div className="admin-card-actions">{actions}</div>}
        </div>
      )}
      <div className="admin-card-body">{children}</div>
    </div>
  );
};

// Admin Table Component
interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function AdminTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
}: AdminTableProps<T>) {
  if (loading) {
    return (
      <div className="admin-table-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="admin-table-empty">
        <i className="fa fa-inbox"></i>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={column.sortable ? 'sortable' : ''}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item)
                    : (item as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Admin Form Group
interface AdminFormGroupProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  helpText?: string;
}

export const AdminFormGroup: React.FC<AdminFormGroupProps> = ({
  label,
  required = false,
  error,
  children,
  helpText,
}) => {
  return (
    <div className={`admin-form-group ${error ? 'has-error' : ''}`}>
      <label className="admin-form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
      {helpText && <small className="admin-form-help">{helpText}</small>}
      {error && <span className="admin-form-error">{error}</span>}
    </div>
  );
};

// Admin Button
interface AdminButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
  fullWidth?: boolean;
}

export const AdminButton: React.FC<AdminButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  icon,
  fullWidth = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`admin-btn admin-btn-${variant} admin-btn-${size} ${
        fullWidth ? 'admin-btn-full' : ''
      }`}
    >
      {loading && <span className="spinner-small"></span>}
      {!loading && icon && <i className={`fa ${icon} btn-mr-8`}></i>}
      {children}
    </button>
  );
};

// Admin Badge
interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';
}

export const AdminBadge: React.FC<AdminBadgeProps> = ({
  children,
  variant = 'default',
}) => {
  return <span className={`admin-badge admin-badge-${variant}`}>{children}</span>;
};

// Admin Alert
interface AdminAlertProps {
  children: React.ReactNode;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
  icon?: string;
}

export const AdminAlert: React.FC<AdminAlertProps> = ({
  children,
  type = 'info',
  onClose,
  icon,
}) => {
  const defaultIcons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-circle',
    warning: 'fa-exclamation-triangle',
    info: 'fa-info-circle',
  };

  return (
    <div className={`admin-alert admin-alert-${type}`}>
      <i className={`fa ${icon || defaultIcons[type]}`}></i>
      <div className="admin-alert-content">{children}</div>
      {onClose && (
        <button className="admin-alert-close" onClick={onClose}>
          <i className="fa fa-times"></i>
        </button>
      )}
    </div>
  );
};

// Admin Stats Card
interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
}

export const AdminStatsCard: React.FC<AdminStatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  color = 'blue',
}) => {
  return (
    <div className={`admin-stats-card admin-stats-${color}`}>
      <div className="admin-stats-icon">
        <i className={`fa ${icon}`}></i>
      </div>
      <div className="admin-stats-content">
        <h4 className="admin-stats-title">{title}</h4>
        <div className="admin-stats-value">{value}</div>
        {trend && (
          <div
            className={`admin-stats-trend ${
              trend.isPositive ? 'positive' : 'negative'
            }`}
          >
            <i
              className={`fa fa-arrow-${trend.isPositive ? 'up' : 'down'}`}
            ></i>
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
    </div>
  );
};

// Admin Modal
interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
}) => {
  if (!isOpen) return null;

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className={`admin-modal admin-modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <h3>{title}</h3>
          <button className="admin-modal-close" onClick={onClose}>
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="admin-modal-body">{children}</div>
        {footer && <div className="admin-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};
