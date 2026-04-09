import { NextRequest, NextResponse } from "next/server";
import { mockRegistrations } from "../mockData";

/**
 * POST /api/register/validate-partner
 * Body: { partnerId: string; eventId: number }
 *
 * Returns:
 *   200 { eligible: true,  partnerName: string }
 *   200 { eligible: false, reason: string }
 *   400 on bad input
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { partnerId, eventId } = body as { partnerId?: string; eventId?: number };

    if (!partnerId || !eventId) {
      return NextResponse.json({ message: "Missing partnerId or eventId" }, { status: 400 });
    }

    // Find the partner's record in mock data
    const partnerRecord = mockRegistrations.find(u => String(u.userId) === String(partnerId));

    if (!partnerRecord) {
      return NextResponse.json({ eligible: false, reason: "No player found with that profile ID." });
    }

    // Find the specific event
    const partnerEvent = partnerRecord.eligibleEvents.find(e => e.eventId === eventId);

    if (!partnerEvent) {
      return NextResponse.json({ eligible: false, reason: "This player is not eligible for that event." });
    }

    if (partnerEvent.registration.isRegistered) {
      return NextResponse.json({ eligible: false, reason: "This player is already registered for this event with another partner." });
    }

    return NextResponse.json({ eligible: true, partnerName: "Player #" + partnerId });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
