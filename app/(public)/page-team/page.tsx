import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import TeamGrid from "@/components/sections/TeamGrid";

export const metadata = {
  title: "Our Team - Finclix",
  description: "Meet our expert team members",
};

export default function TeamPage() {
  return (
    <Layout>
      <PageTitle title="Our Team" />
      <TeamGrid />
    </Layout>
  );
}

