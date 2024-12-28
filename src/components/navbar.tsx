import React from 'react'
import Image from "next/image"
import Link from "next/link"

interface NavBarProps {
  visible?: 'logo'
}

const NavBar: React.FC<NavBarProps> = ({ visible }) => {
  if (visible === 'logo') {
    return (
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <Image
            src="/logo.png?height=50&width=50"
            width={40}
            height={40}
            alt="Logo"
            className="mr-4"
          />
          <span className="text-white text-xl font-semibold">Simple CRUD</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/logo.png?height=50&width=50"
            width={40}
            height={40}
            alt="Logo"
            className="mr-4"
          />
          <span className="text-white text-xl font-semibold">Simple CRUD</span>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            href="https://github.com/matthewcespon"
            className="text-gray-300 hover:text-white transition-colors"
          >
            GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/matthewcespon"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Connect
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar