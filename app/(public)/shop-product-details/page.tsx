import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopDetails from "@/components/sections/ShopDetails";

export const metadata = {
  title: "Mahsulot Batafsili - Raqamli Kutubxona",
  description: "Mahsulot haqida batafsil ma'lumot.",
};

export default function ShopProductDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Product Details" />
      <ShopDetails />
    </Layout>
  );
}

