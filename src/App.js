import React from "react";
import ParentContainer from "./component";

const App = ({ blockData }) => {
  console.log(blockData, "blockData");
  return <div className="App">{blockData.type + "block"}</div>;
};

export default ParentContainer(App, "blk0hFSH9tPcltVxu2");
