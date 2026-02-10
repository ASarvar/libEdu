import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/layout/Layout";
import Error from "@/components/sections/Page404";

export default function NotFound() {
  return (
    <Layout>
      <Error />
    </Layout>
  );
}

