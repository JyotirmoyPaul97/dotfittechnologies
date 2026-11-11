"use client";

import dynamic from "next/dynamic";

const ScrollScene = dynamic(
  () => import("@/components/ui/ScrollScene").then((module) => module.ScrollScene),
  { ssr: false, loading: () => null },
);

export function ScrollSceneLoader() {
  return <ScrollScene />;
}
