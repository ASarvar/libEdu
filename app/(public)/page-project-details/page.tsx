import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ProjectDetails from "@/components/sections/ProjectDetails";

export const metadata = {
  title: "Tadbir Batafsili - Raqamli Kutubxona",
  description: "Kutubxona tadbirining batafsil ma'lumoti.",
};

export default function ProjectDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Project Details" />
      <ProjectDetails />
    </Layout>
  );
}

