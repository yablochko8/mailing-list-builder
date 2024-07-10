import { DataType, apiServiceFactory } from "shared";

export const checkValidId = async (dataType: DataType, id: number) => {
  const { getOne } = apiServiceFactory(dataType);
  try {
    const response = await getOne(id);
    return response && response.deletedAt === null;
  } catch {
    return false;
  }
};
