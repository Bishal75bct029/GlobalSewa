import DoughnutChart from '@/components/DoughnutChart';
import Header from '@/components/Header';
import TotalBalanceBox from '@/components/TotalBalanceBox';

const Home = () => {
  const user = { firstName: 'Bishal' };

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
    </section>
  );
};

export default Home;
