import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-bold",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "border",
      },
      color: {
        default: "",
        accent: "",
        success: "",
        warning: "",
        error: "",
        muted: "",
        subtle: "",
      },
      size: {
        xs: "px-1.5 py-0.5 text-[0.625rem]",
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-small",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    compoundVariants: [
      { variant: "contained", color: "default", className: "chip" },
      { variant: "contained", color: "accent", className: "chip" },
      { variant: "contained", color: "success", className: "chip-green" },
      { variant: "contained", color: "warning", className: "bg-warning/15 text-warning" },
      { variant: "contained", color: "error", className: "bg-error/15 text-error" },
      { variant: "contained", color: "muted", className: "bg-muted/15 text-text-muted" },
      { variant: "contained", color: "subtle", className: "chip" },
      { variant: "outlined", color: "default", className: "chip" },
      { variant: "outlined", color: "accent", className: "border-accent/40 text-accent" },
      { variant: "outlined", color: "success", className: "border-success/40 text-success" },
      { variant: "outlined", color: "warning", className: "border-warning/40 text-warning" },
      { variant: "outlined", color: "error", className: "border-error/40 text-error" },
      { variant: "outlined", color: "muted", className: "border-muted/40 text-text-muted" },
      { variant: "outlined", color: "subtle", className: "border-border text-text-muted" },
    ],
    defaultVariants: {
      variant: "outlined",
      color: "default",
      size: "md",
    },
  }
);

type BadgeProps = React.ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  variant,
  color,
  size,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, color, size }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
