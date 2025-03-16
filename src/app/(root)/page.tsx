import Header from '@/components/Header';
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const user = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: user.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  console.log(account, accountsData);

  return (
    <section className="home">
      <div className="home-content">
        <Header
          type="greeting"
          userFirstName={user.firstName}
          title="Welcome"
          subtext="Access and manage your account and transaction efficiently"
        />
        <TotalBalanceBox
          accounts={accountsData}
          totalBanks={accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
        />
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <RightSidebar user={user} banks={accountsData?.slice(0, 2)} transactions={[]} />
    </section>
  );
};

export default Home;
