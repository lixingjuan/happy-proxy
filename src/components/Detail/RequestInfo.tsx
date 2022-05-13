import styled from "styled-components";
import { writeTextToClipboard } from "../../utils";

const StyledRequestInfo = styled.ul`
  margin-bottom: 0px;
  li {
    span:nth-child(1) {
      width: 60px;
      font-weight: 500;
      display: inline-block;
    }
    span:nth-child(2) {
      color: #999;
      cursor: pointer;
    }
  }
`;

interface Props {
  url: string;
  method: string;
}

const RequestInfo = ({ url, method }: Props) => {
  return (
    <StyledRequestInfo>
      <li>
        <span>Url:</span>
        <span onClick={() => writeTextToClipboard(url)}>{url}</span>
      </li>
      <li>
        <span>method:</span>
        <span>{method}</span>
      </li>
    </StyledRequestInfo>
  );
};

export default RequestInfo;
