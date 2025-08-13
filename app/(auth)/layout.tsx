export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="auth-page font-inter">
      <div className="auth-card">{children}</div>
    </main>
  );
}
