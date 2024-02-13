"use client";

import { Message, useChat } from "ai/react";
import { use, useEffect, useRef, useState } from "react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const [response, setResponse] = useState<Message | null>(null);

  // set response to the last message from the AI
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role !== "user") {
      setResponse(messages[messages.length - 1]);
    }
  }, [messages]);

  const [isVisible, setIsVisible] = useState(true);
  const [word, setWord] = useState("");
  const [isText, setIsText] = useState(false);
  const [width, setWidth] = useState("30px");
  const [phraseArray, setPhraseArray] = useState<string[]>([]);
  const textRef = useRef(null);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 1000); // Blink every 1000ms (1 second)

    return () => {
      clearInterval(blinkInterval); // Clean up interval on component unmount
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    if (response) {
      setPhraseArray(response.content.split(" "));
    }
  }, [response]);

  useEffect(() => {
    let timeStart = 0;
    if (!phraseArray) return;
    setIsText(true);

    phraseArray.forEach((word, i) => {
      let wordTime = 750;
      if (word.length > 8) wordTime *= word.length / 8;
      setTimeout(() => {
        setWord(word);
        setWidth(`${word.length * 20 + 18}px`);
      }, timeStart + 150);
      timeStart += wordTime;
    });

    setTimeout(() => {
      setWord(" ");
      setIsText(false);
      setWidth("30px");
    }, timeStart + 750);
  }, [phraseArray]);

  return (
    <div id="interface">
      <div id="main" className="absolute block w-full bottom-1/2">
        <p ref={textRef} className="my-0">
          {word}
        </p>
        <hr
          style={{ width }}
          className=" border-t-2 border-white border-solid mx-auto my-0"
        />
      </div>
      <div id="marker" className="absolute block w-full top-1/2 align-top">
        <span
          id="triangle"
          className="text-red-500 text-3xl transition-opacity duration-500 ease-in-out"
          style={{ opacity: isText ? 0 : isVisible ? 1 : 0 }}
        >
          ▲
        </span>
      </div>

      <div className="message-box block text-left my-0 mx-auto w-[500px] transition duration-500 absolute top-[85%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-black bg-white border-2 border-black px-2 py-1 rounded-tl-md rounded-tr-md">
          TOTAL ACCESS ACHIEVED
        </div>
        <form onSubmit={handleSubmit}>
          <input
            className="text-white bg-black border-t-2 border-b-2 border-white px-2 py-1 min-h-11 w-full"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          ></input>
        </form>
        <div className="h-4 bg-black bg-opacity-10 rounded-bl-md rounded-br-md"></div>
      </div>
    </div>
  );
}
