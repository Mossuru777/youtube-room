import React, { useState } from "react";
import RoomPage from "./components/RoomPage";
import WelcomePage from "./components/WelcomePage";

export default function App() {
  const [keycode, setKeycode] = useState<string | null>(null);
  let error: string | null = null;
  if (keycode === null) {
    return <WelcomePage setKeycode={setKeycode} error={error} />;
  } else {
    return (
      <RoomPage
        keycode={keycode}
        clearKeycode={(): void => setKeycode(null)}
        setError={(err: string): void => {
          error = err;
        }}
      />
    );
  }
}
