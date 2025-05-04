import React from "react";

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return <main>{children}</main>;
};

export default HomeLayout;
