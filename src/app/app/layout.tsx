import Navbar from "./_components/layout/Navbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-dvw h-dvh flex flex-col p-0">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
