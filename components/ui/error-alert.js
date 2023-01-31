import React from 'react'
import classes from './error-alert.module.css'

const ErrorAlert = (props) => {
  return <div className={classes.alert}>{props.children}</div>
}

export default ErrorAlert
