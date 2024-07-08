import { EmailClient, ParsedMessage } from "../gateway";

type MockConfig = { writeToConsole: boolean };
type MockClientPattern = (config?: MockConfig) => EmailClient;

const defaultOptions: MockConfig = {
  writeToConsole: true,
};

let client: EmailClient;

const MockClient: MockClientPattern = (config: MockConfig = defaultOptions) => {
  // Here we persist the entire client in memory. This may be useful for things like
  // connection reuse, caching etc. If the client is still set from last use, we
  // return it.
  if (client) {
    return client;
  }

  client = {
    send: async (msg: ParsedMessage) => {
      console.log("Mock sendMail called with message:", msg);
      return;
    },
  };

  // Logic goes here

  return client;
};

export default MockClient;
