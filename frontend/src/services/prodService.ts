import { API_PATHS } from "./util/config";
import makeRequest from "./util/makeRequest";

/**
 * We have six functions:
 * getAll
 * getOne
 * search
 * delete
 * new
 * update
 *
 * And five tables:
 * sender
 * recipient
 * list
 * blast
 * message
 *
 * This Service takes in a function label (string) and table name (string)
 * and returns the needed function.
 *
 * The paths for these functions can be found in API_PATHS
 */

const prodService = {
  getAll: (table: keyof typeof API_PATHS) => {
    return makeRequest(API_PATHS[table].getAll);
  },
  getOne: (table: keyof typeof API_PATHS, id: number) => {
    return makeRequest(API_PATHS[table].getOne(id));
  },
  search: (table: keyof typeof API_PATHS, query: string) => {
    return makeRequest(API_PATHS[table].search(query));
  },
  delete: (table: keyof typeof API_PATHS, id: number) => {
    return makeRequest(API_PATHS[table].delete(id), { method: "DELETE" });
  },
  new: (table: keyof typeof API_PATHS, data: any) => {
    return makeRequest(API_PATHS[table].new, { method: "POST", body: data });
  },
  update: (table: keyof typeof API_PATHS, id: number, data: any) => {
    return makeRequest(API_PATHS[table].update(id), {
      method: "PUT",
      body: data,
    });
  },
};

export default prodService;
