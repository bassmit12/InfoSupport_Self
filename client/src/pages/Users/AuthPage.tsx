import { useRecoilValue } from "recoil";
import LoginCard from "../../components/auth/LoginCard";
import SignupCard from "../../components/auth/SignUpCard";
import authScreenAtom from "../../atoms/authAtom.ts";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);

  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
