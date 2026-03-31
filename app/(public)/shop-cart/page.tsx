import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopCart from "@/components/sections/ShopCart";

export const metadata = {
  title: "Shopping Cart - Finclix",
  description: "View your shopping cart",
};

export default function ShopCartPage() {
  return (
    <Layout>
      <PageTitle title="Shopping Cart" />
      <ShopCart />
    </Layout>
  );
}

