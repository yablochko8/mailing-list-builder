import CONFIG from "./config";
import { useAuth } from "@clerk/clerk-react";

type CustomOptions = {};

type Options = RequestInit & CustomOptions;

const makeRequest = async (path: string, options?: Options) => {
  const { getToken } = useAuth();
  const token = await getToken();

  console.log("token is", token);

  const response = await fetch(CONFIG.BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  const json = await response.json();
  console.log("The server response was:", json);
  return json;
};

export default makeRequest;
