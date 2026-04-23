import Layout from "@/components/layout/Layout";
import Page404 from "@/components/sections/Page404";

export const metadata = {
  title: "Sahifa Topilmadi - 404",
  description: "Izlayotgan sahifani topa olmasdik. Bosh sahifaga qaytish.",
};

export default function Error404Page() {
  return (
    <Layout>
      <Page404 />
    </Layout>
  );
}

