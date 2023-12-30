const ConversationById = ({
                       params: { convId },
                     }: {
  params: { convId: string };
}) => {
  return <div>{convId}</div>;
};

export default ConversationById;