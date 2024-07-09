const SERVER_PORT = 4101;

const CONFIG = {
  BASE_URL: `http://localhost:${SERVER_PORT}/api`,
};

export const API_PATHS = {
  sender: {
    getAll: "/sender/all",
    getOne: (id: string) => `/sender/${id}`,
    search: (query: string) => `/sender/search/${query}`,
    delete: (id: string) => `/sender/${id}`,
    new: "/sender/new",
    update: (id: string) => `/sender/${id}`,
  },
  recipient: {
    getAll: "/recipient/all",
    getOne: (id: string) => `/recipient/${id}`,
    search: (query: string) => `/recipient/search/${query}`,
    delete: (id: string) => `/recipient/${id}`,
    new: "/recipient/new",
    update: (id: string) => `/recipient/${id}`,
  },
  list: {
    getAll: "/list/all",
    getOne: (id: string) => `/list/${id}`,
    search: (query: string) => `/list/search/${query}`,
    delete: (id: string) => `/list/${id}`,
    new: "/list/new",
    update: (id: string) => `/list/${id}`,
  },
  blast: {
    getAll: "/blast/all",
    getOne: (id: string) => `/blast/${id}`,
    search: (query: string) => `/blast/search/${query}`,
    delete: (id: string) => `/blast/${id}`,
    new: "/blast/new",
    update: (id: string) => `/blast/${id}`,
  },
  message: {
    getAll: "/message/all",
    getOne: (id: string) => `/message/${id}`,
    search: (query: string) => `/message/search/${query}`,
    delete: (id: string) => `/message/${id}`,
    new: "/message/new",
    update: (id: string) => `/message/${id}`,
  },
};

export default CONFIG;
