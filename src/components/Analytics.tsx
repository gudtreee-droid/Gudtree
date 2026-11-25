'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

export default function Analytics() {
  const pathname = usePathname();
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'zez99wao9l';
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-NHHRH6MQ';

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin') || typeof window === 'undefined') return;

    const visitorKey = 'gudtree_visitor_tracked';
    const isNewVisitor = !localStorage.getItem(visitorKey);
    if (isNewVisitor) {
      localStorage.setItem(visitorKey, Date.now().toString());
    }

    // Ping site analytics tracker after initial paint/hydration settles
    const segments = pathname.split('/').filter(Boolean);
    const isArticlePage = (segments.length === 2 && segments[0] !== 'category' && segments[0] !== 'admin') || pathname.startsWith('/news/');
    if (!isArticlePage) {
      const timer = setTimeout(() => {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            isUnique: isNewVisitor,
          }),
        }).catch(() => {});
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      {/* 1. Microsoft Clarity (Heatmaps & Session Recordings) */}
      {clarityId && (
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}

      {/* 2. Google Tag Manager / GA4 (Container: GTM-NHHRH6MQ) */}
      {gtmId && (
        <>
          <Script
            id="gtm-loader"
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
          />
          <Script
            id="google-tag-manager"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
              `,
            }}
          />
        </>
      )}

      {/* 3. Plerdy (Heatmaps, Click Tracking & SEO) */}
      <Script
        id="plerdy-tracking"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d){
              if(w.__plerdyCode)return;
              w.__plerdyCode=1;
              w._protocol=w.location.protocol=="https:"?"https://":"http://";
              w._site_hash_code="86b992955c304735651131148b9cfb06";
              w._suid=83360;
              var s=d.createElement("script");
              s.async=true;
              s.referrerPolicy="strict-origin-when-cross-origin";
              s.src="https://a.plerdy.com/public/js/click/main.js";
              d.head.appendChild(s);
            })(window,document);
          `,
        }}
      />
    </>
  );
}
