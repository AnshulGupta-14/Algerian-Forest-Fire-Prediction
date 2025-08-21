"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-[#0d1117] shadow-lg border-b border-[#21262d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-100 hover:text-[#58a6ff]"
            >
              🔥 Forest Fire Detection
            </Link>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                isActive("/")
                  ? "text-[#58a6ff] border-b-2 border-[#58a6ff]"
                  : "text-gray-400 hover:text-white hover:bg-[#161b22]"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#58a6ff] rounded-full"></span>
              )}
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                isActive("/about")
                  ? "text-[#58a6ff] border-b-2 border-[#58a6ff]"
                  : "text-gray-400 hover:text-white hover:bg-[#161b22]"
              }`}
            >
              About
              {isActive("/about") && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#58a6ff] rounded-full"></span>
              )}
            </Link>

            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 relative ${
                isActive("/dashboard")
                  ? "text-[#58a6ff] border-b-2 border-[#58a6ff]"
                  : "text-gray-400 hover:text-white hover:bg-[#161b22]"
              }`}
            >
              Dashboard
              {isActive("/dashboard") && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#58a6ff] rounded-full"></span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
