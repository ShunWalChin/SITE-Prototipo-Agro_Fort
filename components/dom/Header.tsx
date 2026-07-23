"use client";

import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/site";
import { BrandMark } from "./BrandMark";

const links = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/premiacoes", label: "Premiações" },
  { href: "/sobre", label: "Nossa história" },
  { href: "/contato", label: "Contato" },
];

export function Header({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className={`site-header ${light ? "site-header--light" : ""}${open ? " is-menu-open" : ""}`}>
      <div className="shell site-header__inner">
        <BrandMark compact light={light} />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <Link className={pathname === link.href ? "is-active" : ""} href={link.href} aria-current={pathname === link.href ? "page" : undefined} key={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <a className="button button--small header-order" href={whatsappUrl()} target="_blank" rel="noreferrer">
          <ShoppingBag size={16} aria-hidden="true" />
          Fazer pedido
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open && (
        <>
          <button className="mobile-nav-backdrop" type="button" aria-label="Fechar menu" onClick={() => setOpen(false)} />
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegação móvel">
            <p>Explore a Agrofort</p>
            {links.map((link, index) => (
              <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined} key={link.href} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {link.label}
              </Link>
            ))}
            <a className="mobile-nav__order" href={whatsappUrl()} target="_blank" rel="noreferrer">
              <ShoppingBag size={17} aria-hidden="true" />
              Fazer pedido pelo WhatsApp
            </a>
          </nav>
        </>
      )}
    </header>
  );
}
