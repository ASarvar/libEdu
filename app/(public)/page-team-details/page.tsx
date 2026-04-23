import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import TeamDetails from "@/components/sections/TeamDetails";

export const metadata = {
  title: "Jamoa A'zosi - Raqamli Kutubxona",
  description: "Kutubxona jamoa a'zosi haqida.",
};

export default function TeamDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Team Details" />
      <TeamDetails />
    </Layout>
  );
}

