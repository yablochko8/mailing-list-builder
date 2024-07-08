type Message = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export type EmailClient = {
  send: (msg: Message) => Promise<void>;
};

const EmailGateway = (client: EmailClient) => {
  return {
    send: (msg: Message) => {
      return client.send(msg);
    },
  };
};

export default EmailGateway;
