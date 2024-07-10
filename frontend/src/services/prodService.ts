import { ApiService, ApiServiceFactory, DataType } from "shared";
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
const prodServiceFactory: ApiServiceFactory = (
  table: DataType,
  token?: string
): ApiService => {
  const options =
    token && token !== ""
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

  return {
    getAll: () => {
      return makeRequest(API_PATHS[table].getAll, options);
    },
    getOne: (id: number) => {
      return makeRequest(API_PATHS[table].getOne(id), options);
    },
    search: (query: string) => {
      return makeRequest(API_PATHS[table].search(query), options);
    },
    deleteItem: (id: number) => {
      return makeRequest(API_PATHS[table].delete(id), {
        ...options,
        method: "DELETE",
      });
    },
    newItem: (data: any) => {
      return makeRequest(API_PATHS[table].new, {
        ...options,
        method: "POST",
        body: data,
      });
    },
    updateItem: (id: number, data: any) => {
      return makeRequest(API_PATHS[table].update(id), {
        ...options,
        method: "PUT",
        body: data,
      });
    },
  };
};

export default prodServiceFactory;
