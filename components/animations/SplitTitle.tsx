export function SplitTitle({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`split-title ${className}`} aria-label={children}>
      {Array.from(children).map((character, index) => (
        <span className="split-title__mask" aria-hidden="true" key={`${character}-${index}`}>
          <span data-hero-char>{character === " " ? "\u00A0" : character}</span>
        </span>
      ))}
    </span>
  );
}
