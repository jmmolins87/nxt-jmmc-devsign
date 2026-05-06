export default function Loader() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-8">
        <svg
          className="jmmc-loader h-40 w-40 md:h-52 md:w-52"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Cargando jmmc.devsign"
        >
          <defs>
            <linearGradient id="jmmcGradient" x1="28" y1="54" x2="190" y2="166" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--brand-cyan)" />
              <stop offset="0.45" stopColor="var(--brand-blue)" />
              <stop offset="1" stopColor="var(--brand-violet)" />
            </linearGradient>

            <linearGradient id="jmmcPanelGradient" x1="78" y1="68" x2="145" y2="159" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--brand-cyan)" stopOpacity="0.95" />
              <stop offset="0.45" stopColor="var(--brand-blue-deep)" stopOpacity="0.82" />
              <stop offset="1" stopColor="var(--brand-violet)" stopOpacity="0.95" />
            </linearGradient>

            <filter id="jmmcGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.1  0 0 0 0 0.65  0 0 0 0 1  0 0 0 0.95 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="jmmcSoftShadow" x="-70%" y="-70%" width="240%" height="240%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>

          <ellipse
            className="jmmc-shadow"
            cx="108"
            cy="188"
            rx="58"
            ry="8"
            fill="url(#jmmcGradient)"
            opacity="0.42"
            filter="url(#jmmcSoftShadow)"
          />

          <g filter="url(#jmmcGlow)">
            <path
              className="jmmc-stroke jmmc-left-panel"
              d="M39 53L83 83V145L39 171V53Z"
              stroke="url(#jmmcGradient)"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            <path
              className="jmmc-fill-panel"
              d="M83 83L126 62V161L83 145V83Z"
              fill="url(#jmmcPanelGradient)"
            />

            <path
              className="jmmc-stroke jmmc-center-panel"
              d="M83 83L126 62V161L83 145V83Z"
              stroke="url(#jmmcGradient)"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            <path
              className="jmmc-stroke jmmc-right-panel"
              d="M126 62L181 31V190L126 161V62Z"
              stroke="url(#jmmcGradient)"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>
        </svg>

      </div>

      <style>{`
        .jmmc-loader {
          overflow: visible;
        }

        .jmmc-stroke {
          stroke-dasharray: 360;
          stroke-dashoffset: 360;
          animation: drawStroke 2.4s cubic-bezier(.76,0,.24,1) infinite;
        }

        .jmmc-left-panel {
          animation-delay: 0s;
        }

        .jmmc-center-panel {
          animation-delay: .18s;
        }

        .jmmc-right-panel {
          animation-delay: .36s;
        }

        .jmmc-fill-panel {
          transform-origin: 104px 112px;
          opacity: var(--loader-fill-opacity, .86);
          animation: panelPulse 2.4s cubic-bezier(.76,0,.24,1) infinite;
        }

        .jmmc-shadow {
          transform-origin: center;
          animation: shadowPulse 2.4s ease-in-out infinite;
        }

        [data-theme="light"] .jmmc-loader {
          filter: saturate(1.08) contrast(1.04);
        }

        [data-theme="light"] .jmmc-fill-panel {
          --loader-fill-opacity: .72;
        }

        @keyframes drawStroke {
          0% {
            stroke-dashoffset: 360;
            opacity: .25;
            filter: drop-shadow(0 0 0 rgba(var(--brand-cyan-rgb), 0));
          }
          38% {
            stroke-dashoffset: 0;
            opacity: 1;
            filter: drop-shadow(0 0 14px rgba(var(--brand-cyan-rgb), .75));
          }
          68% {
            stroke-dashoffset: 0;
            opacity: 1;
            filter: drop-shadow(0 0 18px rgba(var(--brand-violet-rgb), .7));
          }
          100% {
            stroke-dashoffset: -360;
            opacity: .35;
            filter: drop-shadow(0 0 0 rgba(var(--brand-violet-rgb), 0));
          }
        }

        [data-theme="light"] .jmmc-stroke {
          filter: drop-shadow(0 0 10px rgba(var(--brand-blue-rgb), .45));
        }

        @keyframes panelPulse {
          0%, 100% {
            opacity: .32;
            transform: scale(.96);
          }
          42% {
            opacity: .92;
            transform: scale(1.015);
          }
          68% {
            opacity: .72;
            transform: scale(1);
          }
        }

        @keyframes shadowPulse {
          0%, 100% {
            opacity: .16;
            transform: scaleX(.72);
          }
          45% {
            opacity: .55;
            transform: scaleX(1.08);
          }
          70% {
            opacity: .32;
            transform: scaleX(.94);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jmmc-stroke,
          .jmmc-fill-panel,
          .jmmc-shadow {
            animation: none;
          }

          .jmmc-stroke {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
