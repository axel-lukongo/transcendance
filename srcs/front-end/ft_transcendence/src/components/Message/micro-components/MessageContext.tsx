import React, { createContext, useState } from 'react';

type Message = {
  id: number;
  sender_id: number;
  content: string;
};

type MessageContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };
