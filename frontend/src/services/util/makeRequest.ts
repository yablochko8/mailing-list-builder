import CONFIG from "./config";

/**
 * COPY PASTA FROM JAKE CODE
 */

type CustomOptions = {};

type Options = RequestInit & CustomOptions;

// @TODO replace me with real auth
const getToken = () => "WHAT UP";

const makeRequest = (path: string, options?: Options) => {
  const token = getToken();

  return fetch(CONFIG.BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  });
};

export default makeRequest;
