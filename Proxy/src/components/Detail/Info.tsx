import { Radio } from 'antd';
import styled from 'styled-components';
import { writeTextToClipboard } from '../../utils/utils';

const StyledRequestInfo = styled.div`
  & > div {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-top: 10px;
    b {
      font-weight: 800;
      white-space: nowrap;
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
      <div>
        <b>Request URL:</b>
        <span onClick={() => writeTextToClipboard(url)}>{url}</span>
      </div>
      <div>
        <b>Request Method:</b>
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
