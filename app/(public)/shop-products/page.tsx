import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopProduct from "@/components/sections/ShopProduct";

export const metadata = {
  title: "Magazin - Raqamli Kutubxona",
  description: "Kutubxona mahsulotlari va e-resurslarini sotib olin.",
};

export default function ShopProductsPage() {
  return (
    <Layout>
      <PageTitle title="Shop" />
      <ShopProduct />
    </Layout>
  );
}

