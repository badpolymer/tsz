"use client"
import type { Metadata } from "next";
// import { Noto_Serif_HK } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.scss";
import publicURL from "@/functions/imageURL";
import Header from "@/components/Header";
import printOut from "@/functions/printOut";
import Script from "next/script";
import { Suspense } from "react";

//const noto = Noto_Serif_HK({ preload:false});
//https://github.com/vercel/next.js/discussions/47309

const myFont = localFont({
  src: './NotoSerifHK-VariableFont_wght.ttf',
  display: 'swap',
})

const metadata: Metadata = {
  title: "Dictionary",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  printOut(`Rendering Root Layout`);

  return (
    <html>
      {/* <body className={noto.className}> */}
      <body  className={myFont.className}>
        <Suspense>
          <Header></Header>
        </Suspense>

        <Suspense>
          {children}
        </Suspense>


        <><Script src={publicURL(`/js/theme.js`)} /></>
      </body>
    </html>

  );
}
