import MobileNav from '@/components/MobileNav';
import SideBar from '@/components/SideBar';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();

  if (!user) redirect('/sign-in');

  return (
    <main className="flex  h-screen w-full font-inter">
      <SideBar user={user} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.png" width={40} height={40} alt="logo" />
          <div className="md:hidden">
            <MobileNav />{' '}
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
