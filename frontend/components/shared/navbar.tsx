"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import brandLogo from "@/public/brand-logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    // TODO: Make the navbar responsive
    <header className="m-4 p-1 border border-blue-600/20 rounded-2xl">
      <div className="flex items-center justify-between px-2.5 py-2 border border-blue-600/20 rounded-xl bg-white">
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <Image src={brandLogo} alt="Brand Logo" />
            <h1 className="text-title font-bold">Finance</h1>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="/overview">
                  Overview
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/transactions">
                  Transactions
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/accounts">
                  Accounts
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/categories">
                  Categories
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/settings">
                  Settings
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border border-blue-600/20"
              >
                <Link href="/logout">
                  <DropdownMenuItem className="text-destructive">
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
