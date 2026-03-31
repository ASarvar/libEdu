"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface CategoriesManagementPageProps {
  user: User;
}

const CategoriesManagementContent: React.FC<CategoriesManagementPageProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t('admin.categories')}</h2>
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

const CategoriesManagementPage = withAdminAuth(CategoriesManagementContent);

export default CategoriesManagementPage;