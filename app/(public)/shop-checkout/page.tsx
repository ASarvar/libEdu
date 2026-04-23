import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopCheckout from "@/components/sections/ShopCheckout";

export const metadata = {
  title: "Rasmiylash - Raqamli Kutubxona",
  description: "Sotib olishingizni yakunlang.",
};

export default function ShopCheckoutPage() {
  return (
    <Layout>
      <PageTitle title="Checkout" />
      <ShopCheckout />
    </Layout>
  );
}

