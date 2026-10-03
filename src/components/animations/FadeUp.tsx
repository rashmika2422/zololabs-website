"use client";
import type { ReactNode } from "react";
import { MotionGroup, MotionItem } from "@/components/ui/Motion";
export function FadeUp({ children, className }: { children: ReactNode; className?: string }) { return <MotionGroup className={className}><MotionItem>{children}</MotionItem></MotionGroup>; }
export { MotionGroup as StaggerContainer } from "@/components/ui/Motion";
export { FadeUp as SectionReveal };
