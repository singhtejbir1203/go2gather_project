import MessageBubble from "./MessageBubble";

const dummyMessages = [
  { id: 1, sender: "driver", text: "Hi! Pickup is at Gate 2" },
  { id: 2, sender: "me", text: "Okay, thanks!" },
];

function MessageList() {
  return (
    <div className="space-y-3">
      {dummyMessages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
    </div>
  );
}

export default MessageList;
