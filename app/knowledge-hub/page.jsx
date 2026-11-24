import { Suspense } from "react";
import { getAllArticles, toCard } from "@/lib/knowledge-hub/articles";
import KnowledgeHub from "@/components/knowledge-hub/KnowledgeHub";
import FadeIn from "@/components/knowledge-hub/FadeIn";

export default function KnowledgeHubPage() {
    const articles = getAllArticles().map(toCard);

    return (
        <div className="w-full bg-white min-h-screen">
            <section className="px-6 py-16 md:py-20 bg-linear-to-br from-[#EFA92A] to-orange-50">
                <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
                    <FadeIn className="flex-1 text-center md:text-left">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#790016] font-['Playfair_Display']">
                            Knowledge Hub
                        </h1>
                        <p className="text-xl md:text-2xl italic leading-relaxed text-[#C42727] font-['Source_Sans_3'] max-w-2xl">
                            Articles and research from the VAYU community on Vedic philosophy, the environment, and health.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.2} className="shrink-0">
                        <img
                            src="/knowledge-hub/vayu-research.png"
                            alt="VAYU Research"
                            className="w-48 h-48 md:w-64 md:h-64 rounded-3xl border border-orange-200 shadow-lg"
                        />
                    </FadeIn>
                </div>
            </section>

            <section className="px-6 py-12 md:py-16">
                <div className="max-w-6xl mx-auto">
                    <Suspense fallback={null}>
                        <KnowledgeHub articles={articles} />
                    </Suspense>
                </div>
            </section>
        </div>
    );
}
