import { ApiService, ApiServiceFactory, DBTable } from "shared";

const mockServiceFactory: ApiServiceFactory = (table: DBTable): ApiService => ({
  getAll: () => {
    console.log("getAll called with table:", table);
    return Promise.resolve({ items: [] });
  },
  getOne: (id: number) => {
    console.log("getOne called with table:", table, "id:", id);
    return Promise.resolve({});
  },
  search: (query: string) => {
    console.log("search called with table:", table, "query:", query);
    return Promise.resolve({ items: [] });
  },
  deleteItem: (id: number) => {
    console.log("delete called with table:", table, "id:", id);
    return Promise.resolve({});
  },
  newItem: (data: any) => {
    console.log("new called with table:", table, "data:", data);
    return Promise.resolve({ ...data, id: 1 }); // Using a number for the mock id
  },
  updateItem: (id: number, data: any) => {
    console.log("update called with table:", table, "id:", id, "data:", data);
    return Promise.resolve({ ...data, id });
  },
});

export default mockServiceFactory;
