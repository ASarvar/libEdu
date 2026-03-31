import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopDetails from "@/components/sections/ShopDetails";

export const metadata = {
  title: "Product Details - Finclix",
  description: "View product details",
};

export default function ShopProductDetailsPage() {
  return (
    <Layout>
      <PageTitle title="Product Details" />
      <ShopDetails />
    </Layout>
  );
}

