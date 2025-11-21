import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import BlogDetails from "@/components/sections/BlogDetails";

export const metadata = {
  title: "News Details - Finclix",
  description: "Read the full article",
};

export default function NewsDetailsPage() {
  return (
    <Layout>
      <PageTitle title="News Details" />
      <BlogDetails />
    </Layout>
  );
}

