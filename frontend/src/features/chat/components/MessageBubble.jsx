function MessageBubble({ message }) {
  const isMe = message.sender === "me";

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
          isMe ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

export default MessageBubble;
