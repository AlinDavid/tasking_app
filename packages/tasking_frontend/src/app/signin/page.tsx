"use client";
import { useRouter } from "next/navigation";
import SignIn from "./components/sign-in";

const SignInPage = () => {
  const router = useRouter();

  return <SignIn router={router} />;
};

export default SignInPage;
