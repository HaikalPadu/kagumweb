export const motionTokens = {
  duration: { instant: 0.12, standard: 0.24 },
  ease: { enter: [0.16, 1, 0.3, 1] as const, standard: [0.22, 1, 0.36, 1] as const },
  spring: { smooth: { type: "spring" as const, stiffness: 420, damping: 34 }, morph: { type: "spring" as const, stiffness: 500, damping: 38 } },
};
