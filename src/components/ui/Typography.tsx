import { cn } from "@/lib/utils/cn";

export function H1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn("text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]", className)} {...props}>{children}</h1>;
}
export function H2({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("text-3xl md:text-5xl font-bold tracking-tight leading-tight", className)} {...props}>{children}</h2>;
}
export function H3({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-xl md:text-2xl font-semibold tracking-tight", className)} {...props}>{children}</h3>;
}
export function P({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-base md:text-lg text-ink-soft leading-relaxed", className)} {...props}>{children}</p>;
}
