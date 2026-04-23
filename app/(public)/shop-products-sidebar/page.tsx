import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopSidebar from "@/components/sections/ShopSidebar";

export const metadata = {
  title: "Magazin - Raqamli Kutubxona",
  description: "Kutubxona mahsulotlari va e-resurslarini filtrlar bilan ko'ring.",
};

export default function ShopProductsSidebarPage() {
  return (
    <Layout>
      <PageTitle title="Shop" />
      <ShopSidebar />
    </Layout>
  );
}

