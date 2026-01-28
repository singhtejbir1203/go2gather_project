import { useState } from "react";
import { Button } from "@/components/ui/button";

function MessageInput() {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    console.log("Send:", text);
    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 border rounded px-3 py-2 text-sm"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
}

export default MessageInput;
