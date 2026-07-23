import type { ReactNode } from "react";

export function PageIntro({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children?: ReactNode }) {
  return (
    <section className="page-intro">
      <div className="grain" aria-hidden="true" />
      <div className="shell page-intro__content">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-intro__copy">{copy}</p>
        {children}
      </div>
    </section>
  );
}
