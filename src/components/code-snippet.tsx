"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Copy } from "lucide-react";
import * as React from "react";
import { forwardRef, type HTMLAttributes } from "react";
import { toast } from "sonner";

const codeSnippetVariants = cva(
  "whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface CodeSnippetProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof codeSnippetVariants> {
  code?: string | string[],
  copy?: "default" | "silent" | "disabled" | "hidden",
}

const CodeSnippet = forwardRef<
  HTMLDivElement,
  CodeSnippetProps
>(({ className, code, variant, copy = "default", ...props }, ref) => {
  let lines: string[] = [];
  if (code) {
    lines = typeof code === "string" ? [ code ] : code;
    lines = lines.filter(Boolean);
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(lines.join(`
    `));
    if (copy !== "silent") {
      toast.info("Copied to clipboard!")
    }
  }
  return (
    <Card
      ref={ref}
      className={cn(codeSnippetVariants({ variant, className }))}
      {...props}
    >
      <CardHeader className="flex-row space-y-0 justify-between gap-2 py-3 pr-2">
        <div className="flex flex-col">
          {lines.map((line, i) => (
            <code key={`code-snippet-line-${i}`}>$ {line}</code>
          ))}
        </div>
        {copy !== 'hidden' && (
          <Button variant="ghost" size="icon" disabled={copy === "disabled"} onClick={handleCopy}>
            <Copy />
          </Button>
        )}
      </CardHeader>
    </Card>
  );
});
CodeSnippet.displayName = "CodeSnippet";

export { CodeSnippet };
