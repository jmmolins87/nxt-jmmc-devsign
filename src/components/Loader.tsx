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
              <stop stopColor="#00D5FF" />
              <stop offset="0.45" stopColor="#3A6DFF" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>

            <linearGradient id="jmmcPanelGradient" x1="78" y1="68" x2="145" y2="159" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00D5FF" stopOpacity="0.95" />
              <stop offset="0.45" stopColor="#2E5BFF" stopOpacity="0.82" />
              <stop offset="1" stopColor="#A855F7" stopOpacity="0.95" />
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
              opacity="0.86"
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

        <div className="flex items-center gap-1.5 text-4xl md:text-6xl tracking-tight text-white/95 font-light">
          <span>jmmc</span>
          <span className="jmmc-dot block h-2.5 w-2.5 self-end rounded-full bg-violet-500 shadow-[0_0_22px_rgba(168,85,247,0.9)] md:h-3.5 md:w-3.5" />
          <span>devsign</span>
        </div>
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
          animation: panelPulse 2.4s cubic-bezier(.76,0,.24,1) infinite;
        }

        .jmmc-shadow {
          transform-origin: center;
          animation: shadowPulse 2.4s ease-in-out infinite;
        }

        .jmmc-dot {
          animation: dotPulse 1.6s ease-in-out infinite;
        }

        @keyframes drawStroke {
          0% {
            stroke-dashoffset: 360;
            opacity: .25;
            filter: drop-shadow(0 0 0 rgba(0, 213, 255, 0));
          }
          38% {
            stroke-dashoffset: 0;
            opacity: 1;
            filter: drop-shadow(0 0 14px rgba(0, 213, 255, .75));
          }
          68% {
            stroke-dashoffset: 0;
            opacity: 1;
            filter: drop-shadow(0 0 18px rgba(168, 85, 247, .7));
          }
          100% {
            stroke-dashoffset: -360;
            opacity: .35;
            filter: drop-shadow(0 0 0 rgba(168, 85, 247, 0));
          }
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

        @keyframes dotPulse {
          0%, 100% {
            opacity: .55;
            transform: scale(.82);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jmmc-stroke,
          .jmmc-fill-panel,
          .jmmc-shadow,
          .jmmc-dot {
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
