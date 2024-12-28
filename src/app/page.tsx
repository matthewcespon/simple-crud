import { ArrowUpRight, Github } from 'lucide-react'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import NavBar from '@/components/navbar'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-800 to-neutral-950">
      {/* Navigation bar with logo */}
      <NavBar visible="logo" />

      <div className="container mx-auto px-4 py-16 text-center">
        {/* Logo and Header */}
        <div className="mb-8">
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            A simple CRUD application built with Next.js, SpringBoot and Postgres.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/rest"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-neutral-800/50 text-gray-200 hover:bg-neutral-700/50 transition-all backdrop-blur-sm border border-neutral-700/30"
          >
            <ArrowUpRight className="mr-2 h-5 w-5" />
            Get Started
          </Link>
          <Link
            href="https://github.com/matthewcespon/simple-crud"
            className="inline-flex items-center px-4 py-3 rounded-lg bg-neutral-800/50 text-gray-200 hover:bg-neutral-700/50 transition-all backdrop-blur-sm border border-neutral-700/30"
            aria-label="View this project on GitHub"
          >
            <Github className="mr h-5 w-5" />
          </Link>
        </div>

        {/* Version Badges */}
        <div className="flex justify-center gap-4 mb-16">
          <Badge variant="secondary" className="text-sm text-gray-800">
            Dashboard v2.1
          </Badge>
          <Badge
            variant="outline"
            className="bg-neutral-800 text-sm border-neutral-700 text-gray-500"
          >
            v2
          </Badge>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-white mb-8">
            What to expect from this application:
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 rounded-lg bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/30">
              <h3 className="text-xl font-semibold text-white mb-4">
                Adding Users
              </h3>
              <p className="text-gray-300">
                Write user data to the database with a simple form.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/30">
              <h3 className="text-xl font-semibold text-white mb-4">
                Deleting Users
              </h3>
              <p className="text-gray-300">
                Remove users from the database with a single click.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/30">
              <h3 className="text-xl font-semibold text-white mb-4">
                Quick Filters
              </h3>
              <p className="text-gray-300">
                Blazing fast search and filter functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}