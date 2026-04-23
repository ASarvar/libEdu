"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface DropdownState {
  status: boolean;
  key: number | null;
}

const MobileMenu: React.FC = () => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState<DropdownState>({
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

  return (
    <>
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
      <li>
        <Link href="/events">{t("header.events")}</Link>
      </li>
      <li>
        <Link href="/news">{t("header.news")}</Link>
      </li>
      <li>
        <Link href="/about">{t("header.about")}</Link>
      </li>
      <li>
        <Link href="/contact">{t("header.contact")}</Link>
      </li>
    </>
  );
};

export default MobileMenu;