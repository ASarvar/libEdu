import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopSidebar from "@/components/sections/ShopSidebar";

export const metadata = {
  title: "Shop - Finclix",
  description: "Browse our products with filters",
};

export default function ShopProductsSidebarPage() {
  return (
    <Layout>
      <PageTitle title="Shop" />
      <ShopSidebar />
    </Layout>
  );
}

