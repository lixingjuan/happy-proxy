import { Form, Input, Button, Space, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useEffect } from "react";
// import CookieDomainSetup from "../CookieDomainSetup";

const happyService = "http://localhost:4000";

const StyledForm = styled(Form)`
  padding: 10px;
  height: calc(100vh - 100px);
  position: relative;
  .field-item {
    display: grid;
    grid-gap: 10px;
    width: 100%;
    margin: 4px 0px;
    align-items: baseline;
    grid-template-columns: repeat(2, 1fr) 70px 80px 40px;
  }

  .form-buttons {
    right: 0px;
  }
`;

const initialValueItem = {
  original: "",
  target: "",
  open: true,
};

const getDefault = () => {
  try {
    const local = localStorage.getItem("proxyConfig");
    const parseLocal = local ? JSON.parse(local) : "";
    return local && Array.isArray(parseLocal) && parseLocal.length > 0
      ? parseLocal
      : [initialValueItem];
  } catch (error) {
    return [initialValueItem];
  }
};

/** 更新本地 */
const updateLocal = (val: string) => localStorage.setItem("proxyConfig", JSON.stringify(val));

type ValueItem = {
  original: string;
  target: string;
  open: boolean;
};

/** 更新background */
const updateBackground = (proxyList: ValueItem[]) => {
  if (!chrome?.runtime || !chrome.runtime.sendMessage) {
    return;
  }

  // 过滤当前为真的
  const formattedValues = proxyList.reduce((tol, cur) => {
    if (cur.open) {
      tol.push([cur.original, cur.target]);
    }
    return tol;
  }, [] as [string, string][]);

  chrome.runtime.sendMessage(
    {
      action: "Update_Proxy_Config",
      value: formattedValues,
    },
    (response) => {
      if (response.message === "success") {
        toast.success("proxy urls 更新成功");
      } else {
        toast.error(response.message);
      }
    }
  );
};

const ProxyList = () => {
  const [form] = Form.useForm();
  const proxyList = Form.useWatch("proxyList", form);

  const onFinish = () => {
    updateLocal(proxyList);
    updateBackground(proxyList);
    console.log("更新 proxyList", proxyList);
  };

  const disableAll = () => {
    form.setFieldsValue({
      proxyList: proxyList.map((it: ValueItem) => ({ ...it, open: false })),
    });
  };

  const fillTarget = (key: number) => {
    const newProxyList = proxyList.map((it: ValueItem, index: number) => {
      if (index === key && it.original) {
        const theOrigin = new URL(it.original).origin;
        const theTarget = it.original.replace(theOrigin, happyService);
        return {
          ...it,
          target: theTarget,
        };
      }
      return it;
    });
    form.setFieldsValue({
      proxyList: newProxyList,
    });
  };

  useEffect(() => {
    form.validateFields().then(() => onFinish());
  }, [proxyList]);

  return (
    <div>
      {/* <CookieDomainSetup /> */}
      <StyledForm form={form} autoComplete="off" initialValues={{ proxyList: getDefault() }}>
        <Form.List name="proxyList">
          {(fields, { add, remove }) => (
            <>
              <Form.Item className="form-buttons">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    gap: "16px",
                  }}
                >
                  <Button
                    style={{ width: "120px" }}
                    type="dashed"
                    onClick={() => add({ ...initialValueItem }, 0)}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                  <Button type="primary" onClick={() => disableAll()}>
                    Disable All
                  </Button>
                </div>
              </Form.Item>

              {fields.map(({ key, name, ...restField }) => (
                <div className="field-item" key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "original"]}
                    rules={[{ required: true, message: "Missing original" }]}
                  >
                    <Input placeholder="被转发url" />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "target"]}
                    rules={[{ required: true, message: "Missing target" }]}
                  >
                    <Input placeholder="目标url" />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, "open"]} valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>

                  <Button type="primary" onClick={() => fillTarget(key)}>
                    填充目标
                  </Button>
                  {fields.length > 1 ? <MinusCircleOutlined onClick={() => remove(name)} /> : null}
                </div>
              ))}
            </>
          )}
        </Form.List>
      </StyledForm>
    </div>
  );
};

export default ProxyList;
