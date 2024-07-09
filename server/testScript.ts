import MockEmailClient from "./gateways/email/clients/mockEmail";
import EmailGateway, {
  EmailClient,
  ParsedMessage,
} from "./gateways/email/gateway";

const sampleParsedMessage: ParsedMessage = {
  to: "hello@example.com",
  from: "sender@example.com",
  subject: "Test Email",
  text: "This is a test email sent using the MockEmailClient.",
  html: "<p>This is a test email sent using the <strong>MockEmailClient</strong>.</p>",
};

const sampleClientList = [MockEmailClient()];

const sendMessage = async (
  message: ParsedMessage,
  clientList: EmailClient[]
): Promise<void> => {
  for (const client of clientList) {
    try {
      await EmailGateway(client).send(sampleParsedMessage);
      return;
    } catch (error) {
      console.error("Error sending email with", client.name, error);
    }
  }
};

sendMessage(sampleParsedMessage, sampleClientList);
