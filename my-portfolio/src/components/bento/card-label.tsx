import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function CardLabel({
  icon,
  children,
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-2 text-sm text-subtle", className)}>
      {icon}
      <span>{children}</span>
    </p>
  );
}
