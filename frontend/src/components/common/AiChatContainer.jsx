import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUp, Mic, Plus } from "lucide-react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const AiChatContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      // Redirect to /chatbot and pass inputValue as state
      navigate("/chatbot", { state: { userInput: inputValue } });
    }
  };

  return (
    <Card className="py-3 mt-3 max-w-screen-md h-26 mx-auto backdrop-blur-md bg-white/30 rounded-3xl shadow-md">
      <CardHeader className={"flex px-4"}>
        <Input
          placeholder="Type something..."
          className={"border-none shadow-none"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <Button variant={""} className={"expert px-3"} onClick={handleSend}>
          <ArrowUp />
        </Button>
      </CardHeader>
      <CardFooter className={"justify-between"}>
        <Plus className="text-destructive" />
        <Mic className="text-destructive" />
      </CardFooter>
    </Card>
  );
};

export default AiChatContainer;
