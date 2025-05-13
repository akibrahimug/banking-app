import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image
            src="/icons/banking_app_welcome_image.jpg"
            width={550}
            height={550}
            alt="auth image"
          />
        </div>
      </div>
    </main>
  );
}
