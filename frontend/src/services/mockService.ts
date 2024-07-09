import { API_PATHS } from "./util/config";

const mockService = {
  getAll: (table: keyof typeof API_PATHS) => {
    console.log("getAll called with table:", table);
    return Promise.resolve({ items: [] });
  },
  getOne: (table: keyof typeof API_PATHS, id: string) => {
    console.log("getOne called with table:", table, "id:", id);
    return Promise.resolve({});
  },
  search: (table: keyof typeof API_PATHS, query: string) => {
    console.log("search called with table:", table, "query:", query);
    return Promise.resolve({ items: [] });
  },
  delete: (table: keyof typeof API_PATHS, id: string) => {
    console.log("delete called with table:", table, "id:", id);
    return Promise.resolve({});
  },
  new: (table: keyof typeof API_PATHS, data: any) => {
    console.log("new called with table:", table, "data:", data);
    return Promise.resolve({ ...data, id: "mock-id" });
  },
  update: (table: keyof typeof API_PATHS, id: string, data: any) => {
    console.log("update called with table:", table, "id:", id, "data:", data);
    return Promise.resolve({ ...data, id });
  },
};

export default mockService;
