"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import AdminLayout from "@/components/admin/AdminLayout";
import { withAdminAuth, User } from "@/lib/client-auth";

interface BooksManagementPageProps {
  user: User;
}

const BooksManagementContent: React.FC<BooksManagementPageProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <section className="admin-dashboard">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2>{t('admin.books')}</h2>
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

const BooksManagementPage = withAdminAuth(BooksManagementContent);

export default BooksManagementPage;