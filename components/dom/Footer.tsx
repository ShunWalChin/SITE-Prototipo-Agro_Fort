import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { site, whatsappUrl } from "@/lib/site";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <BrandMark light />
          <p>Queijos, biscoitos e pão de queijo feitos no coração do Norte de Minas.</p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/premiacoes">Premiações</Link>
          <Link href="/sobre">Nossa história</Link>
          <Link href="/contato">Contato</Link>
        </div>
        <div>
          <p className="footer-label">Fale com a fazenda</p>
          <a href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={16} aria-hidden="true" /> {site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}><Mail size={16} aria-hidden="true" /> {site.email}</a>
          <a href={site.instagram} target="_blank" rel="noreferrer"><Instagram size={16} aria-hidden="true" /> @fazendaagrofort</a>
          <a href={site.maps} target="_blank" rel="noreferrer"><MapPin size={16} aria-hidden="true" /> Fazenda Barra Funda</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Fazenda Agrofort Ltda.</span>
        <Link href="/privacidade">Privacidade</Link>
        <span>Uma empresa Fort Grupo</span>
      </div>
    </footer>
  );
}
