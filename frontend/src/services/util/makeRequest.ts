import CONFIG from "./config";

type CustomOptions = {};

type Options = RequestInit & CustomOptions;
/**
 * If the options object only contains a token, it will look like this:
 * {
 *   headers: {
 *     Authorization: `Bearer ${token}`
 *   }
 * }
 */
const makeRequest = async (path: string, options?: Options) => {
  const response = await fetch(CONFIG.BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });

  const json = await response.json();
  console.log("The server response was:", json);
  return json;
};

export default makeRequest;
