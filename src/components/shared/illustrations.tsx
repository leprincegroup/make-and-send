/**
 * Hand-drawn style SVG illustrations to add personality and fun
 * throughout the Make & Send marketing site.
 */

interface IllustrationProps {
  className?: string;
  color?: string;
}

/** Squiggly underline — place below headings for playful emphasis */
export function SquigglyUnderline({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 8C20 2 30 10 50 6C70 2 80 10 100 6C120 2 130 10 150 6C170 2 180 10 198 4"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn star / sparkle burst */
export function DoodleStar({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 4C25 16 32 23 44 24C32 25 25 32 24 44C23 32 16 25 4 24C16 23 23 16 24 4Z"
        fill={color}
      />
    </svg>
  );
}

/** Small 4-point sparkle */
export function MiniSparkle({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2C12.5 8 16 11.5 22 12C16 12.5 12.5 16 12 22C11.5 16 8 12.5 2 12C8 11.5 11.5 8 12 2Z"
        fill={color}
      />
    </svg>
  );
}

/** Bouncy curved arrow — great for pointing at CTAs */
export function BouncyArrow({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 50C10 20 30 8 54 12C62 14 68 20 70 28"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M60 22L70 28L64 38"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Hand-drawn heart */
export function DoodleHeart({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 42C24 42 6 30 6 18C6 12 10 6 16 6C20 6 23 9 24 12C25 9 28 6 32 6C38 6 42 12 42 18C42 30 24 42 24 42Z"
        fill={color}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Confetti pieces — scatter these around celebrations */
export function Confetti({ className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Small rectangles at angles */}
      <rect x="20" y="15" width="8" height="4" rx="2" fill="#D4A853" transform="rotate(-25 20 15)" />
      <rect x="55" y="8" width="6" height="3" rx="1.5" fill="#E07A5F" transform="rotate(15 55 8)" />
      <rect x="90" y="20" width="8" height="4" rx="2" fill="#88C9A1" transform="rotate(-40 90 20)" />
      <rect x="30" y="50" width="7" height="3.5" rx="1.5" fill="#E07A5F" transform="rotate(30 30 50)" />
      <rect x="85" y="55" width="6" height="3" rx="1.5" fill="#D4A853" transform="rotate(-15 85 55)" />
      {/* Small circles */}
      <circle cx="45" cy="30" r="3" fill="#88C9A1" />
      <circle cx="75" cy="40" r="2.5" fill="#D4A853" />
      <circle cx="15" cy="70" r="2" fill="#E07A5F" />
      <circle cx="100" cy="75" r="3" fill="#88C9A1" />
      {/* Small triangles */}
      <polygon points="65,65 70,58 75,65" fill="#D4A853" transform="rotate(20 70 62)" />
      <polygon points="10,35 15,28 20,35" fill="#88C9A1" transform="rotate(-10 15 32)" />
    </svg>
  );
}

/** Wobbly hand-drawn circle — great for highlighting numbers or icons */
export function WobblyCircle({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M50 8C65 6 82 15 90 30C98 45 96 65 85 78C74 91 55 96 40 92C25 88 12 75 8 58C4 41 10 22 25 12C35 6 42 7 50 8Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn gift box */
export function DoodleGift({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Box body */}
      <rect x="8" y="26" width="48" height="32" rx="3" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Lid */}
      <rect x="4" y="18" width="56" height="10" rx="3" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Ribbon vertical */}
      <line x1="32" y1="18" x2="32" y2="58" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Ribbon horizontal */}
      <line x1="8" y1="40" x2="56" y2="40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Bow */}
      <path d="M24 18C24 12 28 8 32 8C28 8 24 4 24 2" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 18C40 12 36 8 32 8C36 8 40 4 40 2" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Hand-drawn camera */
export function DoodleCamera({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Body */}
      <rect x="4" y="14" width="56" height="30" rx="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Viewfinder bump */}
      <path d="M22 14L26 6H38L42 14" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lens */}
      <circle cx="32" cy="30" r="10" stroke={color} strokeWidth="2.5" />
      <circle cx="32" cy="30" r="5" stroke={color} strokeWidth="1.5" />
      {/* Flash */}
      <circle cx="50" cy="20" r="2" fill={color} />
    </svg>
  );
}

/** Smiley face doodle */
export function DoodleSmile({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2.5" />
      <circle cx="17" cy="20" r="2.5" fill={color} />
      <circle cx="31" cy="20" r="2.5" fill={color} />
      <path
        d="M15 30C17 34 20 36 24 36C28 36 31 34 33 30"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Wavy line separator */
export function WavyLine({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 300 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 10C25 0 50 20 75 10C100 0 125 20 150 10C175 0 200 20 225 10C250 0 275 20 300 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn swirl / spiral */
export function DoodleSwirl({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 28C22 28 20 26 20 24C20 22 22 20 24 20C27 20 30 22 30 25C30 29 27 32 24 32C19 32 16 28 16 24C16 19 20 16 24 16C30 16 34 20 34 25C34 31 30 36 24 36"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Hand-drawn zigzag / lightning bolt */
export function DoodleZigzag({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 32 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 4L8 22H16L12 44L26 20H17L22 4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Floating dots pattern — subtle background decoration */
export function FloatingDots({ className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="30" r="3" fill="currentColor" opacity="0.15" />
      <circle cx="60" cy="15" r="2" fill="currentColor" opacity="0.1" />
      <circle cx="100" cy="40" r="4" fill="currentColor" opacity="0.12" />
      <circle cx="140" cy="20" r="2.5" fill="currentColor" opacity="0.08" />
      <circle cx="180" cy="35" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="40" cy="80" r="2" fill="currentColor" opacity="0.1" />
      <circle cx="80" cy="70" r="3.5" fill="currentColor" opacity="0.08" />
      <circle cx="120" cy="90" r="2" fill="currentColor" opacity="0.12" />
      <circle cx="160" cy="75" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="30" cy="130" r="2.5" fill="currentColor" opacity="0.08" />
      <circle cx="70" cy="120" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="110" cy="140" r="2" fill="currentColor" opacity="0.12" />
      <circle cx="150" cy="125" r="4" fill="currentColor" opacity="0.08" />
      <circle cx="190" cy="110" r="2" fill="currentColor" opacity="0.1" />
      <circle cx="50" cy="170" r="3" fill="currentColor" opacity="0.1" />
      <circle cx="90" cy="185" r="2.5" fill="currentColor" opacity="0.08" />
      <circle cx="130" cy="170" r="3" fill="currentColor" opacity="0.12" />
      <circle cx="170" cy="160" r="2" fill="currentColor" opacity="0.1" />
    </svg>
  );
}

/** Bobblehead in a business suit — oversized head on spring, full body line art */
export function BobbleheadSuit({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Oversized round head */}
      <circle cx="40" cy="24" r="20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eyes */}
      <circle cx="34" cy="22" r="1.5" fill={color} />
      <circle cx="46" cy="22" r="1.5" fill={color} />
      {/* Friendly smile */}
      <path d="M35 29C37 32 43 32 45 29" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spring/wobble neck connector */}
      <path d="M40 44C36 46 44 48 40 50C36 52 44 54 40 56" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Suit jacket body */}
      <path d="M28 60C26 62 24 78 24 84L56 84C56 78 54 62 52 60" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Jacket lapels */}
      <path d="M36 56L32 68" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M44 56L48 68" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Tie */}
      <path d="M40 58L38 70L40 76L42 70L40 58" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Jacket center line */}
      <line x1="40" y1="76" x2="40" y2="84" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Arms */}
      <path d="M28 62L20 76" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 62L60 76" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Legs */}
      <path d="M34 84L32 104" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 84L48 104" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Shoes */}
      <path d="M28 104L32 104L34 106" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 104L48 104L46 106" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bobblehead in casual t-shirt outfit — oversized head on spring, relaxed style */
export function BobbleheadCasual({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Oversized round head */}
      <circle cx="40" cy="24" r="20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eyes */}
      <circle cx="34" cy="22" r="1.5" fill={color} />
      <circle cx="46" cy="22" r="1.5" fill={color} />
      {/* Friendly smile */}
      <path d="M35 29C37 32 43 32 45 29" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Hair tuft */}
      <path d="M32 6C34 3 38 2 42 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spring/wobble neck connector */}
      <path d="M40 44C36 46 44 48 40 50C36 52 44 54 40 56" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* T-shirt body */}
      <path d="M30 58C28 60 26 74 26 80L54 80C54 74 52 60 50 58" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* T-shirt neckline */}
      <path d="M34 56C36 60 44 60 46 56" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* T-shirt hem */}
      <line x1="26" y1="80" x2="54" y2="80" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Short sleeves */}
      <path d="M30 58L22 66L26 68" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 58L58 66L54 68" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arms */}
      <path d="M24 67L20 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 67L60 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pants */}
      <path d="M26 80L26 84L54 84L54 80" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Legs */}
      <path d="M34 84L32 104" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M46 84L48 104" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Sneakers */}
      <path d="M28 104L32 104L35 106" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 104L48 104L45 106" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Three bobblehead figures standing together as a team */
export function BobbleheadTeam({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 140 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* --- Left figure --- */}
      <circle cx="30" cy="20" r="14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="26" cy="18" r="1" fill={color} />
      <circle cx="34" cy="18" r="1" fill={color} />
      <path d="M27 23C28 25 32 25 33 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M30 34C28 36 32 37 30 39" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 42C21 44 20 56 20 60L40 60C40 56 39 44 38 42" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26 60L25 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 60L35 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 78L25 78L27 80" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 78L35 78L33 80" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* --- Center figure (slightly taller) --- */}
      <circle cx="70" cy="16" r="15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="66" cy="14" r="1" fill={color} />
      <circle cx="74" cy="14" r="1" fill={color} />
      <path d="M67 20C68 22 72 22 73 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M70 31C68 33 72 34 70 36" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M61 39C60 41 58 54 58 58L82 58C82 54 80 41 79 39" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 58L65 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 58L75 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 78L65 78L67 80" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M78 78L75 78L73 80" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* --- Right figure --- */}
      <circle cx="110" cy="20" r="14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="106" cy="18" r="1" fill={color} />
      <circle cx="114" cy="18" r="1" fill={color} />
      <path d="M107 23C108 25 112 25 113 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M110 34C108 36 112 37 110 39" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M102 42C101 44 100 56 100 60L120 60C120 56 119 44 118 42" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M106 60L105 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M114 60L115 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M102 78L105 78L107 80" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M118 78L115 78L113 80" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bobblehead sitting on a desk/shelf with a nameplate base — side view */
export function BobbleheadDesk({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Desk surface */}
      <line x1="4" y1="90" x2="96" y2="90" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Nameplate base */}
      <rect x="22" y="78" width="42" height="12" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Nameplate text line */}
      <line x1="32" y1="84" x2="54" y2="84" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Body on base */}
      <path d="M34 78C32 76 30 66 30 62L56 62C56 66 54 76 52 78" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Collar / shirt hint */}
      <path d="M38 56L40 62" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M48 56L46 62" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spring/wobble neck */}
      <path d="M43 52C40 53 46 55 43 56" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Oversized round head */}
      <circle cx="43" cy="34" r="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eyes */}
      <circle cx="37" cy="32" r="1.5" fill={color} />
      <circle cx="49" cy="32" r="1.5" fill={color} />
      {/* Smile */}
      <path d="M38 38C40 41 46 41 48 38" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Small arms at sides */}
      <path d="M30 64L24 72" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 64L62 72" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Shelf bracket hints */}
      <path d="M8 90L8 96" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M92 90L92 96" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bobblehead emerging from an open gift box with tissue paper */
