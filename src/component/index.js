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
      };
    }

    componentDidMount() {
      fetch(`https://dev9.stackby.com/api/v1/blockdetails/${blockID}`)
        .then((response) => response.json())
        .then((data) => {
          data.data.blockFields = JSON.parse(data.data.blockFields);
          this.setState({
            blockData: data.data,
            columnSchema: data.data.blockFields.rowCardData.columnSchema
              ? data.data.blockFields.rowCardData.columnSchema
              : null,
            rowData: data.data.blockFields.rowCardData.rowData
              ? data.data.blockFields.rowCardData.rowData
              : null,
            loading: false,
          });
        });
    }
    render() {
      console.log("log from withWidgets");
      if (!this.state.loading) {
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
