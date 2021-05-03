/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import React from 'react'
import axios from 'axios'
import styles from './styles.module.css'

const withWidgets = (WrappedComponent, blockID) => {
  class WithWidgets extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        text: '',
        tables: [],
        tablesLength: null,
        blockData: null,
        columnSchema: null,
        rowData: null,
        loading: true,
        loadDescriptionBlock: true,
        loadingChanged: false
      }
    }

    componentDidMount() {
      axios
        .get(`https://dev9.stackby.com/api/v1/blockdetails/${blockID}`)
        .then((res) => {
          res.data.data.blockFields = JSON.parse(res.data.data.blockFields)
          if (res.data.data.type === 'description') {
            this.setState({
              blockData: res.data.data,
              loadDescriptionBlock: false
            })
          } else {
            this.setState({
              blockData: res.data.data
            })
            axios
              .get(`https://dev9.stackby.com/api/v1/dashboardtables/${blockID}`) // Api for getting tables
              .then((resp) => {
                let tables = [...resp.data.data]
                this.setState({
                  tablesLength: tables.length
                })
                tables.forEach((table) => {
                  axios
                    .get(
                      `https://dev9.stackby.com/api/v1/dashboardviews/${blockID}/${table.id}` // Api for getting views for a particular table
                    )
                    .then((respo) => {
                      let viewsArr = [...respo.data.data]
                      let views = {}
                      viewsArr.forEach((view, index) => {
                        axios
                          .get(
                            `https://dev9.stackby.com/api/v1/tabledata/${blockID}/${table.id}/${view.id}`
                          )
                          .then((response) => {
                            views[view.name] = { ...response.data.data }
                            if (index === viewsArr.length - 1) {
                              let newTables = [...this.state.tables]
                              newTables.push({
                                tableName: table.name,
                                tableId: table.id,
                                views
                              })
                              this.setState({
                                tables: newTables
                              })
                            }
                          })
                          .catch((err) => {
                            console.log(err, 'error in fetching tableData')
                          })
                      })
                    })
                    .catch((err) => {
                      console.log(err, 'error in fetching viewlist')
                    })
                })
              })
          }
        })
    }

    componentDidUpdate() {
      if (!this.state.loadingChanged) {
        if (this.state.tables.length == this.state.tablesLength) {
          this.setState({ loading: false, loadingChanged: true })
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
        )
      } else if (!this.state.loading) {
        return (
          <div>
            <WrappedComponent
              {...this.props}
              tables={this.state.tables}
              blockData={this.state.blockData}
            />
          </div>
        )
      } else {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh'
            }}
          >
            <div className={styles.loader}></div>
            <h3>Hang in there, your data is arriving soon...</h3>
          </div>
        )
      }
    }
  }

  return WithWidgets
}

export default withWidgets
