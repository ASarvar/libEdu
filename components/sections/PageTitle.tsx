'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  const { t } = useTranslation();
  
  return (
    <>
    <section className="page-title">
        <div className="auto-container">
            <div className="title-outer">
                <ul className="page-breadcrumb fadeInUp">
                    <li><Link href="/">{t('header.home')}</Link></li>
                    <li>{title}</li>
                </ul>
                <h1 className="title">{title}</h1>
            </div>
        </div>
    </section>
    </>
  );
};

export default PageTitle;