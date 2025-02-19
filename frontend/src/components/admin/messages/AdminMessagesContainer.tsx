// AdminMessagesContainer.tsx
import React from "react";
import { useMessages } from "../../../hooks/messages/useMessages";
import { useUpdateMessageById } from "../../../hooks/messages/useUpdateMessageById";
import AdminMessages from "./AdminMessages";
import { IMessage } from "../../../types/message";

const AdminMessagesContainer: React.FC = () => {
  const { data, error, isLoading } = useMessages();
  const { mutate: updateMessageById } = useUpdateMessageById();

  const updateMessageWrapper = (message: IMessage) => {
    updateMessageById({ message });
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <AdminMessages
    messages={data ?? []}
    updateMessage={updateMessageWrapper}
    />
  );
};

export default AdminMessagesContainer;
