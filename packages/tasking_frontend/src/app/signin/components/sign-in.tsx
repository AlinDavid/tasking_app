import signInUser from "@/app/api/auth/sign-in";
import Link from "next/link";
import React, { FC, useState } from "react";
import Cookies from "js-cookie";

interface SignUpProps {
  router: any;
}

const SignIn: FC<SignUpProps> = ({ router }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    credentialsError: false,
    userNotFound: false,
  });

  const handleSignIn = async () => {
    try {
      const result = await signInUser({
        email: formData.email,
        password: formData.password,
      });
      if (result.success) {
        Cookies.set("accessToken", result.accessToken, {
          expires: 7,
          secure: true,
        });
        router.push("/tasks");
      } else {
        switch (result.error) {
          case "Credentials don't match": {
            setErrors({
              credentialsError: true,
              userNotFound: false,
            });
            setFormData({
              email: "",
              password: "",
            });
          }
          case "User is not registered": {
            setErrors({
              userNotFound: true,
              credentialsError: false,
            });
            setFormData({
              email: "",
              password: "",
            });
          }
          default:
            console.error("Login failed");
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors({
      userNotFound: false,
      credentialsError: false,
    });

    handleSignIn();
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="/bitdefender.svg"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign In to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
              {errors.userNotFound && (
                <p className="text-red-500 text-xs mt-1">User not found</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              />
              {errors.credentialsError && (
                <p className="text-red-500 text-xs mt-1">
                  Credentials are incorrect
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            href="/signup"
            className="font-semibold leading-6 text-red-600 hover:text-red-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
