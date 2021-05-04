import React from 'react'

import ParentContainer from 'stackby-hoc-lib'
import 'stackby-hoc-lib/dist/index.css'

const App = ({ blockData, tables }) => {
  console.log(blockData, 'blockData')
  console.log(tables, 'tables')

  return <div className='App'>{blockData.type + 'block'}</div>
}

export default ParentContainer(App, 'blk0hFSH9tPcltVxu3')
