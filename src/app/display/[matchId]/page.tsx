import { use } from "react";
import { Display } from "@/components/scoreboard/Display";

export default function DisplayPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = use(params);
  return <Display matchId={matchId} />;
}
