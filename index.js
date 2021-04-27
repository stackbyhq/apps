function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
        loadDescriptionBlock: true
      };
    }

    componentDidMount() {
      // dashboardtables / blk0hFSH9tPcltVxu3;
      fetch(`https://dev9.stackby.com/api/v1/blockdetails/${blockID}`).then(response => response.json()).then(data => {
        data.data.blockFields = JSON.parse(data.data.blockFields);

        if (data.data.type === "description") {
          this.setState({
            blockData: data.data,
            loadDescriptionBlock: false
          });
        } else {// this.setState({
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
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, this.props, {
          blockData: this.state.blockData
        })));
      } else if (!this.state.loading) {
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(WrappedComponent, _extends({}, this.props, {
          text: "text hai re",
          columnSchema: this.state.columnSchema
        })), "hii");
      } else {
        return /*#__PURE__*/React.createElement("div", null, "loading");
      }
    }

  }

  return WithWidgets;
};

export default withWidgets;
