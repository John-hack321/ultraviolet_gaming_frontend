'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-chess-navs text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <p className="text-2xl font-extrabold text-white">.ULVT_GAMERS</p>
        </Link>

        {/* Desktop Navigation */}
        {/**
         * <nav className="hidden md:flex items-center space-x-6">
          <Link href="/login">
            <p className="hover:text-brand-primary transition duration-300">Login</p>
          </Link>
          <Link href="/signup">
            <p className="bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Sign Up
            </p>
          </Link>
        </nav>
         */}

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-chess-navs">
          {/**
           * <nav className="flex flex-col items-center space-y-4 py-4">
            <Link href="/login">
              <p className="hover:text-brand-primary transition duration-300" onClick={() => setIsOpen(false)}>Login</p>
            </Link>
            <Link href="/signup">
              <p className="bg-brand-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-lg transition duration-300" onClick={() => setIsOpen(false)}>
                Sign Up
              </p>
            </Link>
          </nav>
           */}
        </div>
      )}
    </header>
  );
}