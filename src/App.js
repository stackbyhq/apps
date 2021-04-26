import React from "react";
import ParentContainer from "./component";

const App = ({ text, columnSchema }) => {
  console.log(columnSchema, "columnSchema");
  return <div className="App">{text}</div>;
};

export default ParentContainer(App, "blk0hFSH9tPcltVxu3");
