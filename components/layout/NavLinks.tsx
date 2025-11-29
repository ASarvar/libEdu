"use client";
import React from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function NavLinks() {
  const { t } = useTranslation();

  return (
    <>
      <ul className="navigation">
        <li className="current">
          <Link href="/">{t("header.home")}</Link>
        </li>
        <li className="dropdown">
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
        <li className="dropdown">
          <Link href="/events">{t("header.events")}</Link>
          <ul>
            <li>
              <Link href="/events">{t("events.upcomingEvents")}</Link>
            </li>
            <li>
              <Link href="/events/past">{t("events.pastEvents")}</Link>
            </li>
            <li>
              <Link href="/events/register">{t("events.register")}</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <Link href="/news">{t("header.news")}</Link>
          <ul>
            <li>
              <Link href="/news">{t("news.latestNews")}</Link>
            </li>
            <li>
              <Link href="/news/category">{t("news.category")}</Link>
            </li>
          </ul>
        </li>
        <li className="dropdown">
          <Link href="/about">{t("header.about")}</Link>
          <ul>
            <li>
              <Link href="/about">{t("about.aboutUs")}</Link>
            </li>
            <li>
              <Link href="/about/team">{t("about.team")}</Link>
            </li>
            <li>
              <Link href="/about/branches">{t("about.branches")}</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/contact">{t("header.contact")}</Link>
        </li>
      </ul>
    </>
  );
}

export default NavLinks;
