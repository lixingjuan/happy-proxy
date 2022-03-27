import { useState } from "react";
import { Input, message, Space, Form, Button, Divider } from "antd";

const defaultDomain = ".datayes-stg.com";

// const getDefaultCookieDomains = () => {
//   const local = localStorage.getItem("cookieDomain");
//   return local ? JSON.parse(local) : [defaultDomain];
// };

const getDefaultCookieDomain = () => {
  const local = localStorage.getItem("cookieDomain");
  return local || defaultDomain;
};

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

const SettingModal = ({ onClose }: any) => {
  const [form] = Form.useForm();

  const [cookieDomain, setCookieDomain] = useState<string>(
    getDefaultCookieDomain()
  );

  /**
   * 1. 更新组件值
   * 2. 更新 本地domain值
   * 3. 通知background 更新domain值
   * 4. 通知background 更新cookie值
   */
  const onFinish = () => {
    const domain = form.getFieldValue("domain");
    console.log({ domain });
    setCookieDomain(domain);

    updateLocal(domain);

    updateBackgroundHappyCookieDomain(domain);

    updateBackgroundHappyCookie();

    onClose();
  };

  // 更新本地
  const updateLocal = (domain: string) => {
    localStorage.setItem("cookieDomain", domain);
  };

  /** 通知background 更新happyCookieDomain */
  const updateBackgroundHappyCookieDomain = (domains: string[]) => {
    if (chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage(
        {
          action: "Update_Happy_Cookie_Domains",
          value: domains,
        },
        (response) => {
          if (response.message === "success") {
            message.success(response.message);
          }
        }
      );
    }
  };

  /** 通知background 更新happyCookie */
  const updateBackgroundHappyCookie = () => {
    if (chrome?.cookies?.getAll) {
      chrome.cookies.getAll({ domain: cookieDomain }, (res) => {
        const theCookieArr = res.filter((it) => cookieDomain === it.domain);

        console.log("httpOnlyItems", theCookieArr);

        if (Object.keys(theCookieArr).length) {
          const happyCookie = theCookieArr
            .map((it) => `${it.name}=${it.value}`)
            .join("; ");

          console.log("happyCookie", happyCookie);

          chrome.runtime.sendMessage(
            {
              action: "Update_Happy_Cookie",
              value: happyCookie,
            },
            (response) => {
              if (response.message === "success") {
                console.log("Update_Happy_Cookie 更新成功", happyCookie);
              }
            }
          );
        }
      });
    }
  };

  return (
    <>
      <Form
        form={form}
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        initialValues={{
          domain: cookieDomain,
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
          <Input
            size="small"
            value={cookieDomain}
            placeholder="请输入http-only的cookie Domain"
          />
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
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary" onClick={onFinish}>
          Submit
        </Button>
      </Space>
    </>
  );
};

export default SettingModal;
