export function WaveformBars({ className = "" }: { className?: string }) {
  const bars = 40;
  
  return (
    <div className={`flex items-end justify-center gap-[2px] h-16 ${className}`}>
      {[...Array(bars)].map((_, i) => {
        const height = Math.sin((i / bars) * Math.PI) * 100;
        return (
          <div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-primary/30 to-primary/60"
            style={{
              height: `${Math.max(15, height)}%`,
              opacity: 0.4 + (height / 100) * 0.6,
            }}
          />
        );
      })}
    </div>
  );
}
