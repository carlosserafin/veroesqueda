import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  const max =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[100rem]" : "max-w-7xl";
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", max, className)}>{children}</div>;
}
