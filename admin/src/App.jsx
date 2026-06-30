import React from "react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

function App() {
  return (
    <div>
      <Show when="signed-out">
        <SignInButton mode="modal" />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}

export default App;
