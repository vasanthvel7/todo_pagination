import React from 'react'
import classes from "./TodoItem.module.css"

function TodoItem({item}) {
  return (
      <div className={classes.itemSec}>{ item.title}</div>
  )
}

export default TodoItem