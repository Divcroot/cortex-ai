import { createContext, useContext, useState } from "react";

const ConversationContext = createContext(undefined);

export const ConversationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const addConversation = (conversation) => {
    setConversations((prev) => [conversation, ...prev]);
  };

  const setConvTitle = ({ conversationId, title }) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv._id === conversationId ? { ...conv, title } : conv,
      ),
    );

    setSelectedConversation((prev) =>
      prev?._id === conversationId ? { ...prev, title } : prev,
    );
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        setConversations,
        selectedConversation,
        setSelectedConversation,
        addConversation,
        setConvTitle,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);

  if (!context) console.error("Conversation context not provided!");

  return context;
};
