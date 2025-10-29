import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce<T extends (...args: any) => void>(
  func: T,
  delay = 100
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null;
  return ((...args) => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  }) as unknown as T;
}
