import React from 'react';
import Link from 'next/link';

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <>
    <section className="page-title" style={{ backgroundImage: 'url(images/inner/page-title-bg.jpg)' }}>
        <div className="auto-container">
            <div className="title-outer">
                <ul className="page-breadcrumb fadeInUp">
                    <li><Link href="/">Home</Link></li>
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