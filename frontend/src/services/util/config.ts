const SERVER_PORT = 4101;

const CONFIG = {
  BASE_URL: `http://localhost:${SERVER_PORT}/api`,
};

export const API_PATHS = {
  sender: {
    getAll: "/sender/all",
    getOne: (id: number) => `/sender/${id}`,
    search: (query: string) => `/sender/search/${query}`,
    delete: (id: number) => `/sender/${id}`,
    new: "/sender/new",
    update: (id: number) => `/sender/${id}`,
  },
  recipient: {
    getAll: "/recipient/all",
    getOne: (id: number) => `/recipient/${id}`,
    search: (query: string) => `/recipient/search/${query}`,
    delete: (id: number) => `/recipient/${id}`,
    new: "/recipient/new",
    update: (id: number) => `/recipient/${id}`,
  },
  list: {
    getAll: "/list/all",
    getOne: (id: number) => `/list/${id}`,
    search: (query: string) => `/list/search/${query}`,
    delete: (id: number) => `/list/${id}`,
    new: "/list/new",
    update: (id: number) => `/list/${id}`,
  },
  blast: {
    getAll: "/blast/all",
    getOne: (id: number) => `/blast/${id}`,
    search: (query: string) => `/blast/search/${query}`,
    delete: (id: number) => `/blast/${id}`,
    new: "/blast/new",
    update: (id: number) => `/blast/${id}`,
  },
  message: {
    getAll: "/message/all",
    getOne: (id: number) => `/message/${id}`,
    search: (query: string) => `/message/search/${query}`,
    delete: (id: number) => `/message/${id}`,
    new: "/message/new",
    update: (id: number) => `/message/${id}`,
  },
};

export default CONFIG;
