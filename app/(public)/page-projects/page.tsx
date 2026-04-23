import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import Project from "@/components/sections/Project";

export const metadata = {
  title: "Tadbirlar - Raqamli Kutubxona",
  description: "Kutubxonada o'tkaziladigan tadbirlar va proyektlar.",
};

export default function ProjectsPage() {
  return (
    <Layout>
      <PageTitle title="Our Projects" />
      <Project />
    </Layout>
  );
}

