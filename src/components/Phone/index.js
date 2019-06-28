import React, { Component } from 'react'
import { Icon } from 'antd'
class Phone extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { online } = this.props

    return (
      <Icon type="phone" />
    )
  }
}

export default Phone