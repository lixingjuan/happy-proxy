import { Button, Radio } from 'antd';
import styled from 'styled-components';
import { writeTextToClipboard } from '../../utils/utils';

const StyledRequestInfo = styled.div`
  & > div {
    display: flex;
    align-items: flex-start;
    column-gap: 10px;
    .url {
      flex: 1;
      word-break: break-all;
    }
    b {
      font-weight: 800;
      white-space: nowrap;
      width: 70px;
      text-align: right;
    }
  }
`;

const RequestInfo = ({
  url,
  method,
  onMethodChange
}: {
  url: string;
  onMethodChange: (val: string) => void;
  method?: string;
}) => {
  const value = method?.toLocaleLowerCase();

  return (
    <StyledRequestInfo>
      <div className="mb-5">
        <b>URL:</b>
        <span className="url">{url}</span>
        <Button size="small" onClick={() => writeTextToClipboard(url)}>
          copy
        </Button>
      </div>
      <div>
        <b>Method:</b>
        <Radio.Group onChange={(e) => onMethodChange(e.target.value)} value={value}>
          <Radio value="get">get</Radio>
          <Radio value="post">post</Radio>
          <Radio value="put">put</Radio>
          <Radio value="delete">delete</Radio>
        </Radio.Group>
      </div>
    </StyledRequestInfo>
  );
};

export default RequestInfo;
