import MobileNav from '@/components/MobileNav';
import SideBar from '@/components/SideBar';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = { firstName: 'Bishal' };

  return (
    <main className="flex  h-screen w-full font-inter">
      <SideBar />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          {/* <Image src="/icons/logo.svg" width={30} height={30} alt="logo" /> */}
          <div className="md:hidden lg:hidden xl:hidden 2xl:hidden">
            <MobileNav />{' '}
          </div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default RootLayout;
