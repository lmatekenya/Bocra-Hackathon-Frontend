// =============================================================================
// BOCRA News API Route
// =============================================================================
// Serves news articles. Replace mock data with real DB/CMS integration.

import { NextRequest, NextResponse } from "next/server"
import type { NewsArticle, APIResponse } from "@/types"

const mockNews: NewsArticle[] = [
    {
        id: "1",
        title: "New Cybersecurity Regulations Coming in 2026",
        summary:
            "BOCRA announces comprehensive cybersecurity framework to protect national digital infrastructure and safeguard consumer data across all telecommunications networks.",
        publishedAt: "2026-03-20",
        category: "Policy",
        slug: "cybersecurity-regulations-2026",
        imageUrl: "/images/news-1.jpg",
    },
    {
        id: "2",
        title: "5G Network Expansion Reaches Rural Areas",
        summary:
            "Major milestone achieved as 5G coverage extends to remote communities across Botswana, connecting thousands of citizens to high-speed internet for the first time.",
        publishedAt: "2026-03-18",
        category: "Infrastructure",
        slug: "5g-rural-expansion",
        imageUrl: "/images/news-2.jpg",
    },
    {
        id: "3",
        title: "Consumer Protection Guidelines Updated",
        summary:
            "Enhanced guidelines ensure fair pricing and quality service delivery for all telecommunications users, with new provisions for data privacy protections.",
        publishedAt: "2026-03-15",
        category: "Consumer",
        slug: "consumer-protection-update",
        imageUrl: "/images/news-3.jpg",
    },
    {
        id: "4",
        title: "Spectrum Allocation Review Completed",
        summary:
            "BOCRA completes its biennial review of radio spectrum allocation, introducing new frequency bands for emerging wireless technologies.",
        publishedAt: "2026-03-10",
        category: "Spectrum",
        slug: "spectrum-allocation-review",
        imageUrl: "/images/news-4.jpg",
    },
    {
        id: "5",
        title: "Digital Literacy Partnership with Schools",
        summary:
            "New partnership between BOCRA and the Ministry of Education to integrate digital literacy programmes in schools nationwide.",
        publishedAt: "2026-03-05",
        category: "Education",
        slug: "digital-literacy-schools",
        imageUrl: "/images/news-5.jpg",
    },
]

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")

    let articles = [...mockNews]

    if (limit) {
        articles = articles.slice(0, parseInt(limit, 10))
    }

    const response: APIResponse<NewsArticle[]> = {
        data: articles,
        success: true,
        total: articles.length,
    }

    return NextResponse.json(response)
}
