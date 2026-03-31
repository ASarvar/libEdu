import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ProjectDetails from "@/components/sections/ProjectDetails";

export const metadata = {
  title: "Project Details - Finclix",
  description: "Detailed information about our project",
};

export default function ProjectDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Project Details" />
      <ProjectDetails />
    </Layout>
  );
}

