import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-surface px-3 py-1 text-small font-medium text-text-secondary",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
