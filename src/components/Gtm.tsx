import Script from "next/script";

const id = process.env.NEXT_PUBLIC_GTM_ID;

export function GtmHead() {
  if (!id) return null;
  return (
    <Script id="gtm" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});(function(w,d,s,l,i){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
    </Script>
  );
}

export function GtmBody() {
  if (!id) return null;
  return (
    <noscript>
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${id}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
    </noscript>
  );
}
