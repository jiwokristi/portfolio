import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-extrabold transition-[filter,color,background-color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "",
        ghost: "",
      },
      color: {
        default: "",
        accent: "",
      },
      size: {
        xs: "min-h-8 px-3 text-xs",
        sm: "min-h-10 px-4 text-sm",
        md: "min-h-12 px-6 text-base",
        lg: "min-h-14 px-8 text-lg",
      },
    },
    compoundVariants: [
      { variant: "contained", color: "accent", className: "gloss-aqua hover:brightness-110" },
      { variant: "contained", color: "default", className: "gloss-light hover:brightness-105" },
      { variant: "outlined", color: "default", className: "gloss-light hover:brightness-105" },
      { variant: "outlined", color: "accent", className: "gloss-light text-accent hover:brightness-105" },
      { variant: "ghost", color: "default", className: "text-text-secondary hover:text-text-primary" },
      { variant: "ghost", color: "accent", className: "px-0 text-accent hover:text-accent-hover" },
    ],
    defaultVariants: {
      variant: "contained",
      color: "accent",
      size: "md",
    },
  }
);

type ButtonProps = {
  href?: string;
  newTab?: boolean;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants> &
  Omit<React.ComponentPropsWithoutRef<"button">, "className" | "color">;

export function Button({
  variant,
  color,
  size,
  href,
  newTab,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(buttonVariants({ variant, color, size }), className);

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
      >
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
