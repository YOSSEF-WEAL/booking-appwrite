"use client";

import destroySession from "@/app/actions/destroySession";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaBuilding,
  FaSignInAlt,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import logo from "@/assets/images/logo.svg";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

function Header() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    const { success, error } = await destroySession();

    if (success) {
      setIsAuthenticated(false);
      setIsMenuOpen(false);
      router.push("/login");
    } else {
      toast.error(error);
    }
  };

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" onClick={handleLinkClick}>
              <Image
                className="h-12 w-12"
                src={logo}
                alt="Bookit"
                priority={true}
              />
            </Link>
            <div className="hidden md:flex items-baseline space-x-2">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
              >
                Rooms
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    href="/bookings"
                    className="rounded-md px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
                  >
                    Bookings
                  </Link>
                  <Link
                    href="/rooms/add"
                    className="rounded-md px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-zinc-800"
                  >
                    Add Room
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!isAuthenticated && (
              <>
                <Link href="/login" className="text-zinc-100 hover:text-zinc-300">
                  <FaSignInAlt className="inline align-text-bottom" /> Login
                </Link>
                <Link
                  href="/register"
                  className="text-zinc-100 hover:text-zinc-300"
                >
                  <FaUser className="inline align-text-bottom" /> Register
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link
                  href="/rooms/my"
                  className="text-zinc-100 hover:text-zinc-300"
                >
                  <FaBuilding className="inline align-text-bottom" /> My Rooms
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-zinc-100 hover:text-zinc-300 cursor-pointer"
                >
                  <FaSignOutAlt className="inline align-text-bottom" /> Sign Out
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-zinc-100 hover:bg-zinc-800 md:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-zinc-800 bg-zinc-900 md:hidden">
          <div className="space-y-1 px-3 pb-3 pt-2">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="block rounded-md px-3 py-2 text-base font-medium text-zinc-100 hover:bg-zinc-800"
            >
              Rooms
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/bookings"
                  onClick={handleLinkClick}
                  className="block rounded-md px-3 py-2 text-base font-medium text-zinc-100 hover:bg-zinc-800"
                >
                  Bookings
                </Link>
                <Link
                  href="/rooms/add"
                  onClick={handleLinkClick}
                  className="block rounded-md px-3 py-2 text-base font-medium text-zinc-100 hover:bg-zinc-800"
                >
                  Add Room
                </Link>
                <Link
                  href="/rooms/my"
                  onClick={handleLinkClick}
                  className="block rounded-md px-3 py-2 text-base font-medium text-zinc-100 hover:bg-zinc-800"
                >
                  <FaBuilding className="mr-2 inline align-text-bottom" /> My Rooms
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-zinc-100 hover:bg-zinc-800"
                >
                  <FaSignOutAlt className="mr-2 inline align-text-bottom" /> Sign
                  Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="block rounded-md px-3 py-2 text-base font-medium text-zinc-100 hover:bg-zinc-800"
                >
                  <FaSignInAlt className="mr-2 inline align-text-bottom" /> Login
                </Link>
                <Link
                  href="/register"
                  onClick={handleLinkClick}
                  className="block rounded-md px-3 py-2 text-base font-medium text-zinc-100 hover:bg-zinc-800"
                >
                  <FaUser className="mr-2 inline align-text-bottom" /> Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
