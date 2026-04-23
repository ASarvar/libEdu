"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

function NavLinks() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <ul className="navigation">
        <li className={isActive("/") ? "current" : ""}>
          <Link href="/">{t("header.home")}</Link>
        </li>
        <li className={`dropdown${isActive("/digital-library") ? " current" : ""}`}>
          <Link href="/digital-library">{t("header.digitalLibrary")}</Link>
          <ul>
            <li>
              <Link href="/digital-library/books">
                {t("digitalLibrary.books")}
              </Link>
            </li>
            <li>
              <Link href="/digital-library/audio">
                {t("digitalLibrary.audioBooks")}
              </Link>
            </li>
            <li>
              <Link href="/digital-library/video">
                {t("digitalLibrary.videoLectures")}
              </Link>
            </li>
            <li>
              <Link href="/digital-library/catalog">{t("catalog.title")}</Link>
            </li>
          </ul>
        </li>
        <li className={isActive("/events") ? " current" : ""}>
          <Link href="/events">{t("header.events")}</Link>
        </li>
        <li className={isActive("/news") ? " current" : ""}>
          <Link href="/news">{t("header.news")}</Link>
        </li>
        <li className={isActive("/about") ? " current" : ""}>
          <Link href="/about">{t("header.about")}</Link>
        </li>
        <li className={isActive("/contact") ? "current" : ""}>
          <Link href="/contact">{t("header.contact")}</Link>
        </li>
      </ul>
    </>
  );
}

export default NavLinks;

