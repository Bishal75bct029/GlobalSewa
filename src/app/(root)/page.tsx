import Header from '@/components/Header';
import RecentTransactions from '@/app/(root)/components/RecentTransactions';
import RightSidebar from '@/app/(root)/components/RightSideBar';
import TotalBalanceBox from '@/app/(root)/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams }: { searchParams: Promise<SearchParamProps['searchParams']> }) => {
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams.id as string | undefined;
  const page = resolvedSearchParams.page as string | undefined;

  const currentPage = Number(page) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <Header
            type="greeting"
            title="Welcome"
            userFirstName={loggedIn.firstName}
            subtext="Access and manage your account and transactions efficiently."
          />

          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>

      <RightSidebar user={loggedIn} transactions={account?.transactions} banks={accountsData?.slice(0, 2)} />
    </section>
  );
};

export default Home;
