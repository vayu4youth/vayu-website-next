import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { getAllArticles, getArticle, toCard, formatDate } from "@/lib/knowledge-hub/articles";
import { getCategory } from "@/lib/knowledge-hub/categories";
import FadeIn from "@/components/knowledge-hub/FadeIn";
import ArticleCard from "@/components/knowledge-hub/ArticleCard";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const article = getArticle(slug);
    if (!article) return {};
    return {
        title: `${article.title} – VAYU Knowledge Hub`,
        description: article.summary || undefined,
        openGraph: {
            title: article.title,
            description: article.summary || undefined,
            type: "article",
            images: [article.thumbnail || "/knowledge-hub/vayu-research.png"],
        },
    };
}

// External links open in a new tab; internal links stay in the site.
const markdownComponents = {
    a: ({ href = "", children }) =>
        /^https?:\/\//.test(href) ? (
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
        ) : (
            <Link href={href}>{children}</Link>
        ),
};

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const article = getArticle(slug);
    if (!article) notFound();

    const cats = article.categories.map(getCategory).filter(Boolean);
    const more = getAllArticles().filter((a) => a.slug !== slug).slice(0, 3).map(toCard);

    return (
        <div className="w-full bg-white min-h-screen">
            <section className="px-6 pt-10 pb-14 md:pt-14 md:pb-20 bg-linear-to-br from-[#EFA92A] to-orange-50">
                <div className="max-w-3xl mx-auto">
                    <FadeIn>
                        <Link
                            href="/knowledge-hub"
                            className="inline-flex items-center gap-2 text-[#790016] hover:text-[#C42727] font-semibold font-['Playfair_Display'] mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Knowledge Hub
                        </Link>

                        {cats.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {cats.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/knowledge-hub?category=${cat.slug}`}
                                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#F09304]/30 text-sm font-bold text-[#D7572A] hover:bg-white/80 transition-colors font-['Nunito']"
                                    >
                                        <cat.icon className="w-4 h-4" /> {cat.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#790016] font-['Playfair_Display']">
                            {article.title}
                        </h1>

                        {article.summary && (
                            <p className="text-xl md:text-2xl italic leading-relaxed text-[#C42727] font-['Source_Sans_3'] mb-8">
                                {article.summary}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 border-t border-[#F09304]/50 text-[#D7572A] font-['Nunito'] font-semibold">
                            {article.author && (
                                <span className="inline-flex items-center gap-2"><User className="w-4 h-4" /> {article.author}</span>
                            )}
                            {article.date && (
                                <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(article.date)}</span>
                            )}
                            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" /> {article.readingMinutes} min read</span>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {article.thumbnail && (
                <div className="px-6 -mt-8 md:-mt-10">
                    <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-orange-100 shadow-lg">
                        <img src={article.thumbnail} alt="" className="w-full max-h-[480px] object-cover" />
                    </div>
                </div>
            )}

            <article className="px-6 py-12 md:py-16">
                <FadeIn delay={0.2} className="max-w-3xl mx-auto article-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {article.content}
                    </ReactMarkdown>
                </FadeIn>
            </article>

            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto pt-16 border-t border-dashed border-[#F09304]/40">
                    {more.length > 0 && (
                        <>
                            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-[#790016] font-['Playfair_Display']">
                                Keep Reading
                            </h2>
                            <div className="flex flex-wrap justify-center gap-8 mb-12">
                                {more.map((a) => (
                                    <div key={a.slug} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]">
                                        <ArticleCard article={a} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <div className="flex justify-center">
                        <Link
                            href="/knowledge-hub"
                            className="px-8 py-4 bg-[#D7572A] text-white rounded-full font-['Playfair_Display'] hover:bg-[#DE6A10] transition-colors flex items-center gap-2"
                        >
                            All Articles <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
