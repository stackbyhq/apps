# Getting Started with Higher Order Component (**HOC**)

## How to use in in your code

```
npm install 'stackby-hoc-lib'
```

```
* import the library and give it whatever name u like it
* Pass two arguments in it
* 1st - should be the component whom you want to wrap
* 2nd - should be the blockid
```

## Props given by HOC

```
* Their are 2 props
* blockData, tables
* blockData will be an object containing block data
* tables will be an array of objects containing tableid,tablename and views is an object containing different views, e.g. - `{'Grid':tableData2,'Gallery':tableData2}`

```

## Here is an example

```javascript
import React from 'react'
import ParentContainer from 'stackby-hoc-lib'

const App = ({ blockData, tables }) => {
  console.log(blockData, 'blockData')
  console.log(tables, 'tables')

  return <div className='App'>Your code here</div>
}

export default ParentContainer(App, blockid)
```

## License

stackbyhq © [stackbyhq](https://github.com/stackbyhq)
