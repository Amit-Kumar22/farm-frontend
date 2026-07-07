import { Fish, Milk, Carrot, Sprout, Leaf } from "lucide-react";

export function getBusinessIcon(title = "") {
  const t = title.toLowerCase();
  if (t.includes("fish")) return Fish;
  if (t.includes("dairy") || t.includes("milk")) return Milk;
  if (t.includes("vegetable")) return Carrot;
  if (t.includes("mushroom")) return Sprout;
  return Leaf;
}
