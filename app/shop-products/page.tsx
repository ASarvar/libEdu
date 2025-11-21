import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopProduct from "@/components/sections/ShopProduct";

export const metadata = {
  title: "Shop - Finclix",
  description: "Browse our products and services",
};

export default function ShopProductsPage() {
  return (
    <Layout>
      <PageTitle title="Shop" />
      <ShopProduct />
    </Layout>
  );
}

