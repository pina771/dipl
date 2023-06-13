"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const session = useSession();

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    signIn("credentials", { ...formData, callbackUrl: "/home" }).then(
      (callback) => {
        if (callback?.error) toast.error(callback.error);
        if (callback?.ok && !callback?.error) {
          toast.success("User signed in.");
        }
      }
    );
  };

  if (session.status === "authenticated") {
    redirect("/home");
  }

  return session?.status === "unauthenticated" ? (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-gray-900 mt-10 text-2xl font-bold leading-9 tracking-tight">
            Sign in to your account.
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex">
                <label
                  htmlFor="email"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Email address
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex">
                <label
                  htmlFor="password"
                  className="text-gray-900 block text-sm font-medium leading-6"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-indigo-500 text-white hover:bg-indigo-600 focus-visible:outline-indigo-600 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                onClick={(e) => handleLogin(e)}
              >
                Sign in
              </button>

              <button
                onClick={() => signIn("google")}
                className="text-white bg-slate-500 hover:bg-slate-600  focus-visible:outline-slate-600 mt-2 flex w-full justify-center  rounded-md bg-secondary-container px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Sign in with Google
              </button>
              <Link
                className="my-3 flex w-full justify-end text-sm text-secondary hover:underline"
                href="/register"
              >
                Not a member? Register instead!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : null;
};
export default Login;
