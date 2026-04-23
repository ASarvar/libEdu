import Layout from "@/components/layout/Layout";
import PageTitle from "@/components/sections/PageTitle";
import ShopCart from "@/components/sections/ShopCart";

export const metadata = {
  title: "Savat - Raqamli Kutubxona",
  description: "Savatingizning ma'lumotlarini ko'ring va boshqaring.",
};

export default function ShopCartPage() {
  return (
    <Layout>
      <PageTitle title="Shopping Cart" />
      <ShopCart />
    </Layout>
  );
}

