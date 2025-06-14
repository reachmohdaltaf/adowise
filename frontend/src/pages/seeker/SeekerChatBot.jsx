import React from "react";
import { useLocation } from "react-router-dom";

const SeekerChatBot = () => {
  const location = useLocation();
  const userInput = location.state?.userInput || "";

  return (
    <div>
      <h1>Chatbot Page</h1>
      <p>User input: {userInput}</p>
      {/* Your chatbot component or logic */}
    </div>
  );
};

export default SeekerChatBot;
