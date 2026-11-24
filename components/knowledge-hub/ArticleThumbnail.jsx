import { getCategory } from "@/lib/knowledge-hub/categories";

// Shows the article's thumbnail image, or a styled placeholder in the site's
// colours (with the article's category icons) when it doesn't have one yet.
export default function ArticleThumbnail({ article, className = "" }) {
    if (article.thumbnail) {
        return (
            <img
                src={article.thumbnail}
                alt=""
                className={`w-full h-full object-cover ${className}`}
            />
        );
    }

    const cats = article.categories.map(getCategory).filter(Boolean);

    return (
        <div
            className={`w-full h-full bg-linear-to-br from-[#EFA92A] to-orange-50 flex flex-col items-center justify-center gap-4 ${className}`}
        >
            <div className="flex items-center gap-3">
                {cats.map((cat) => (
                    <div
                        key={cat.slug}
                        className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm border border-[#F09304]/30 shadow-sm flex items-center justify-center"
                    >
                        <cat.icon className="w-8 h-8 text-[#D7572A]" />
                    </div>
                ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#790016]/70 font-['Nunito']">
                VAYU Research
            </span>
        </div>
    );
}
