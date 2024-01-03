import Script from 'next/script';

const GA_TRACKING_ID = 'G-RCD3NCF22K';

const GoogleAnalytics = () => {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', ${GA_TRACKING_ID});
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
