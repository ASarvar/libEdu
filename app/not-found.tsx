import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";

export default function NotFound() {
  return (
    <Layout>
    <section className="error-section">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="error-content text-center">
              <div className="error-image mb-4">
                <h1 className="error-code">404</h1>
              </div>
              <h2 className="mb-3">Page Not Found</h2>
              <p className="mb-4">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
              <Link href="/" className="theme-btn btn-style-one">
                Back To Home
                <span className="icon">
                  <i className="flaticon-finance-fi_3385625"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </Layout>
  );
}

