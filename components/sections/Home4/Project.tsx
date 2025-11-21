"use client";

import { useState } from "react";
import Link from "next/link";

const tabs = [
  { key: "all", label: "All Project" },
  { key: "Marketing", label: "Marketing" },
  { key: "Optimization", label: "Optimization" },
  { key: "Consulting", label: "Consulting" },
];

export default function ProjectSection() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className="project-section-4 fix section-padding">
      	<div className="auto-container">
        	{/* ---- Section Title ---- */}
			<div className="sec-title">
			<div className="row g-4 justify-content-between align-items-center">
				<div className="col-xl-5">
				<h6 className="sub-title">
					<span className="triangle triangle1"></span>
					<span className="triangle triangle2"></span>
					Case Studies
				</h6>
				<h2 className="wow fadeInUp animated" data-wow-delay=".2s">Where imagination takes center stage</h2>
				</div>

				{/* ---- Nav Tabs ---- */}
				<div className="col-xl-7">
				<ul className="nav justify-content-end">
					{tabs.map((tab, index) => (
					<li className="nav-item" key={tab.key}>
						<button
						onClick={() => setActiveTab(tab.key)}
						className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
						>
						{tab.label}
						</button>
					</li>
					))}
				</ul>
				</div>
			</div>
			</div>
		</div>
        {/* ---- Tab Content ---- */}
        <div className="project-wrapper-4">
          <div className="tab-content">
            {/* All Projects */}
            {activeTab === "all" && (
              <div className="tab-pane fade show active">
                <div className="row">
					<div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
						<div className="project-image-4">
							<img src="images/home-4/project/project-01.jpg" alt="img"/>
							<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
						<div className="project-image-4">
							<img src="images/home-4/project/project-02.jpg" alt="img"/>
							<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
						<div className="project-image-4">
							<img src="images/home-4/project/project-03.jpg" alt="img"/>
							<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
						<div className="project-image-4">
							<img src="images/home-4/project/project-04.jpg" alt="img"/>
							<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
						<div className="project-image-4">
							<img src="images/home-4/project/project-05.jpg" alt="img"/>
							<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
						</div>
					</div>
					<div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
						<div className="project-image-4">
							<img src="images/home-4/project/project-06.jpg" alt="img"/>
							<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
						</div>
					</div>
				</div>
              </div>
            )}

            {/* Marketing */}
            {activeTab === "Marketing" && (
              <div className="tab-pane fade show active">
                <div className="row">
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-01.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-02.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-03.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-05.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-06.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-04.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>

					</div>
              </div>
            )}

            {/* Optimization */}
            {activeTab === "Optimization" && (
              <div className="tab-pane fade show active">
               <div className="row">
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-02.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-03.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-01.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-04.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-05.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-06.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
					</div>
              </div>
            )}

            {/* Consulting */}
            {activeTab === "Consulting" && (
              <div className="tab-pane fade show active">
                <div className="row">
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-01.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-02.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-03.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-05.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-3 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-06.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>
						<div className="col-xl-6 col-lg-6 col-md-6">
							<div className="project-image-4">
								<img src="images/home-4/project/project-04.jpg" alt="img"/>
								<h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
							</div>
						</div>

					</div>
              </div>
            )}
          </div>
        </div>
    </section>
  );
}
