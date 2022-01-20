import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

interface Props {}
const Loading: React.FC<Props> = (props) => {
  const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="bg-gray-50 min-h-screen  w-screen flex items-center justify-center ">
      <ScaleLoader color="#4f81cc" css={override} />
    </div>
  );
};

export default Loading;
