"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCategory } from "@/lib/knowledge-hub/categories";
import ArticleThumbnail from "./ArticleThumbnail";

export default function ArticleCard({ article }) {
    const cats = article.categories.map(getCategory).filter(Boolean);

    return (
        <Link href={`/knowledge-hub/${article.slug}`} className="block h-full group">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="h-full flex flex-col bg-white border border-orange-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
                <div className="aspect-[4/3] overflow-hidden">
                    <ArticleThumbnail article={article} />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    {cats.length > 0 && (
                        <p className="text-xs font-bold uppercase tracking-widest text-[#F09304] mb-2 font-['Nunito']">
                            {cats.map((c) => c.name).join(" · ")}
                        </p>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold leading-snug text-[#790016] group-hover:text-[#C42727] transition-colors font-['Playfair_Display']">
                        {article.title}
                    </h3>
                </div>
            </motion.div>
        </Link>
    );
}
