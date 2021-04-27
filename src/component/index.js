import React from "react";
import axios from "axios";

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
                  // now we will get every viewId of particular table
                  axios
                    .get(
                      `https://dev9.stackby.com/api/v1/dashboardviews/${blockID}/${table.id}` // Api for getting views for a particular table
                    )
                    .then((respo) => {
                      let viewsArr = [...respo.data.data];
                      let views = {};

                      viewsArr.forEach((view) => {
                        axios
                          .get(
                            `https://dev9.stackby.com/api/v1/tabledata/${blockID}/${table.id}/${view.id}`
                          )
                          .then((respo) => {
                            views[view.name] = respo.data.data;
                          })
                          .catch((err) => {
                            console.log(err, "error in fetching tableData");
                          });
                      });

                      let newTables = [...this.state.tables];
                      newTables.push({
                        tableName: table.name,
                        tableId: table.id,
                        views,
                      });
                      this.setState({
                        tables: newTables,
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
      console.log("inside comDidUpdate");
      if (!this.state.loadingChanged) {
        if (this.state.tables.length == this.state.tablesLength) {
          this.setState({ loading: false, loadingChanged: true });
        }
      }
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
              tables={this.state.tables}
              blockData={this.state.blockData}
            />
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