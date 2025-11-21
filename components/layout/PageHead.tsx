import Head from "next/head";
import React from "react";

interface PageHeadProps {
  headTitle?: string;
}

const PageHead: React.FC<PageHeadProps> = ({ headTitle }) => {
  return (
    <Head>
      <title>
        {headTitle
          ? headTitle
          : "Finclix - Business Consulting React Next.js Template"}
      </title>
      {/* Corrected favicon path */}
      <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
  );
};

export default PageHead;
