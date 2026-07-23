import Link from "next/link";

type BrandMarkProps = {
  compact?: boolean;
  light?: boolean;
};

export function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  return (
    <Link className={`brand-mark ${light ? "brand-mark--light" : ""}`} href="/" aria-label="Agrofort — início">
      <span className="brand-mark__word brand-mark__agro">Agro</span>
      <span className="brand-mark__fort">
        F
        <span className="flower-mark" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <b />
        </span>
        rt
      </span>
      {!compact && <span className="brand-mark__origin">Januária · MG</span>}
    </Link>
  );
}
