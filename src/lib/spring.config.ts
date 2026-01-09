/**
 * Reusable spring physics configurations for consistent motion
 */

export const springConfigs = {
  gentle: { type: "spring", stiffness: 150, damping: 30 },
  snappy: { type: "spring", stiffness: 300, damping: 20 },
  bouncy: { type: "spring", stiffness: 400, damping: 10 },
  smooth: { type: "easeInOut", duration: 0.5 },
  fast: { type: "easeOut", duration: 0.2 },
} as const;
