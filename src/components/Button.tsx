import { cn } from "@/lib/utils";
import React from "react";

function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "aspect-square w-fit p-2 border border-gray-300 rounded-md",
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
