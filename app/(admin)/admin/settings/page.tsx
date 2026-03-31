"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface SettingsPageProps {
  user: User;
}

const SettingsContent: React.FC<SettingsPageProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t('admin.settings')}</h2>
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

const SettingsPage = withAdminAuth(SettingsContent);

export default SettingsPage;