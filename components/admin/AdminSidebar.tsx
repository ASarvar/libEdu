"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import LogoMain from "../../public/images/logo.svg";
import MobileLogo from "../../public/images/logo_short.svg";

const AdminSidebar = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      router.push('/login');
    }
  };

  const menuItems = [
    {
      title: t('admin.dashboard'),
      icon: 'fa-chart-line',
      path: '/admin/dashboard',
      badge: null,
    },
    {
      title: t('admin.sites.title'),
      icon: 'fa-globe',
      path: '/admin/sites',
      badge: null,
    },
    {
      title: t('admin.users'),
      icon: 'fa-users',
      path: '/admin/users',
      badge: null,
    },
    {
      title: t('admin.books'),
      icon: 'fa-book',
      path: '/admin/books',
      badge: null,
    },
    {
      title: t('admin.news'),
      icon: 'fa-newspaper',
      path: '/admin/news',
      badge: null,
    },
    {
      title: t('admin.events'),
      icon: 'fa-calendar-alt',
      path: '/admin/events',
      badge: null,
    },
    {
      title: t('admin.categories'),
      icon: 'fa-tags',
      path: '/admin/categories',
      badge: null,
    },
    {
      title: t('admin.submissions'),
      icon: 'fa-envelope',
      path: '/admin/submissions',
      badge: 'new',
    },
    {
      title: t('admin.settings'),
      icon: 'fa-cog',
      path: '/admin/settings',
      badge: null,
    },
  ];

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="admin-sidebar-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle Sidebar"
      >
        <i className={`fa ${isCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo">
            <Image 
              src={isCollapsed ? MobileLogo : LogoMain} 
              alt="Kutubxona Logo"
            />
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li key={index} className={`nav-item ${isActive(item.path) ? 'active' : ''}`}>
                <Link href={item.path} className="nav-link">
                  <i className={`fa ${item.icon} nav-icon`}></i>
                  {!isCollapsed && (
                    <>
                      <span className="nav-text">{item.title}</span>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="nav-link logout-link">
            <i className="fa fa-sign-out-alt nav-icon"></i>
            {!isCollapsed && <span className="nav-text">{t('admin.logout')}</span>}
          </button>
        </div>

        {/* Collapse Toggle */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? t('admin.expandSidebar') : t('admin.collapseSidebar')}
        >
          <i className={`fa ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
        </button>
      </aside>

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div 
          className="admin-sidebar-overlay"
          onClick={() => setIsCollapsed(true)}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
