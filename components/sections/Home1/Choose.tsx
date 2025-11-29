"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

const getTabs = (t: any) => [
  {
    id: "Mission",
    titleKey: "whyChoose.mission.title",
    descKey: "whyChoose.mission.desc",
    listKeys: [
      "whyChoose.mission.list1",
      "whyChoose.mission.list2",
      "whyChoose.mission.list3",
    ],
    progressKeys: [
      { labelKey: "whyChoose.mission.progress1", value: 95 },
      { labelKey: "whyChoose.mission.progress2", value: 85 },
    ],
  },
  {
    id: "Vision",
    titleKey: "whyChoose.vision.title",
    descKey: "whyChoose.vision.desc",
    listKeys: [
      "whyChoose.vision.list1",
      "whyChoose.vision.list2",
      "whyChoose.vision.list3",
    ],
    progressKeys: [
      { labelKey: "whyChoose.vision.progress1", value: 85 },
      { labelKey: "whyChoose.vision.progress2", value: 75 },
    ],
  },
  {
    id: "Philosophy",
    titleKey: "whyChoose.philosophy.title",
    descKey: "whyChoose.philosophy.desc",
    listKeys: [
      "whyChoose.philosophy.list1",
      "whyChoose.philosophy.list2",
      "whyChoose.philosophy.list3",
    ],
    progressKeys: [
      { labelKey: "whyChoose.philosophy.progress1", value: 88 },
      { labelKey: "whyChoose.philosophy.progress2", value: 78 },
    ],
  },
  {
    id: "Achievement",
    titleKey: "whyChoose.achievement.title",
    descKey: "whyChoose.achievement.desc",
    listKeys: [
      "whyChoose.achievement.list1",
      "whyChoose.achievement.list2",
      "whyChoose.achievement.list3",
    ],
    progressKeys: [
      { labelKey: "whyChoose.achievement.progress1", value: 92 },
      { labelKey: "whyChoose.achievement.progress2", value: 85 },
    ],
  },
];

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const tabs = getTabs(t);
  const [activeTab, setActiveTab] = useState("Mission");
  const [animatedProgress, setAnimatedProgress] = useState<number[]>([]);

  const activeData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  // Animate progress whenever tab changes
  useEffect(() => {
    if (!activeData) return;
    let start = Array(activeData.progressKeys.length).fill(0);
    const step = () => {
      let done = true;
      start = start.map((val, i) => {
        if (val < activeData.progressKeys[i].value) {
          done = false;
          return Math.min(val + 1, activeData.progressKeys[i].value);
        }
        return val;
      });
      setAnimatedProgress([...start]);
      if (!done) requestAnimationFrame(step);
    };
    step();
  }, [activeTab]);

  return (
    <section
      className="why-choose-section fix section-bg"
      style={{
        backgroundImage:
          "url('images/home-1/choose-us/choose-us-shape.png')",
      }}
    >
      <div className="auto-container">
        <div className="why-choose-us-wrapper">
          <div className="row g-4 align-items-center">
            {/* Left Image */}
            <div className="col-xl-5">
              <div className="why-choose-us-image-1">
                <img
                  src="images/home-1/choose-us/choose-us.jpg"
                  alt="img"
                  className="wow img-custom-anim-left"
                />
                <div className="icon-box-items">
                  <div className="icon">
                    <i className="flaticon-business-006-target"></i>
                  </div>
                  <h3>{t('whyChoose.award')}</h3>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-xl-7">
              <div className="why-choose-us-content-1">
                <div className="sec-title mb-0">
                  <h6 className="sub-title">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    {t('whyChoose.subtitle')}
                  </h6>
                  <h2>{t('whyChoose.title')}</h2>
                </div>

                {/* Tab Nav */}
                <ul className="nav">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${
                          activeTab === tab.id ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {t(tab.titleKey)}
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Tab Content */}
                <div className="tab-content">
                  <div className="why-choose-list">
                    <h3>{t(activeData.titleKey)}</h3>
                    <p>{t(activeData.descKey)}</p>
                  </div>
                  <div className="why-choose-list-items">
                    <ul className="why-list">
                      {activeData.listKeys.map((itemKey, index) => (
                        <li key={index}>
                          <span className="icon">
                            <i className="fa-solid fa-check"></i>
                          </span>
                          {t(itemKey)}
                        </li>
                      ))}
                    </ul>

                    {/* Animated Progress Bars */}
                    <div className="choose-us-progressbar">
                      {activeData.progressKeys.map((prog, index) => (
                       <div className="progress-container" key={index}>
                          <div
                            className="circular-progress"
                            style={{
                              background: `conic-gradient(var(--theme-color1) ${animatedProgress[index] * 3.6}deg, #D4D4D4 0deg)`,
                              width: "150px",
                              height: "150px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: "1",
                              position: "relative",
                            }}
                          >
                            {/* Inner circle with count */}
                            <div
                              style={{
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "500",
                                fontSize: "21px",
                                color: "#000",
                                zIndex: "1",
                              }}
                            >
                              {animatedProgress[index]}%
                            </div>
                          </div>

                          {/* Label under progress bar */}
                          <div
                            className="text"
                            style={{ marginTop: "8px", fontWeight: "500", textAlign: "center" }}
                          >
                            {t(prog.labelKey)}
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Right */}
          </div>
        </div>
      </div>
    </section>
  );
}
