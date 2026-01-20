import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo App",
  description: "with api routes and postgres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={`flex min-h-screen justify-center pt-12 bg-zinc-50 font-sans dark:bg-black`}
    >
      {children}
    </section>
  );
}
