// =============================================================================
// BOCRA Complaints API Route
// =============================================================================
// Handles complaint submissions. Replace with real DB integration.

import { NextRequest, NextResponse } from "next/server"
import type { Complaint, APIResponse } from "@/types"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as Record<string, string>

        // Validate required fields
        const requiredFields = ["fullName", "email", "contactNumber", "serviceProvider", "complaintDetails"] as const
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    {
                        data: null,
                        success: false,
                        message: `Missing required field: ${field}`,
                    },
                    { status: 400 }
                )
            }
        }

        // In production, save to database here
        const id = `CMP-${Date.now()}`
        const complaint: Complaint = {
            id,
            fullName: body.fullName,
            email: body.email,
            contactNumber: body.contactNumber,
            serviceProvider: body.serviceProvider,
            complaintDetails: body.complaintDetails,
            providerReference: body.providerReference,
            status: "pending",
            createdAt: new Date().toISOString(),
        }

        console.log("[BOCRA] New complaint submitted:", id)

        const response: APIResponse<{ id: string }> = {
            data: { id },
            success: true,
            message: "Complaint submitted successfully. You will receive a confirmation email shortly.",
        }

        return NextResponse.json(response, { status: 201 })
    } catch {
        return NextResponse.json(
            {
                data: null,
                success: false,
                message: "Failed to process complaint. Please try again.",
            },
            { status: 500 }
        )
    }
}

export async function GET() {
    // In production, fetch from database with authentication
    return NextResponse.json({
        data: [],
        success: true,
        message: "Complaints endpoint. Use POST to submit a complaint.",
        total: 0,
    })
}
