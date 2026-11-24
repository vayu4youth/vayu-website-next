import { ScrollText, Leaf, HeartPulse } from "lucide-react";

// The Knowledge Hub categories, in the order they appear in the filter bar.
// To rename one (e.g. "Health"), change `name` here. Keep `slug` the same unless
// you also update the `categories:` line in every article that uses it.
export const categories = [
    { slug: "philosophy",  name: "Philosophy",  icon: ScrollText },
    { slug: "environment", name: "Environment", icon: Leaf },
    { slug: "health",      name: "Health",      icon: HeartPulse },
];

export function getCategory(slug) {
    return categories.find((c) => c.slug === slug);
}
