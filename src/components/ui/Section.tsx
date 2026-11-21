import { cn } from "@/lib/utils/cn";

export function Section({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full", className)} {...props}>
      {children}
    </section>
  );
}

export function SectionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24 xl:px-16",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
