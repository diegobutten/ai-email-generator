import {
  Briefcase,
  Thermometer,
  RotateCw,
  Handshake,
  Heart,
  AlertTriangle,
  Calendar,
  Star,
  LogOut,
  LifeBuoy,
  Sparkles,
  SlidersHorizontal,
  Languages,
  LayoutTemplate,
  Copy,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  thermometer: Thermometer,
  "rotate-cw": RotateCw,
  handshake: Handshake,
  heart: Heart,
  "alert-triangle": AlertTriangle,
  calendar: Calendar,
  star: Star,
  "log-out": LogOut,
  "life-buoy": LifeBuoy,
  sparkles: Sparkles,
  "sliders-horizontal": SlidersHorizontal,
  languages: Languages,
  "layout-template": LayoutTemplate,
  copy: Copy,
  smartphone: Smartphone,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Sparkles;
}
