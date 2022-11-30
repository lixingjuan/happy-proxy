import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

const ErrorStatus = ({ error }: any) => {
  if (error) {
    return (
      <span>
        <FrownOutlined style={{ fontSize: '24px', color: 'red' }} />
        <span style={{ fontSize: '14px', color: 'red', paddingLeft: '10px' }}>{error}</span>
      </span>
    );
  }
  return (
    <span>
      <SmileOutlined style={{ fontSize: '24px', color: 'green' }} />
      <span style={{ fontSize: '14px', color: 'green', paddingLeft: '10px' }}>
        Parse Successfully!
      </span>
    </span>
  );
};

export default ErrorStatus;
