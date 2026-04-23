import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import TeamGrid from "@/components/sections/TeamGrid";

export const metadata = {
  title: "Bizning Jamoa - Raqamli Kutubxona",
  description: "Kutubxona mutaxassislari va xizmat ko'rsatuvchi jamoa haqida.",
};

export default function TeamPage() {
  return (
    <Layout>
      <PageTitle title="Our Team" />
      <TeamGrid />
    </Layout>
  );
}

