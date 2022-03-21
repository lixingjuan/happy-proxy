import { Card, Anchor } from "antd";
import { RightOutlined } from "@ant-design/icons";

import styled from "styled-components";

const { Link } = Anchor;

const Wrapper = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 100px auto;
  .menu {
    color: #333;
    .ant-anchor-link-active {
      background-color: #e0ebf7;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
      border-top-left-radius: 20px;
      font-weight: 600;
      text-align: center;
      a {
        color: #333;
      }
    }
  }

  #container {
    overflow: auto;
    height: 80vh;

    .card {
      width: calc(100% - 20px);
      margin: 0px auto 25px auto;
      .ant-card-body {
        .card-content-list {
          height: 50vh;
          overflow: auto;
        }
      }
    }
  }
`;

const arr = ["Github", "LeetCode", "社会新闻", "掘金"];

const Demo = () => {
  return (
    <Wrapper style={{ marginTop: "10px", display: "grid" }}>
      <Anchor
        className="menu"
        getContainer={() =>
          document.getElementById("container") || document.body
        }
      >
        {arr.map((it) => (
          <Link title={it} href={`#${it}`} />
        ))}
      </Anchor>

      <div id="container">
        {arr.map((it) => (
          <>
            <h3 id={it}>{it}</h3>
            <Card
              title={it}
              className="card"
              extra={
                <a href="https://github.com/explore">
                  Go <RightOutlined />
                </a>
              }
            >
              <div className="card-content-list">
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表</p>
                <p>Card 探索内容列表222</p>
              </div>
            </Card>
          </>
        ))}
      </div>
    </Wrapper>
  );
};

export default Demo;
