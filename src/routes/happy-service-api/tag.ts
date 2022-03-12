import { queryPathMap, updateLocalPathMap } from "../../utils/fs-utils";

/** add Tag  */
const addTag = async ({ hash, tag }: { hash: string; tag: string }) => {
  if (!hash) {
    return {
      code: -1,
      message: "hash值不能为空",
    };
  }
  try {
    const localMap = await queryPathMap();
    const info = localMap[hash];
    if (info) {
      Object.assign(info, {
        tags: [...(info?.tags || []), tag],
      });
      updateLocalPathMap(localMap);
    }
    return {
      code: 1,
      message: `tag ${tag} 增加成功`,
    };
  } catch (error) {
    return {
      code: 1,
      message: "hash值不能为空",
    };
  }
};

/** add Tag  */
const deleteTag = async ({ hash, tag }: { hash: string; tag: string }) => {
  if (!hash) {
    return {
      code: -1,
      message: "hash值不能为空",
    };
  }

  try {
    const localMap = await queryPathMap();
    const info = localMap[hash];
    if (!info) {
      return {
        code: -1,
        message: "本地无该数据",
      };
    }
    const newTags = (info?.tags || []).filter((it: string) => it !== tag);
    Object.assign(info, {
      tags: newTags,
    });
    updateLocalPathMap(localMap);
    return {
      code: 1,
      message: `tag ${tag} 删除成功`,
      data: newTags,
    };
  } catch (error) {
    return {
      code: 1,
      message: "hash值不能为空",
    };
  }
};

export { addTag, deleteTag };
