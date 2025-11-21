import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import NewsGrid from "@/components/sections/NewsGrid";

export const metadata = {
  title: "News & Blog - Finclix",
  description: "Stay updated with our latest news and insights",
};

export default function NewsGridPage() {
  return (
    <Layout>
      <PageTitle title="News & Blog" />
      <NewsGrid />
    </Layout>
  );
}

