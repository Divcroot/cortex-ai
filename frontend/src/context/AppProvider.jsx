import { ConversationProvider } from "./ConversationContext";
import { MessageProvider } from "./MessageContext";
import { UserProvider } from "./UserContext";

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <ConversationProvider>
        <MessageProvider>{children}</MessageProvider>
      </ConversationProvider>
    </UserProvider>
  );
};

export default AppProvider;
