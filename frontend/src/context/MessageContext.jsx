import { createContext, useContext, useState } from "react";

const MessageContext = createContext(undefined);

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [artifacts, setArtifacts] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        addMessage,
        isLoading,
        setIsLoading,
        artifacts,
        setArtifacts,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);

  if (!context) console.error("Conversation context not provided!");

  return context;
};
