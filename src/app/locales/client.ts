// locales/client.ts
"use client";
import { createI18nClient } from "next-international/client";

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient({
  en: () => import("./configs/en"),
  fr: () => import("./configs/fr"),
});
