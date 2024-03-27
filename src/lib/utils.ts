import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const capitalize = (string: string) => string.slice(0, 1).toUpperCase() + string.slice(1).toLowerCase();
