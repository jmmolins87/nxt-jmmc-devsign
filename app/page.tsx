import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPreferredLocale } from "@/lib/i18n";

export default async function HomePage() {
  const acceptLanguage = (await headers()).get("accept-language") ?? "";
  const locale = getPreferredLocale(acceptLanguage);

  redirect(`/${locale}`);
}
