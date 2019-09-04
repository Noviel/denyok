import React from "react";

interface MainProps {
  greeter: string;
}

export const Main: React.FC<MainProps> = ({ greeter }) => {
  return <div>Hello, {greeter}!</div>;
};
