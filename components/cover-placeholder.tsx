type CoverPlaceholderProps = {
  title: string;
  volume: number;
  accent: string;
  className?: string;
};

export function CoverPlaceholder({
  title,
  volume,
  accent,
  className = "",
}: CoverPlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md shadow-inner ${className}`}
      style={{ backgroundColor: accent }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_42%)]" />
      <div className="absolute left-0 top-0 h-full w-2 bg-black/20" />
      <div className="relative flex h-full flex-col justify-between p-4 text-white">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
          English PDF
        </p>
        <div>
          <p className="font-serif text-lg leading-tight">{title}</p>
          <p className="mt-2 text-sm text-white/80">Volume {volume}</p>
        </div>
      </div>
    </div>
  );
}
