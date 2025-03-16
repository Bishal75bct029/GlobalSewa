import AuthForm from '@/components/AuthForm';
import { getLoggedInUser } from '@/lib/actions/userActions';

const SignUp = async () => {
  const user = await getLoggedInUser();
  console.log(user, 'here is user');
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUp;
