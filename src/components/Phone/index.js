import React, { Component } from 'react'

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