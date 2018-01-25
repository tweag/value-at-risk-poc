import React, { Component } from 'react'
import NestedTable from './nested_table'

export class BookRow extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  toggleRow = () => {
    this.setState((state) => ({ open: !state.open }))
  }

  render () {
    const { name, valueAtRisk1, valueAtRisk5, marketValue, costBasis, profitLoss } = this.props
    const { open } = this.state
    const isGain = profitLoss > 0

    return [
      <tr
        key={ name }
        onClick={ this.toggleRow }
        className={ open ? 'open security' : 'security' }
      >
        <td className='description'>{ name }</td>
        <td></td>
        <td></td>
        <td>{ `\$${valueAtRisk1.toFixed(2)}` }</td>
        <td>{ `\$${valueAtRisk5.toFixed(2)}` }</td>
        <td>{ `\$${costBasis.toFixed(2)}` }</td>
        <td>{ `\$${marketValue.toFixed(2)}` }</td>
        <td className={ isGain ? 'gain' : 'loss'}>
          { `\$${profitLoss.toFixed(2)}` }
        </td>
      </tr>,
      open ? (
        <NestedTable key='regions' columns={8}>
          { this.props.unnest() }
        </NestedTable>
      ) : null
    ]
  }
}
