import { createFileRoute } from "@tanstack/react-router";
import { GamePlay } from "../components/GamePlay";

export const Route = createFileRoute("/game")({
  component: GamePlay,
});
