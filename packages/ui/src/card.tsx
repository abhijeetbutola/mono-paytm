import { type ReactNode } from "react";

export function Card({
  title,
  children,
  href,
}: {
  title: string;
  children: ReactNode;
  href?: string;
}) {
  return (
    <div>
      <p className="text-3xl">{title}</p>
      <p>{children}</p>
      <p>{href}</p>
    </div>
  );
}
