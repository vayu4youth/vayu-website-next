"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpenText } from "lucide-react";
import { categories, getCategory } from "@/lib/knowledge-hub/categories";
import ArticleCard from "./ArticleCard";

function FilterButton({ active, onClick, children, count }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-['Playfair_Display'] font-semibold transition-colors duration-300 ${
                active
                    ? "bg-[#D7572A] text-white shadow-sm"
                    : "bg-orange-100 text-[#D7572A] hover:bg-[#FDE2C4]"
            }`}
        >
            {children}
            <span
                className={`text-xs font-bold font-['Nunito'] px-2 py-0.5 rounded-full ${
                    active ? "bg-white/25 text-white" : "bg-white text-[#D7572A]"
                }`}
            >
                {count}
            </span>
        </button>
    );
}

export default function KnowledgeHub({ articles }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const param = searchParams.get("category");
    const selected = getCategory(param) ? param : null;

    const select = (slug) => {
        router.replace(slug ? `/knowledge-hub?category=${slug}` : "/knowledge-hub", { scroll: false });
    };

    const visible = selected ? articles.filter((a) => a.categories.includes(selected)) : articles;
    const selectedName = selected ? getCategory(selected).name : null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-3 mb-12"
            >
                <FilterButton active={!selected} onClick={() => select(null)} count={articles.length}>
                    All
                </FilterButton>
                {categories.map((cat) => (
                    <FilterButton
                        key={cat.slug}
                        active={selected === cat.slug}
                        onClick={() => select(cat.slug)}
                        count={articles.filter((a) => a.categories.includes(cat.slug)).length}
                    >
                        <cat.icon className="w-4 h-4" />
                        {cat.name}
                    </FilterButton>
                ))}
            </motion.div>

            {visible.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {visible.map((article) => (
                            <motion.div
                                key={article.slug}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ArticleCard article={article} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                    key={selected}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="py-16 border-t border-dashed border-[#F09304]/40 text-center"
                >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 mb-6 shadow-sm">
                        <BookOpenText className="w-7 h-7 text-[#D7572A]" />
                    </div>
                    <h2 className="text-2xl md:text-3xl text-[#790016] font-['Playfair_Display'] font-semibold italic">
                        {selectedName ? `${selectedName} articles coming soon...` : "Articles coming soon..."}
                    </h2>
                    <p className="text-[#C42727] mt-3 font-medium text-lg">
                        Stay tuned to our WhatsApp and Instagram for updates!
                    </p>
                </motion.div>
            )}
        </>
    );
}
