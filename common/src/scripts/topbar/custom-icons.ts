// Multicolour icons drawn for the site, for places where a Font Awesome icon can't carry the colours.
// The Labs site uses the same beaker as its favicon (typedb-labs/site/favicon.svg).
export const customIcons: Record<string, string> = {
    labs: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
  <defs>
    <clipPath id="labs-beaker-inside">
      <path transform="translate(-2 -1.5) rotate(12 32 40)" d="M27 22V33L14 52.5Q11 58 17 58H47Q53 58 50 52.5L37 33V22Z"/>
    </clipPath>
    <linearGradient id="labs-beaker-fluid" x1="0" y1="40" x2="0" y2="61" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#71e645"/>
      <stop offset="1" stop-color="#1cca00"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="#33e612" stroke-linecap="round">
    <path stroke-width="2.8" opacity=".9" d="M32 17.5C28 13.5 35.5 11 31.5 6.5"/>
    <path stroke-width="2.4" opacity=".6" d="M38.5 16C42.5 12 36 9.5 40 4.5"/>
    <path stroke-width="2" opacity=".4" d="M25.5 13.5C23 10.5 27 8.5 24.5 5.5"/>
  </g>
  <g clip-path="url(#labs-beaker-inside)">
    <rect width="64" height="64" fill="#aab3bf" opacity=".16"/>
    <rect y="40" width="64" height="24" fill="url(#labs-beaker-fluid)"/>
    <rect y="40" width="64" height="1.6" fill="#c3e6b5"/>
    <circle cx="21" cy="52" r="2.2" fill="#c3e6b5"/>
    <circle cx="30" cy="47" r="1.4" fill="#c3e6b5"/>
    <circle cx="35.5" cy="54.5" r="1.7" fill="#c3e6b5"/>
    <circle cx="32.5" cy="34" r="1.4" fill="#33e612"/>
  </g>
  <g fill="none" transform="translate(-2 -1.5) rotate(12 32 40)" stroke="#aab3bf" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">
    <path d="M27 22V33L14 52.5Q11 58 17 58H47Q53 58 50 52.5L37 33V22"/>
    <path d="M24 22H40"/>
    <path stroke="#fff" stroke-width="1.6" opacity=".55" d="M40.5 45.5L45 52.5"/>
  </g>
</svg>`,
};
