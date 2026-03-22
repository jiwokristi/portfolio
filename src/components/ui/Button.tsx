import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "border bg-transparent",
        ghost: "",
      },
      color: {
        default: "",
        accent: "",
      },
      size: {
        xs: "px-3 py-1.5 text-xs",
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    compoundVariants: [
      { variant: "contained", color: "accent", className: "bg-accent text-white hover:bg-accent-hover" },
      { variant: "contained", color: "default", className: "bg-surface text-text-primary hover:bg-border" },
      { variant: "outlined", color: "default", className: "border-border text-text-primary hover:bg-surface" },
      { variant: "outlined", color: "accent", className: "border-accent/40 text-accent hover:bg-accent/10" },
      { variant: "ghost", color: "default", className: "text-text-secondary hover:text-text-primary" },
      { variant: "ghost", color: "accent", className: "text-accent hover:text-accent-hover" },
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
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof buttonVariants> &
  Omit<React.ComponentPropsWithoutRef<"button">, "className" | "color">;

export function Button({
  variant,
  color,
  size,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = cn(buttonVariants({ variant, color, size }), className);

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
