import CONFIG from "./config";

/**
 * COPY PASTA FROM JAKE CODE
 */

type CustomOptions = {};

type Options = RequestInit & CustomOptions;

// @TODO replace me with real auth
const getToken = () => "WHAT UP";

const makeRequest = async (path: string, options?: Options) => {
  const token = getToken();

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
