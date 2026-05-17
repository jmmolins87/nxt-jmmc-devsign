"use client";

import { useEffect, useState } from "react";
import { LogoLoader } from "@/components/logo-loader";

export function InitialLoaderGate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <LogoLoader />
      </main>
    );
  }

  return <>{children}</>;
}
