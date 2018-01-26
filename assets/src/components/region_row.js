import React, { Component } from 'react'

export class RegionRow extends Component {
  constructor (props) {
    super(props)
    this.state = { open: false }
  }

  toggleRow = () => {
    this.setState((state) => ({ open: !state.open }))
  }

  render () {
    const { bookName, name, valueAtRisk1, valueAtRisk5, marketValue, costBasis, profitLoss } = this.props
    const { open } = this.state
    const isGain = profitLoss > 0

    return [
      <tr
        key={ name }
        onClick={ this.toggleRow }
        className={ open ? 'open region' : 'region' }
      >
        <td className='description'>REGION: { name }</td>
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
      open
        ? this.props.unnest({ bookName, regionName: name, key: 'unnest' })
        : null
    ]
  }
}
