import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export function FormContainer({
  children,
  title,
  description,
  className,
}: FormContainerProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md mx-auto p-6 bg-card rounded-lg shadow-sm border border-border animate-in fade-in slide-in-bottom",
        className,
      )}
    >
      {title && (
        <h2 className="text-2xl font-semibold mb-2 text-center">{title}</h2>
      )}
      {description && (
        <p className="text-muted-foreground text-sm mb-6 text-center">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
