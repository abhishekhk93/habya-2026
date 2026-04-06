import { use } from "react";
import { Control } from "@/components/scoreboard/Control";

export default function ControlPage({ params }: { params: Promise<{ matchId: string }> }) {
  const { matchId } = use(params);
  return <Control matchId={matchId} />;
}
