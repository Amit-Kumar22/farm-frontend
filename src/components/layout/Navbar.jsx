import { cookies } from "next/headers";
import config from "@/config";
import { siteSettingsApi } from "@/lib/api/siteSettings";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const [cookieStore, settingsRes] = await Promise.all([
    cookies(),
    siteSettingsApi.get().catch(() => null),
  ]);
  const isLoggedIn = cookieStore.has(config.cookieName);
  const settings = settingsRes?.data;

  return (
    <NavbarClient
      siteName={settings?.siteName || config.siteName}
      phone={settings?.phone}
      isLoggedIn={isLoggedIn}
    />
  );
}
