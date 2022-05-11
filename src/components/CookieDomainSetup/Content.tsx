import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

/** 更新本地 */
const updateLocal = (domain: string) => localStorage.setItem("cookieDomain", domain);

/** 通知background 更新 happyCookie */
const updateHappyCookie = (cookieDomain: string) => {
  if (!chrome?.cookies?.getAll) {
    return;
  }

  chrome.cookies.getAll({ domain: cookieDomain }, (res) => {
    const theCookieArr = res.filter((it) => it.domain === cookieDomain);
    if (!Object.keys(theCookieArr).length) {
      return;
    }

    const happyCookie = theCookieArr.map((it) => `${it.name}=${it.value}`).join("; ");
    chrome.runtime.sendMessage(
      {
        action: "Update_Happy_Cookie",
        value: happyCookie,
      },
      (response) => {
        if (response.message === "success") {
          toast.success("happy cookie 更新成功");
        }
      }
    );
  });
};

/** 通知background 更新 happyCookieDomain */
const updateHappyCookieDomain = (domain: string) => {
  if (!chrome?.runtime?.sendMessage) {
    return;
  }

  updateHappyCookie(domain);

  chrome.runtime.sendMessage(
    {
      action: "Update_Happy_Cookie_Domain",
      value: domain,
    },
    (response) => {
      if (response.message === "success") {
        toast.success(response.message);
      }
    }
  );
};

const DynamicFieldSet = () => {
  /** 成功回调函数 */
  const onFinish = (values: { domains: string[] }) => {
    // setCookieDomain(domain);
    console.log("Received values of form:", values.domains);

    const val = values.domains;
    updateLocal(val);
    updateHappyCookieDomain(val);
  };

  return (
    <Form name="dynamic_form_item" onFinish={onFinish} wrapperCol={{ span: 20, offset: 1 }}>
      <Form.List name="domains">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item required={false} key={field.key} style={{ width: "100%" }}>
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input domain",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="passenger name"
                    style={{ width: "calc(100% - 40px)", marginRight: "12px" }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                ) : null}
              </Form.Item>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "60%" }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>

              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "60%" }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicFieldSet;
