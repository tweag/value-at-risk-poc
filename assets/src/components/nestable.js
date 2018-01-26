import React, { Component } from 'react'

export default class Nestable extends Component {
  unnest = (props) => {
    const [_, ...hierarchy] = this.props.hierarchy
    return <Nestable hierarchy={hierarchy} {...props} />
  }

  render () {
    const NextComponent = this.props.hierarchy[0]
    return (
      <NextComponent
        {...this.props}
        topLevel={ this.props.topLevel }
        unnest={ this.unnest } />
    )
  }
}
