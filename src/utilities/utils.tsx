import React, { Suspense, useEffect, useLayoutEffect } from "react";
import { clsx, type ClassValue } from "clsx";

import { ToWords } from "to-words";

import { useLocation } from "react-router-dom";


export function moneyFormatter(amount = 0) {
  const currentLang = "en";
  const isHindi = currentLang === "hi";
  const locale = isHindi ? "hi-IN" : "en-IN";

  const toWords = new ToWords({
    localeCode: locale,
    converterOptions: {
      currency: false,
      ignoreDecimal: true,
    },
  });

  let inWord =
    toWords.convert(amount) + (isHindi ? " रुपये मात्र /-" : " Only /-");
  let inString = "₹ " + amount?.toLocaleString(locale);

  return { inWord, inString };
}

export const ScrollToTop = () => {
  const { pathname } = useLocation();

useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};
