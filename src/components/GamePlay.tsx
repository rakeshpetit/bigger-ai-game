import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface GameState {
  currentItem: string | null;
  score: number;
  gameStatus: "playing" | "gameOver";
  message: string;
  description: string | null;
}

const initialState: GameState = {
  currentItem: "Kingfisher",
  score: 0,
  gameStatus: "playing",
  message: "Enter something bigger than a Kingfisher!",
  description: null,
};

export function GamePlay() {
  const [state, setState] = useState<GameState>(initialState);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://n8n.rakesh-arun.click/webhook/e2661e39-d059-445c-8cc9-8775975d2665?x=${encodeURIComponent(
          userInput
        )}&y=${encodeURIComponent(state.currentItem || "")}`
      );

      const data = await response.json();

      if (data.bigger) {
        setState((prev) => ({
          ...prev,
          score: prev.score + 10,
          currentItem: userInput,
          message: "You did it! 🎉",
          description: data.description,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          gameStatus: "gameOver",
          message: `Game Over! Final score: ${prev.score}`,
          description: data.description,
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        message: "An error occurred. Please try again.",
        description: null,
      }));
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Bigger AI Game</h1>
      <div style={{ marginBottom: "20px" }}>
        <strong>Score:</strong> {state.score}
      </div>
      <div style={{ marginBottom: "20px" }}>
        <strong>Current Item:</strong> {state.currentItem}
      </div>
      <div
        style={{
          marginBottom: "20px",
          color: state.message.includes("You did it") ? "green" : "inherit",
        }}
      >
        {state.message}
      </div>
      {state.description && (
        <div
          style={{
            marginBottom: "20px",
            padding: "10px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
            fontSize: "0.9em",
          }}
        >
          {state.description}
        </div>
      )}

      {state.gameStatus === "playing" ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter something bigger..."
            style={{ padding: "5px", flex: 1 }}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              minWidth: "80px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading ? <CircularProgress size={20} /> : "Submit"}
          </button>
        </form>
      ) : (
        <button
          onClick={() => {
            setState(initialState);
          }}
          style={{ marginBottom: "20px" }}
        >
          Play Again
        </button>
      )}
    </div>
  );
}
