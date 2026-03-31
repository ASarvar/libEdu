import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopCheckout from "@/components/sections/ShopCheckout";

export const metadata = {
  title: "Checkout - Finclix",
  description: "Complete your purchase",
};

export default function ShopCheckoutPage() {
  return (
    <Layout>
      <PageTitle title="Checkout" />
      <ShopCheckout />
    </Layout>
  );
}

