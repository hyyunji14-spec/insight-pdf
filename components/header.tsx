"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export function Header() {
  const { items, ready } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-[color:var(--background)]/90 backdrop-blur-md">

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <span className="whitespace-nowrap font-sans text-3xl font-black tracking-tighter sm:text-4xl">
            <span className="text-[#F00000]">인</span>
            <span className="text-[#1679C5]">사이트</span>
            <span className="text-[#111111]">온웹</span>
          </span>
        </Link>


        <nav className="flex items-center gap-5 text-sm">
          <Link
            href="/"
            className="text-stone-600 transition-colors hover:text-stone-900"
          >
            시리즈
          </Link>
          <Link
            href="/cart"
            className="relative rounded-full border border-stone-300 px-3 py-1.5 text-stone-800 transition-colors hover:border-stone-500 hover:bg-white"
          >
            장바구니
            {ready && items.length > 0 ? (
              <span className="ml-1.5 inline-flex min-w-5 items-center justify-center rounded-full bg-stone-900 px-1.5 text-[11px] font-medium text-white">
                {items.length}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header >
  );
}
