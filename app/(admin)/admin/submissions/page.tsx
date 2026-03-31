"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface SubmissionsManagementPageProps {
  user: User;
}

const SubmissionsManagementContent: React.FC<SubmissionsManagementPageProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t('admin.submissions')}</h2>
          </div>

          <div className="admin-info-alert">
            <i className="fa fa-info-circle"></i>
            {t('common.comingSoon', 'Coming soon...')}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

const SubmissionsManagementPage = withAdminAuth(SubmissionsManagementContent);

export default SubmissionsManagementPage;