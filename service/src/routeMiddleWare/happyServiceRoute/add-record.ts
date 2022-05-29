import { saveResponseToLocal } from "../utils";
import { outputRecord } from "../../utils/build-up-record";

/** add one mock item */
export const addRecord = async (body: any) => {
  const { url, mockBody, method } = body;
  try {
    /** 获得一条记录 */
    const oneRecord = outputRecord({ url, method, body });

    saveResponseToLocal(oneRecord, { data: mockBody });
    return {
      code: 1,
      message: "successfully",
      data: null,
    };
  } catch (error) {
    return {
      code: -1,
      message: "error",
      data: null,
    };
  }
};
