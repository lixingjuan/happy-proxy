import React, { useEffect } from "react";

const Demo = ({ count }: { count: number }) => {
  console.log("子组件重新渲染");

  useEffect(() => {
    console.log("子组件useEffect执行");
  }, []);
  return (
    <div>
      <h2>子组件</h2>
      {count}
    </div>
  );
};

export default Demo;
