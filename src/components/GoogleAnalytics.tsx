'use client';

import Script from 'next/script';

interface GoogleAnalyticsProps {
  gaId: string;
  adsId?: string;
}

export default function GoogleAnalytics({ gaId, adsId }: GoogleAnalyticsProps) {
  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
          ${adsId ? `gtag('config', '${adsId}');` : ''}
        `}
      </Script>
      
      {/* Google Ads Conversion Tracking */}
      {adsId && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}