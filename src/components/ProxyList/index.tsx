import { Form, Input, Button, Space, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useMemo, useEffect } from "react";
import { happyService } from "src/constants";
import CookieDomainSetup from "../CookieDomainSetup";

const isUrl = (val: string) =>
  /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(
    val
  );

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
    position: sticky;
    right: 0px;
    top: 22px;
    z-index: 3;
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
  const formattedValues = (proxyList || []).reduce((tol, cur) => {
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
        toast.error(`更新失败${response.message}`);
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

  const isAllOpen = useMemo(
    () => proxyList && proxyList.every((it: ValueItem) => it.open),
    [proxyList]
  );

  const disableAll = () => {
    form.setFieldsValue({
      proxyList: proxyList.map((it: ValueItem) => ({ ...it, open: !isAllOpen })),
    });
  };

  const fillTarget = (key: number) => {
    const newProxyList = proxyList.map((it: ValueItem, index: number) => {
      if (index === key && it.original) {
        const originIsUrl = isUrl(it.original);
        const theOrigin = originIsUrl ? new URL(it.original).origin : "";

        const target =
          originIsUrl && theOrigin
            ? it.original.replace(theOrigin, happyService)
            : `${happyService}/${it.original}`;

        return {
          ...it,
          target,
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
      <StyledForm form={form} autoComplete="off" initialValues={{ proxyList: getDefault() }}>
        <Form.List name="proxyList">
          {(fields, { add, remove }) => (
            <>
              <Form.Item className="form-buttons">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    gap: "16px",
                    alignItems: "center",
                    justifyContent: "right",
                  }}
                >
                  <CookieDomainSetup />
                  <Button
                    style={{ width: "120px" }}
                    type="dashed"
                    onClick={() => add({ ...initialValueItem })}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                  <Switch
                    size="default"
                    checked={isAllOpen}
                    onChange={disableAll}
                    checkedChildren="全部开启"
                    unCheckedChildren="全部关闭"
                  />
                </div>
              </Form.Item>

              {fields.map(({ key, name, ...restField }, index) => (
                <div className="field-item" key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "original"]}
                    rules={[{ required: true, message: "Missing original" }]}
                  >
                    <Input placeholder="被转发url" allowClear />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "target"]}
                    rules={[{ required: true, message: "Missing target" }]}
                  >
                    <Input placeholder="目标url" allowClear />
                  </Form.Item>

                  <Form.Item {...restField} name={[name, "open"]} valuePropName="checked">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>

                  <Button type="primary" onClick={() => fillTarget(index)}>
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
