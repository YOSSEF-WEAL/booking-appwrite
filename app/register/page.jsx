"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createUser from "@/app/actions/createUser";
import Link from "next/link";

function RegisterPage() {
  const [state, formAction] = React.useActionState(createUser, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("You can now log in!");

      router.push("/login");
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center">
      <div className="mt-20 w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <form action={formAction}>
          <h2 className="mb-6 text-center text-2xl font-bold text-zinc-100">
            Register
          </h2>

          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block font-bold text-zinc-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
              autoComplete="name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block font-bold text-zinc-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
              autoComplete="email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block font-bold text-zinc-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
              required
              autoComplete="password"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="mb-2 block font-bold text-zinc-200"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
              autoComplete="confirm-password"
              required
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>

            <p className="text-zinc-300">
              Have an account?
              <Link href="/login" className="text-blue-400 hover:text-blue-300">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}

export default RegisterPage;
