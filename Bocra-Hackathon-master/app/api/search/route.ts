// =============================================================================
// BOCRA Search API Route
// =============================================================================
// Provides site-wide search. Replace with real search engine integration.

import { NextRequest, NextResponse } from "next/server"
import type { SearchResult, APIResponse } from "@/types"

const mockContent: SearchResult[] = [
    { type: "service", title: "Telecommunications Licensing", description: "Apply for a telecommunications operator license in Botswana", url: "/services/telecom-license" },
    { type: "service", title: "Broadcasting License Application", description: "Obtain a broadcasting license for TV or radio services", url: "/services/broadcasting-license" },
    { type: "service", title: "Domain Registration (.bw)", description: "Register a .bw domain name for your organization", url: "/services/domain-registration" },
    { type: "service", title: "Spectrum Allocation", description: "Apply for radio frequency spectrum allocation", url: "/services/spectrum" },
    { type: "service", title: "Cybersecurity Incident Report", description: "Report cybersecurity threats, breaches, or suspicious activities", url: "/services/cyber-report" },
    { type: "news", title: "5G Network Expansion Reaches Rural Areas", description: "Major milestone as 5G coverage extends to remote communities", url: "/news/5g-rural-expansion" },
    { type: "news", title: "Consumer Protection Guidelines Updated", description: "Enhanced guidelines for fair pricing and quality service delivery", url: "/news/consumer-protection-update" },
    { type: "regulation", title: "Telecommunications Act", description: "The primary legislation governing telecommunications in Botswana", url: "/regulations/telecom-act" },
    { type: "regulation", title: "Broadcasting Regulations 2024", description: "Updated regulations for broadcast content and licensing", url: "/regulations/broadcasting-2024" },
    { type: "regulation", title: "Data Protection Guidelines", description: "BOCRA guidelines on data protection and privacy for operators", url: "/regulations/data-protection" },
    { type: "complaint", title: "File a Complaint", description: "Submit a complaint about your telecommunications or broadcast service", url: "/complaints/new" },
    { type: "license", title: "Check License Status", description: "Verify the status of your license application", url: "/licenses/status" },
    { type: "domain", title: ".bw Domain Search", description: "Check availability and register Botswana domain names", url: "/domains/search" },
]

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""
    const filter = searchParams.get("filter")?.toLowerCase()

    let results = [...mockContent]

    // Filter by type
    if (filter && filter !== "all") {
        results = results.filter((r) => r.type === filter)
    }

    // Search by query
    if (query) {
        results = results.filter(
            (r) =>
                r.title.toLowerCase().includes(query) ||
                r.description.toLowerCase().includes(query) ||
                r.type.toLowerCase().includes(query)
        )
    }

    // Add relevance scores
    results = results.map((r) => ({
        ...r,
        relevance: query
            ? (r.title.toLowerCase().includes(query) ? 2 : 0) +
            (r.description.toLowerCase().includes(query) ? 1 : 0)
            : 1,
    }))

    // Sort by relevance
    results.sort((a, b) => (b.relevance || 0) - (a.relevance || 0))

    const response: APIResponse<SearchResult[]> = {
        data: results,
        success: true,
        total: results.length,
    }

    return NextResponse.json(response)
}
