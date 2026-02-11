'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const getTotalItems = useCartStore(state => state.getTotalItems);
  const totalItems = getTotalItems();

  const navLinks = [
    { href: '/about', label: 'À propos' },
    { href: '/products', label: 'Produits' },
    { href: '/ar', label: 'Visualisation AR' },
    { href: '/maintenance', label: 'Maintenance' },
    { href: '/support', label: 'Support' },
    { href: '/docs', label: 'Documentation' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo.png"
                alt="InSitu Security"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold hidden sm:inline">
              <span className="text-orange">InSitu</span> Security
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-yellow transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-yellow transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-yellow transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
