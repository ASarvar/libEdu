import React from "react";
import Link from "next/link";


function Project (){
    return (
            <section className="project-section fix section-padding">
                <div className="row g-4">
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                        <div className="project-image-4 mt-0">
                            <img src="images/home-4/project/project-01.jpg" alt="img"/>
                            <h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                        <div className="project-image-4 mt-0">
                            <img src="images/home-4/project/project-02.jpg" alt="img"/>
                            <h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                        <div className="project-image-4 mt-0">
                            <img src="images/home-4/project/project-03.jpg" alt="img"/>
                            <h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                        <div className="project-image-4 mt-0">
                            <img src="images/home-4/project/project-04.jpg" alt="img"/>
                            <h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                        <div className="project-image-4 mt-0">
                            <img src="images/home-4/project/project-05.jpg" alt="img"/>
                            <h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                        <div className="project-image-4 mt-0">
                            <img src="images/home-4/project/project-06.jpg" alt="img"/>
                            <h3 className="title"><Link href="/page-project-details">Finance Management</Link></h3>
                        </div>
                    </div>
                </div>
            </section>
    );
};
export default Project;