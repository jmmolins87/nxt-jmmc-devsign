import { LogoLoader } from "@/components/logo-loader";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <LogoLoader />
    </main>
  );
}
