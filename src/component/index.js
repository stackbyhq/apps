import React from "react";

const withWidgets = (WrappedComponent, blockID) => {
  class WithWidgets extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: "",
        tableData: null,
        blockData: null,
        columnSchema: null,
        rowData: null,
        loading: true,
        loadDescriptionBlock: true,
      };
    }

    componentDidMount() {
      // dashboardtables / blk0hFSH9tPcltVxu3;
      fetch(`https://dev9.stackby.com/api/v1/blockdetails/${blockID}`)
        .then((response) => response.json())
        .then((data) => {
          data.data.blockFields = JSON.parse(data.data.blockFields);
          if (data.data.type === "description") {
            this.setState({
              blockData: data.data,
              loadDescriptionBlock: false,
            });
          } else {
            // this.setState({
            //   blockData: data.data,
            // });
            // fetch(`https://dev9.stackby.com/api/v1/dashboardtables/${blockID}`)
            // .then((response) => response.json())
            // .then((data) => {
            // });
          }
        });
    }
    render() {
      if (!this.state.loadDescriptionBlock) {
        return (
          <div>
            <WrappedComponent
              {...this.props}
              blockData={this.state.blockData}
            />
          </div>
        );
      } else if (!this.state.loading) {
        return (
          <div>
            <WrappedComponent
              {...this.props}
              text="text hai re"
              columnSchema={this.state.columnSchema}
            />
            {"hii"}
          </div>
        );
      } else {
        return <div>loading</div>;
      }
    }
  }

  return WithWidgets;
};

export default withWidgets;
