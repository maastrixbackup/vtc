import React, { useEffect } from "react";
import { MetaInfo } from "../CommonMethods/MetaTagsContext";
import { Helmet } from "react-helmet";

function MetaTags() {
  const metaCtx = MetaInfo();

  return (
    <Helmet>
      <title>{metaCtx.pageTitle}</title>
      <meta name="title" content={metaCtx.metaTitle} />
      <meta name="description" content={metaCtx.metaDesc} />
      <meta name="keywords" content={metaCtx.metaKeyWords} />
      <meta property="twitter:card" content={metaCtx.twitterCard} />
      <meta property="twitter:title" content={metaCtx.twitterTitle} />
      <meta property="twitter:description" content={metaCtx.twitterDesc} />
      <meta property="twitter:site" content={metaCtx.twitterSite} />
      <meta property="og:title" content={metaCtx.ogTitle} />
      <meta property="og:description" content={metaCtx.ogDesc} />
      <meta property="og:site_name" content={metaCtx.ogSiteName} />
    </Helmet>
  );
}

export default MetaTags;
