"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface MobileMenuProps {
  extraClassName?: string;
}

interface DropdownState {
  status: boolean;
  key: number | null;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ extraClassName }) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<DropdownState>({
    status: false,
    key: null,
  });

  const [isSubActive, setSubIsActive] = useState<DropdownState>({
    status: false,
    key: null,
  });

  const handleClick = (key: number) => {
    if (isActive.key === key) {
      setIsActive({ status: false, key: null });
    } else {
      setIsActive({ status: true, key });
    }
  };

  const handleSubClick = (key: number) => {
    if (isSubActive.key === key) {
      setSubIsActive({ status: false, key: null });
    } else {
      setSubIsActive({ status: true, key });
    }
  };

  return (
    <ul className={`navigation d-block d-lg-none ${extraClassName || ""}`}>
      <li>
        <Link href="/">{t("header.home")}</Link>
      </li>
      <li className="dropdown">
        <Link href="/digital-library">{t("header.digitalLibrary")}</Link>
        <ul className={isActive.key === 1 ? "d-block" : "d-none"}>
          <li>
            <Link href="/digital-library/books">{t("digitalLibrary.books")}</Link>
          </li>
          <li>
            <Link href="/digital-library/audio">{t("digitalLibrary.audioBooks")}</Link>
          </li>
          <li>
            <Link href="/digital-library/video">{t("digitalLibrary.videoLectures")}</Link>
          </li>
          <li>
            <Link href="/digital-library/catalog">{t("catalog.title")}</Link>
          </li>
        </ul>
        <div
          className={isActive.key === 1 ? "dropdown-btn active" : "dropdown-btn"}
          onClick={() => handleClick(1)}
        >
          <i className="fa fa-angle-down" />
        </div>
      </li>
      <li className="dropdown">
        <Link href="/events">{t("header.events")}</Link>
        <ul className={isActive.key === 2 ? "d-block" : "d-none"}>
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
        <div
          className={isActive.key === 2 ? "dropdown-btn active" : "dropdown-btn"}
          onClick={() => handleClick(2)}
        >
          <i className="fa fa-angle-down" />
        </div>
      </li>
      <li className="dropdown">
        <Link href="/news">{t("header.news")}</Link>
        <ul className={isActive.key === 3 ? "d-block" : "d-none"}>
          <li>
            <Link href="/news">{t("news.latestNews")}</Link>
          </li>
          <li>
            <Link href="/news/category">{t("news.category")}</Link>
          </li>
        </ul>
        <div
          className={isActive.key === 3 ? "dropdown-btn active" : "dropdown-btn"}
          onClick={() => handleClick(3)}
        >
          <i className="fa fa-angle-down" />
        </div>
      </li>
      <li className="dropdown">
        <Link href="/about">{t("header.about")}</Link>
        <ul className={isActive.key === 4 ? "d-block" : "d-none"}>
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
        <div
          className={isActive.key === 4 ? "dropdown-btn active" : "dropdown-btn"}
          onClick={() => handleClick(4)}
        >
          <i className="fa fa-angle-down" />
        </div>
      </li>
      <li>
        <Link href="/contact">{t("header.contact")}</Link>
      </li>
    </ul>
  );
};

export default MobileMenu;