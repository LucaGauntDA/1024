import React from 'react';

interface Logo1024Props {
  className?: string;
  size?: number | string;
}

export const Logo1024: React.FC<Logo1024Props> = ({ className = 'w-10 h-10', size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="1024 Logo"
    >
      <defs>
        <filter id="logo-red-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="logo-yellow-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="logo-green-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="logo-blue-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Rounded container background for in-app badge */}
      <rect width="512" height="512" rx="108" fill="#000000" />
      <rect
        x="8"
        y="8"
        width="496"
        height="496"
        rx="100"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="6"
      />

      <g transform="translate(16, 20)">
        {/* NUMBER 1 (RED) */}
        <path
          d="M 62 208 C 50 205 38 198 38 188 C 38 178 52 170 66 166 L 94 154 C 104 148 112 136 116 116 L 126 78 C 130 68 140 60 152 60 C 164 60 172 70 172 82 L 166 220 L 160 380 C 158 402 154 422 144 430 C 136 436 122 436 114 428 C 106 420 108 404 110 384 L 120 220 C 122 196 110 186 92 192 L 66 200 Z"
          fill="#850f16"
          transform="translate(6, 4)"
        />
        <path
          d="M 62 208 C 50 205 38 198 38 188 C 38 178 52 170 66 166 L 94 154 C 104 148 112 136 116 116 L 126 78 C 130 68 140 60 152 60 C 164 60 172 70 172 82 L 166 220 L 160 380 C 158 402 154 422 144 430 C 136 436 122 436 114 428 C 106 420 108 404 110 384 L 120 220 C 122 196 110 186 92 192 L 66 200 Z"
          fill="#ad1822"
          transform="translate(3, 2)"
        />
        <path
          d="M 62 208 C 50 205 38 198 38 188 C 38 178 52 170 66 166 L 94 154 C 104 148 112 136 116 116 L 126 78 C 130 68 140 60 152 60 C 164 60 172 70 172 82 L 166 220 L 160 380 C 158 402 154 422 144 430 C 136 436 122 436 114 428 C 106 420 108 404 110 384 L 120 220 C 122 196 110 186 92 192 L 66 200 Z"
          fill="#ff2d3c"
          filter="url(#logo-red-glow)"
        />
        <path
          d="M 126 84 L 122 220 L 116 384"
          stroke="#ff6874"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* NUMBER 0 (YELLOW) */}
        <g transform="translate(186, 240) rotate(-6)">
          <path
            fillRule="evenodd"
            d="M 0 -84 C 36 -84 56 -56 56 0 C 56 56 36 84 0 84 C -36 84 -56 56 -56 0 C -56 -56 -36 -84 0 -84 Z M 0 -50 C 16 -50 24 -32 24 0 C 24 32 16 50 0 50 C -16 50 -24 32 -24 0 C -24 -32 -16 -50 0 -50 Z"
            fill="#736100"
            transform="translate(12, 14)"
          />
          <path
            fillRule="evenodd"
            d="M 0 -84 C 36 -84 56 -56 56 0 C 56 56 36 84 0 84 C -36 84 -56 56 -56 0 C -56 -56 -36 -84 0 -84 Z M 0 -50 C 16 -50 24 -32 24 0 C 24 32 16 50 0 50 C -16 50 -24 32 -24 0 C -24 -32 -16 -50 0 -50 Z"
            fill="#9e8500"
            transform="translate(6, 7)"
          />
          <path
            fillRule="evenodd"
            d="M 0 -84 C 36 -84 56 -56 56 0 C 56 56 36 84 0 84 C -36 84 -56 56 -56 0 C -56 -56 -36 -84 0 -84 Z M 0 -50 C 16 -50 24 -32 24 0 C 24 32 16 50 0 50 C -16 50 -24 32 -24 0 C -24 -32 -16 -50 0 -50 Z"
            fill="#ffd800"
            filter="url(#logo-yellow-glow)"
          />
          <path
            d="M -42 -20 C -42 -60 -24 -76 0 -76 C 24 -76 42 -60 42 -20"
            stroke="#fffa8a"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </g>

        {/* NUMBER 2 (GREEN) */}
        <g transform="translate(294, 260) rotate(-10)">
          <path
            d="M -54 -54 C -54 -84 -28 -100 8 -100 C 44 -100 64 -78 64 -46 C 64 -20 48 4 16 34 L -18 64 L 66 64 L 66 94 L -58 94 L -58 66 L -4 14 C 24 -14 34 -28 34 -44 C 34 -60 22 -72 6 -72 C -10 -72 -22 -62 -24 -46 Z"
            fill="#095412"
            transform="translate(12, 12)"
          />
          <path
            d="M -54 -54 C -54 -84 -28 -100 8 -100 C 44 -100 64 -78 64 -46 C 64 -20 48 4 16 34 L -18 64 L 66 64 L 66 94 L -58 94 L -58 66 L -4 14 C 24 -14 34 -28 34 -44 C 34 -60 22 -72 6 -72 C -10 -72 -22 -62 -24 -46 Z"
            fill="#12801f"
            transform="translate(6, 6)"
          />
          <path
            d="M -54 -54 C -54 -84 -28 -100 8 -100 C 44 -100 64 -78 64 -46 C 64 -20 48 4 16 34 L -18 64 L 66 64 L 66 94 L -58 94 L -58 66 L -4 14 C 24 -14 34 -28 34 -44 C 34 -60 22 -72 6 -72 C -10 -72 -22 -62 -24 -46 Z"
            fill="#1ee024"
            filter="url(#logo-green-glow)"
          />
          <path
            d="M -40 -60 C -34 -82 -14 -94 8 -94 C 32 -94 54 -78 54 -48"
            stroke="#98fca0"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </g>

        {/* NUMBER 4 (BLUE) */}
        <g transform="translate(396, 310) rotate(-16)">
          <path
            d="M 28 -88 L 28 20 L 58 20 L 58 52 L 28 52 L 28 106 L -6 106 L -6 52 L -74 52 L -74 20 L 2 -88 Z M -6 20 L -6 -32 L -42 20 Z"
            fill="#09357a"
            transform="translate(14, 12)"
          />
          <path
            d="M 28 -88 L 28 20 L 58 20 L 58 52 L 28 52 L 28 106 L -6 106 L -6 52 L -74 52 L -74 20 L 2 -88 Z M -6 20 L -6 -32 L -42 20 Z"
            fill="#124fa8"
            transform="translate(7, 6)"
          />
          <path
            d="M 28 -88 L 28 20 L 58 20 L 58 52 L 28 52 L 28 106 L -6 106 L -6 52 L -74 52 L -74 20 L 2 -88 Z M -6 20 L -6 -32 L -42 20 Z"
            fill="#2277ff"
            filter="url(#logo-blue-glow)"
          />
          <path
            d="M 0 -76 L -66 18"
            stroke="#93bfff"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </g>
      </g>
    </svg>
  );
};
