import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"button">, "className">;

export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium transition-colors",
    variant === "primary" && "bg-accent text-white hover:bg-accent-hover",
    variant === "secondary" &&
      "border border-border bg-transparent text-text-primary hover:bg-surface",
    variant === "ghost" && "text-text-secondary hover:text-text-primary",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
