import { ScrollViewStyleReset } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="ar" dir="auto">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B3D5E" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Nuweiba Hub" />
        <link rel="apple-touch-icon" href="/assets/images/logo.png" />
        <title>Nuweiba Hub — دليلك لنويبع</title>
        <meta
          name="description"
          content="دليلك الشامل لنويبع — مخيمات، مواصلات وخدمات. Find camps, transport & local services in Nuweiba, Egypt."
        />
        <meta property="og:title" content="Nuweiba Hub" />
        <meta
          property="og:description"
          content="Your guide to Nuweiba, Egypt — camps, transport & services"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/images/logo.png" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html, body {
                -webkit-text-size-adjust: 100%;
                overscroll-behavior: none;
                overflow: hidden;
                height: 100%;
              }
              #root { height: 100%; }
              @media all and (display-mode: standalone) {
                body { -webkit-user-select: none; user-select: none; }
              }
              ::-webkit-scrollbar { display: none; }
              * { scrollbar-width: none; }
              body { overscroll-behavior-y: contain; }
              * { -webkit-tap-highlight-color: transparent; }
            `,
          }}
        />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
