import React, { Component } from 'react'

class NestedTable extends Component {

  render () {
    return (
      <tr className='position'>
        <td colSpan={this.props.columns}>
          { this.props.children }
        </td>
      </tr>
    )
  }
}

export default NestedTable
