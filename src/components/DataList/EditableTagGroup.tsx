import React, { useState, useRef } from "react";
import { Tag, Input, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addTagsApi, deleteTagsApi } from "../../service";

const colors = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple  ",
];

const EditableTagGroup = ({
  defaultTags = [],
  hash = "",
}: {
  defaultTags: string[];
  hash: string;
}) => {
  const SaveInputRef = useRef<any>(null);

  const [tags, setTags] = useState(defaultTags);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  /** 删除tag */
  const handleClose = (removedTag: string) => {
    setTags((pre) => pre.filter((it) => it !== removedTag));

    deleteTagsApi({
      hash,
      tag: removedTag,
    }).then((res) => {
      setTags((pre) => pre.filter((it) => it !== removedTag));
    });
  };

  /** 增加tag */
  const handleInputConfirm = async () => {
    addTagsApi({
      hash,
      tag: inputValue,
    });

    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const showInput = () => {
    setInputVisible(true);
    SaveInputRef?.current?.focus?.();
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const tagChild = tags.map((tag: string, index: number) => {
    return (
      <Tag
        closable
        color={colors[index]}
        style={{ marginRight: 0 }}
        key={tag}
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
  });

  return (
    <>
      <Space size="small" wrap>
        {tagChild}

        {inputVisible && (
          <Input
            ref={SaveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </Space>
    </>
  );
};

export default EditableTagGroup;
