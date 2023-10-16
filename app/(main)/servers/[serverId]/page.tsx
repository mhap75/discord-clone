interface ServerByIdProps {
  params: {
    serverId: string;
  };
}

const ServerById: React.FC<ServerByIdProps> = ({ params: { serverId } }) => {
  return <div>{serverId}</div>;
};

export default ServerById;
