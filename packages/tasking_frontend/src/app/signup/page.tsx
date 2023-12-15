"use client";
import { useRouter } from "next/navigation";
import SignUp from "./components/sign-up";

const SignUpPage = () => {
  const router = useRouter();

  return <SignUp router={router} />;
};

export default SignUpPage;
