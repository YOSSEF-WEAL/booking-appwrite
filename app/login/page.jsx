"use client";
import Link from "next/link";
import createSession from "../actions/createSession";
// import { useFormState } from "react-dom";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

function LoginPage() {
  const [state, formAction] = useActionState(createSession, {});
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Logged in Successfully");
      setIsAuthenticated(true);
      router.push("/");
    }
  }, [state]);

  return (
    <div className="flex items-center justify-center">
      <div className="mt-20 w-full max-w-sm rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <form action={formAction}>
          <h2 className="mb-6 text-center text-2xl font-bold text-zinc-100">
            Login
          </h2>

          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block font-bold text-zinc-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100"
              required
            />
          </div>

          <div className="mb-6">
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
            />
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p className="text-zinc-300">
              No account?
              <Link href="/register" className="text-blue-400 hover:text-blue-300">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
