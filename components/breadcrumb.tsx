import Link from "next/link";
import { Home } from "lucide-react";

interface BreadcrumbProps {
  items: {
    label: string;
    href: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="w-full">
      <ol className="flex w-full flex-wrap items-center rounded-md bg-gray-100 px-4 py-2">
        <li className="flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 hover:text-slate-800">
          <Link
            href="/"
            className="flex items-center space-x-1 text-primary hover:text-primary/80"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <span className="pointer-events-none mx-2 text-slate-800">/</span>
        </li>

        {items.map((item, index) => {
          return (
            <li
              className={`flex cursor-pointer items-center text-sm text-slate-500 transition-colors duration-300 capitalize ${
                index === items.length - 1
                  ? "font-medium text-foreground"
                  : "text-primary hover:text-slate-800"
              }`}
              key={item.href}
            >
              {item.label}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
