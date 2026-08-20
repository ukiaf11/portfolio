/** Fixed aurora glows + fine grid that sit behind every section. */
export default function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full blur-[110px] animate-float"
        style={{ background: 'var(--glow-a)' }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full blur-[120px] animate-float"
        style={{ background: 'var(--glow-c)', animationDelay: '-6s' }}
      />
      <div
        className="absolute -bottom-48 left-1/4 h-[32rem] w-[32rem] rounded-full blur-[130px] animate-float"
        style={{ background: 'var(--glow-b)', animationDelay: '-12s' }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
    </div>
  )
}
