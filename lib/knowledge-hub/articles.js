// Server-only: reads the Markdown articles in /content/knowledge-hub.
// Each article is one .md file; its file name (without .md) is its URL slug.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getCategory } from "./categories";

const ARTICLES_DIR = path.join(process.cwd(), "content", "knowledge-hub");

function toISODate(value) {
    if (!value) return null;
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value);
}

function readArticle(fileName) {
    const slug = fileName.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
    const { data, content } = matter(raw);

    const categories = (data.categories || [])
        .map((c) => String(c).toLowerCase().trim())
        .filter((c) => {
            if (getCategory(c)) return true;
            console.warn(`[knowledge-hub] "${slug}" uses unknown category "${c}"`);
            return false;
        });

    const words = content.trim().split(/\s+/).length;

    return {
        slug,
        title: data.title || slug,
        author: data.author || null,
        date: toISODate(data.date),
        summary: data.summary || "",
        thumbnail: data.thumbnail || null,
        categories,
        readingMinutes: Math.max(1, Math.round(words / 200)),
        content,
    };
}

// All articles, newest first. Files starting with "_" are treated as drafts and skipped.
export function getAllArticles() {
    if (!fs.existsSync(ARTICLES_DIR)) return [];
    return fs
        .readdirSync(ARTICLES_DIR)
        .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
        .map(readArticle)
        .sort((a, b) => (b.date || "").localeCompare(a.date || "") || a.title.localeCompare(b.title));
}

export function getArticle(slug) {
    return getAllArticles().find((a) => a.slug === slug) || null;
}

// Article data without the body, safe to send to the browser for the listing page.
export function toCard({ content, ...card }) {
    return card;
}

export function formatDate(iso) {
    if (!iso) return null;
    const d = new Date(`${iso}T00:00:00Z`);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
