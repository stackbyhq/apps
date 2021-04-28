import React from "react";
import ParentContainer from "./component";
// import ParentContainer from "../";

const App = ({ blockData, tables }) => {
  console.log(blockData, "blockData");
  console.log(tables[0].views.Grid, "tables");

  return <div className="App">{blockData.type + "block"}</div>;
};

export default ParentContainer(App, "blk0hFSH9tPcltVxu3");
