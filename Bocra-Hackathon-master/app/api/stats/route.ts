// =============================================================================
// BOCRA Stats API Route
// =============================================================================
// Serves statistics data. Replace with real analytics/DB integration.

import { NextResponse } from "next/server"
import type { Stat, APIResponse } from "@/types"

const mockStats: Stat[] = [
    {
        id: "complaints",
        value: 15420,
        suffix: "+",
        label: "Complaints Resolved",
        description: "Successfully processed consumer complaints",
    },
    {
        id: "licenses",
        value: 847,
        suffix: "",
        label: "Active Licenses",
        description: "Licensed operators and service providers",
    },
    {
        id: "domains",
        value: 125000,
        suffix: "+",
        label: "Domains Registered",
        description: ".bw domains registered and managed",
    },
    {
        id: "uptime",
        value: 99.8,
        suffix: "%",
        label: "Uptime Achieved",
        description: "Network infrastructure reliability",
    },
]

export async function GET() {
    const response: APIResponse<Stat[]> = {
        data: mockStats,
        success: true,
        total: mockStats.length,
    }

    return NextResponse.json(response)
}
