/**
 * The wallpaper: a static Tahoe-style gradient mesh fixed behind every section.
 * All of the look lives in styles/ui.css (.wallpaper) and is driven by the --wp-*
 * tokens, so both themes are a token swap. Deliberately static: see ui.css.
 */
export default function Background() {
  return (
    <div aria-hidden="true" className="wallpaper">
      <div className="wallpaper__mesh" />
      <div className="wallpaper__waves" />
      <div className="wallpaper__grain" />
    </div>
  )
}