export function BobbleheadGift({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Gift box bottom */}
      <rect x="16" y="76" width="68" height="36" rx="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Gift box ribbon vertical */}
      <line x1="50" y1="76" x2="50" y2="112" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Gift box ribbon horizontal */}
      <line x1="16" y1="94" x2="84" y2="94" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Open lid — tilted back */}
      <path d="M12 76L10 66L90 66L88 76" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Lid top */}
      <line x1="10" y1="66" x2="90" y2="66" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Tissue paper poking out */}
      <path d="M24 66C22 58 26 54 30 56" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 66C74 58 70 52 66 55" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 66C32 60 36 56 40 58" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 66C64 60 60 54 56 57" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bobblehead body emerging from box */}
      <path d="M38 66L38 52L62 52L62 66" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spring/wobble neck */}
      <path d="M50 48C47 49 53 51 50 52" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Oversized round head */}
      <circle cx="50" cy="30" r="18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eyes */}
      <circle cx="44" cy="28" r="1.5" fill={color} />
      <circle cx="56" cy="28" r="1.5" fill={color} />
      {/* Happy smile */}
      <path d="M44 35C46 38 54 38 56 35" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Small sparkle accents */}
      <path d="M18 46L16 42L20 44" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M82 40L84 36L80 38" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bobblehead with motion lines suggesting the classic wobble — ideal for CSS animation */
