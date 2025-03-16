import Image from 'next/image';

export default function AuthLayout({
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
            src="/icons/authBg.png"
            alt="Auth image"
            width={900}
            height={1400}
            className="rounded-l-xl border-2 border-blue-500 "
            style={{ width: '900px', height: '500px' }}
          />
        </div>
      </div>
    </main>
  );
}
