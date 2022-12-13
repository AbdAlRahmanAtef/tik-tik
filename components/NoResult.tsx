import { NextPage } from "next";
import React from "react";

interface IProps {
  text: string;
  icon: any;
}

const NoResult: NextPage<IProps> = ({ text, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <p className="text-8xl">{icon}</p>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};

export default NoResult;
