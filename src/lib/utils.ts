import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with Tailwind-aware conflict resolution.
 *
 * Combines {@link clsx} (conditional class joining) with {@link twMerge}
 * (deduplicates and resolves conflicting Tailwind utilities).
 *
 * @param inputs - Class values: strings, arrays, objects, or falsy values.
 * @returns A single merged class string.
 *
 * @example
 * cn("px-4 py-2", "px-6")
 * // => "py-2 px-6"
 *
 * @example
 * cn("text-red-500", isActive && "text-blue-500")
 * // => "text-blue-500" (when isActive is true)
 *
 * @example
 * cn("rounded-md bg-white", { "opacity-50 pointer-events-none": disabled })
 * // => "rounded-md bg-white opacity-50 pointer-events-none" (when disabled is true)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
