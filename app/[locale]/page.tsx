import { LogoLoader } from "@/components/logo-loader";
import { isLocale, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <LogoLoader />
    </main>
  );
}
