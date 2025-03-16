import Header from '@/components/Header';
import RightSidebar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const user = { firstName: 'Bishal', email: 'email', lastName: 'LC' } as User;

  return (
    <section className="home">
      <div className="home-content">
        <Header
          type="greeting"
          userFirstName={user.firstName}
          title="Welcome"
          subtext="Access and manage your account and transaction efficiently"
        />
        <TotalBalanceBox accounts={[]} totalBanks={1} totalCurrentBalance={1000} />
      </div>
      <RightSidebar user={user} banks={[]} transactions={[]} />
    </section>
  );
};

export default Home;
