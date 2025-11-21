import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import Project from "@/components/sections/Project";

export const metadata = {
  title: "Our Projects - Finclix",
  description: "Explore our successful projects and case studies",
};

export default function ProjectsPage() {
  return (
    <Layout>
      <PageTitle title="Our Projects" />
      <Project />
    </Layout>
  );
}