export function BobbleheadWobble({ className = "", color = "currentColor" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 90 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Oversized round head */}
      <circle cx="45" cy="26" r="20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eyes */}
      <circle cx="39" cy="24" r="1.5" fill={color} />
      <circle cx="51" cy="24" r="1.5" fill={color} />
      {/* Friendly smile */}
      <path d="M40 31C42 34 48 34 50 31" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Motion lines around head — left side */}
      <path d="M10 16C12 14 14 14 16 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 26C10 24 13 24 15 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 36C12 34 14 34 16 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Motion lines around head — right side */}
      <path d="M74 16C76 14 78 14 80 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75 26C77 24 80 24 82 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M74 36C76 34 78 34 80 36" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Spring/wobble neck connector */}
      <path d="M45 46C41 48 49 50 45 52C41 54 49 56 45 58" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Body */}
      <path d="M33 60C31 62 29 76 29 82L61 82C61 76 59 62 57 60" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Shirt collar */}
      <path d="M39 58L41 64" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M51 58L49 64" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arms */}
      <path d="M33 62L25 74" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M57 62L65 74" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Legs */}
      <path d="M38 82L36 102" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 82L54 102" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Shoes */}
      <path d="M32 102L36 102L38 104" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M58 102L54 102L52 104" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Base/stand */}
      <path d="M26 106L64 106" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 106L28 112L62 112L62 106" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
