import React from "react";
import axios from "axios";
import "./main.css";

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

const withWidgets = (WrappedComponent, blockID) => {
  class WithWidgets extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: "",
        tables: [],
        tablesLength: null,
        blockData: null,
        columnSchema: null,
        rowData: null,
        loading: true,
        loadDescriptionBlock: true,
        loadingChanged: false,
      };
    }

    componentDidMount() {
      axios
        .get(`https://dev9.stackby.com/api/v1/blockdetails/${blockID}`)
        .then((res) => {
          res.data.data.blockFields = JSON.parse(res.data.data.blockFields);

          if (res.data.data.type === "description") {
            this.setState({
              blockData: res.data.data,
              loadDescriptionBlock: false,
            });
          } else {
            this.setState({
              blockData: res.data.data,
            });
            axios
              .get(`https://dev9.stackby.com/api/v1/dashboardtables/${blockID}`) // Api for getting tables
              .then((resp) => {
                let tables = [...resp.data.data];
                this.setState({
                  tablesLength: tables.length,
                });
                tables.forEach((table) => {
                  axios
                    .get(
                      `https://dev9.stackby.com/api/v1/dashboardviews/${blockID}/${table.id}` // Api for getting views for a particular table
                    )
                    .then((respo) => {
                      let viewsArr = [...respo.data.data];
                      let views = {};
                      viewsArr.forEach((view, index) => {
                        axios
                          .get(
                            `https://dev9.stackby.com/api/v1/tabledata/${blockID}/${table.id}/${view.id}`
                          )
                          .then((response) => {
                            views[view.name] = { ...response.data.data };

                            if (index === viewsArr.length - 1) {
                              let newTables = [...this.state.tables];
                              newTables.push({
                                tableName: table.name,
                                tableId: table.id,
                                views,
                              });
                              this.setState({
                                tables: newTables,
                              });
                            }
                          })
                          .catch((err) => {
                            console.log(err, "error in fetching tableData");
                          });
                      });
                    })
                    .catch((err) => {
                      console.log(err, "error in fetching viewlist");
                    });
                });
              });
          }
        });
    }

    componentDidUpdate() {
      if (!this.state.loadingChanged) {
        if (this.state.tables.length == this.state.tablesLength) {
          this.setState({
            loading: false,
            loadingChanged: true,
          });
        }
      }
    }

    render() {
      if (!this.state.loadDescriptionBlock) {
        return /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            WrappedComponent,
            _extends({}, this.props, {
              blockData: this.state.blockData,
              tables: this.state.tables,
            })
          )
        );
      } else if (!this.state.loading) {
        return /*#__PURE__*/ React.createElement(
          "div",
          null,
          /*#__PURE__*/ React.createElement(
            WrappedComponent,
            _extends({}, this.props, {
              tables: this.state.tables,
              blockData: this.state.blockData,
            })
          )
        );
      } else {
        return /*#__PURE__*/ React.createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            },
          },
          /*#__PURE__*/ React.createElement("div", {
            className: "loader",
          }),
          /*#__PURE__*/ React.createElement(
            "h3",
            null,
            "Hang in there, your data is arriving soon..."
          )
        );
      }
    }
  }

  return WithWidgets;
};

export default withWidgets;
