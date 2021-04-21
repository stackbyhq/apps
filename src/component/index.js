import React from "react";

const withWidgets = (WrappedComponent, blockID) => {
  class WithWidgets extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return WithWidgets;
};

export default withWidgets;
