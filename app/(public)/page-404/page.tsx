import Layout from "@/components/layout/Layout";
import Page404 from "@/components/sections/Page404";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found",
};

export default function Error404Page() {
  return (
    <Layout>
      <Page404 />
    </Layout>
  );
}

