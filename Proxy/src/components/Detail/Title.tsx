import { Button, message } from 'antd';
import { deleteRecordApi } from 'src/service';
import { HeartIcon } from 'src/components/Icon';

const Title = ({ proxyUrl, onSuccess }: { proxyUrl: string; onSuccess: () => void }) => {
  const handleDelete = () => {
    deleteRecordApi(proxyUrl)
      .then(() => onSuccess?.())
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <Button danger onClick={handleDelete} size="small">
      <HeartIcon />
      删除本地数据
    </Button>
  );
};

export default Title;
