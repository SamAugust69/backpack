import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// handles conditinal classnames

export function cn(...inputs: ClassValue[]) {
    // twMerge optimizies tw classnames
    return twMerge(clsx(inputs))
}