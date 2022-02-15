import { Button } from "antd";

const UpdateButton = ({ onUpdate }: any) => {
  return (
    <Button onClick={onUpdate} size="small">
      Update
    </Button>
  );
};

export default UpdateButton;
