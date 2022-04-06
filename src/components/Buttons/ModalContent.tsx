import { Input, Space, Form, Button, Divider } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 8 },
  },
};

interface Props {
  value: string;
  onSuccess: (val: string) => void;
  onCancel: () => void;
}
const SettingModal = ({ value, onSuccess, onCancel }: Props) => {
  const [form] = Form.useForm();

  const onFinish = () => {
    const domain = form.getFieldValue("domain");
    onSuccess(domain);
  };

  return (
    <>
      <Form
        form={form}
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        initialValues={{
          domain: value,
        }}
      >
        {/* <Form.Item label="编辑器font-size" {...formItemLayout}>
          <Radio.Group value={12}>
            <Radio value={12}>12</Radio>
            <Radio value={14}>14</Radio>
            <Radio value={16}>16</Radio>
            <Radio value={18}>18</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="开启的功能" {...formItemLayout}>
          <Checkbox.Group value={["编辑器", "Morning", "Todo-List"]}>
            <Checkbox value={"编辑器"}>编辑器</Checkbox>
            <Checkbox value={"Morning"}>Morning</Checkbox>
            <Checkbox value={"Todo-List"}>Todo-List</Checkbox>
            <Checkbox value={"国际化"}>国际化</Checkbox>
          </Checkbox.Group>
        </Form.Item> */}

        <Form.Item label="http-only domain" {...formItemLayout} name="domain">
          <Input size="small" value={value} placeholder="请输入http-only的cookie Domain" />
        </Form.Item>

        {/* <Form.List name="domains">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                return (
                  <Form.Item
                    label={index === 0 ? "http-only的domain" : ""}
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      noStyle
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                    >
                      <Input
                        placeholder={`eg.   ${defaultDomain}`}
                        style={{
                          width: "calc(100% - 32px)",
                          marginRight: "8px",
                        }}
                      />
                    </Form.Item>

                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                );
              })}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: "calc(100% - 32px)" }}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>*/}
      </Form>

      <Divider type="horizontal" />

      <Space
        style={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="primary" onClick={onFinish}>
          Submit
        </Button>
      </Space>
    </>
  );
};

export default SettingModal;
