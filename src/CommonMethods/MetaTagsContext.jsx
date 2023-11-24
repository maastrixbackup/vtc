import { createContext, useContext, useState } from "react";

const MetaContext = createContext({});
export const MetaInfo = () => {
  const MetaCtx = useContext(MetaContext);
  return MetaCtx;
};

function MetaTagsContext({ children }) {
  const [pageTitle, setPageTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [metaKeyWords, setMetaKw] = useState("");
  const [metaTitle, setMetaTitle] = useState("testTitle");
  //const [pageTitle, setPageTitle] = useState("");
  const [ogTitle, setOgtitle] = useState("");
  const [ogDesc, setOgDesc] = useState("");
  const [ogSiteName, setOgSiteName] = useState("");
  const [twitterCard, setTwitterCard] = useState("");
  const [twitterSite, setTwitterSite] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDesc, setTwitterDesc] = useState("");
  const value = {
    pageTitle: pageTitle,
    setPageTitle: setPageTitle,
    metaDesc: metaDesc,
    setMetaDesc: setMetaDesc,
    metaKeyWords: metaKeyWords,
    setMetaKw: setMetaKw,
    metaTitle: metaTitle,
    setMetaTitle: setMetaTitle,
    ogTitle: ogTitle,
    setOgtitle: setOgtitle,
    ogDesc: ogDesc,
    setOgDesc: setOgDesc,
    ogSiteName: ogSiteName,
    setOgSiteName: setOgSiteName,
    twitterCard: twitterCard,
    setTwitterCard: setTwitterCard,
    twitterSite: twitterSite,
    setTwitterSite: setTwitterSite,
    twitterTitle: twitterTitle,
    setTwitterTitle: setTwitterTitle,
    twitterDesc: twitterDesc,
    setTwitterDesc: setTwitterDesc,
  };
  return <MetaContext.Provider value={value}>{children}</MetaContext.Provider>;
}

export default MetaTagsContext;
