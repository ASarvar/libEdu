import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import TeamDetails from "@/components/sections/TeamDetails";

export const metadata = {
  title: "Team Details - Finclix",
  description: "Learn more about our team member",
};

export default function TeamDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Team Details" />
      <TeamDetails />
    </Layout>
  );
}

