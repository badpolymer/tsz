"use client"
import type { Metadata } from "next";
// import { Noto_Serif_HK } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.scss";
import Header from "@/components/Header";
import printOut from "@/functions/printOut";
import { Suspense, useEffect, useState } from "react";
import { storageAvailable } from "@/functions/storageAvailable";
import { useLanguagePack } from "@/hooks/useLanguagePack";
import languagePacks from '@/json/languagePacks.json';
import { LanguagePack } from "@/types/LanguagePack";

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
  const locale = useLanguagePack().translation;

  // Init
  // Set theme and local storage
  useEffect(() => {
    printOut(`!!!!Root Layout One-time Effect!!!!`);
    if (!storageAvailable(`localStorage`)) {
      printOut(`Local Storage NOT OK`)

      // Check to see if Media-Queries are supported
      if (window.matchMedia) {
        // Check if the dark-mode Media-Query matches
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          // Dark
          document.documentElement.setAttribute(`data-set-theme`, "dark");
   
        } else {
          // Light
          document.documentElement.setAttribute(`data-set-theme`, "light");

        }
      } else {
        // Default (when Media-Queries are not supported)
        document.documentElement.setAttribute(`data-set-theme`, "dark");

      }

    } else {
      // Read and write the theme value to the local storage
      const storedTheme = window.localStorage.getItem(`theme`);
      switch (storedTheme) {
        case `dark`:
          document.documentElement.setAttribute(`data-set-theme`, "dark");
          break;
        case `light`:
          document.documentElement.setAttribute(`data-set-theme`, "light");
          break;
        default:
          if (window.matchMedia) {
            // Check if the dark-mode Media-Query matches
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              // Dark
              printOut(`prefers-color-scheme: dark`)
              document.documentElement.setAttribute(`data-set-theme`, "dark");
              window.localStorage.setItem(`theme`, `dark`);
            } else {
              // Light
              printOut(`prefers-color-scheme: light`)
              document.documentElement.setAttribute(`data-set-theme`, "light");
              window.localStorage.setItem(`theme`, `light`);
            }
          } else {
            // Default (when Media-Queries are not supported)
            printOut(`prefers-color-scheme: none`)
            document.documentElement.setAttribute(`data-set-theme`, "dark");
            window.localStorage.setItem(`theme`, `dark`);
          }
          break;
      }
    }

  },[])

  printOut(`Rendered Root Layout`);

  return (
    <html>

      {/* <body className={noto.className}> */}
      <body className={myFont.className}>
        
          <Header languagePacks={languagePacks as [LanguagePack]} locale={locale} ></Header>
        

        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>

  );
}
