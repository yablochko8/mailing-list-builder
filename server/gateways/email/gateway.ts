export type ParsedMessage = {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
};

export type EmailClient = {
  send: (msg: ParsedMessage) => Promise<void>;
};

const EmailGateway = (client: EmailClient) => {
  return {
    send: (msg: ParsedMessage) => {
      return client.send(msg);
    },
  };
};

export default EmailGateway;
