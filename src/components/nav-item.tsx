"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        {
          "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200":
            pathname === href,
        }
      )}
    >
      {children}
    </Link>
  );
}
