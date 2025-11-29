import Head from "next/head";
import React from "react";

interface PageHeadProps {
  headTitle?: string;
  description?: string;
  keywords?: string;
}

const PageHead: React.FC<PageHeadProps> = ({ 
  headTitle,
  description,
  keywords 
}) => {
  const defaultTitle = "Respublika Kutubxonalari Yagona Veb Platformasi";
  const defaultDescription = "O'zbekiston viloyat va tuman kutubxonalari uchun yagona raqamli platforma. Elektron katalog, kitob bronlash, raqamli kutubxona va tadbirlar.";
  const defaultKeywords = "kutubxona, elektron katalog, kitob, raqamli kutubxona, O'zbekiston, viloyat kutubxonasi, bronlash, tadbirlar";

  return (
    <Head>
      <title>{headTitle || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="Respublika Kutubxonalari Yagona Veb Platformasi" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={headTitle || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={headTitle || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      
      {/* Favicon */}
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      
      {/* Charset & Language */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <html lang="uz" />
    </Head>
  );
};

export default PageHead;
