"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

function Navbar() {
  return (
    <header className="w-full shadow-md bg-primary/40 dark:bg-gray-950">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center ">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary flex items-center gap-2">
          <img src="/logo.svg" alt="Company Logo" className="w-8 h-8" />
          <span>MyCompany</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg font-medium text-gray-700 dark:text-gray-100">
          <li className="hover:text-primary transition-colors cursor-pointer">
            Home
          </li>
          <li className="hover:text-primary transition-colors cursor-pointer">
            Services
          </li>
          <li className="hover:text-primary transition-colors cursor-pointer">
            Portfolio
          </li>
          <li className="hover:text-primary transition-colors cursor-pointer">
            Contact
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="">
              <Menu className="w-6 h-6 text-primary " />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="bg-white dark:bg-gray-950 h-full "
            >
              <ul className="flex flex-col gap-4 mt-8 text-lg font-medium text-gray-700 dark:text-gray-100 h-full bg-primary/40 items-center">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Home
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Services
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Portfolio
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  Contact
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
