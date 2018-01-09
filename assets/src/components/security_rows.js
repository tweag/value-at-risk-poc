import React, { Component } from 'react'
import PositionRows from './position_rows'

export const SecurityHeader = () => (
    <tr className='security'>
      <th className='description'>Symbol</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Cost Basis</th>
      <th>Market Value</th>
      <th>Gain/Loss</th>
    </tr>
)

export class SecurityRow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  toggleRow = () => {
    this.setState((state) => ({ open: !this.state.open }))
  }

  render () {
    const { id, symbol, price, quantity, marketValue, costBasis } = this.props
    const { open } = this.state
    const gainLoss = marketValue - costBasis
    const isGain = gainLoss > 0

    return [
      <tr
        key='security'
        onClick={ this.toggleRow }
        className={ open ? 'open security' : 'security' }
      >
        <td className='description'>{ symbol }</td>
        <td>{ `\$${price.toFixed(2)}` }</td>
        <td>{ `${quantity.toFixed(3)}` }</td>
        <td>{ `\$${costBasis.toFixed(2)}` }</td>
        <td>{ `\$${marketValue.toFixed(2)}` }</td>
        <td className={ isGain ? 'gain' : 'loss'}>
          { `\$${gainLoss.toFixed(2)}` }
        </td>
      </tr>,
      open ? <PositionRows key='positions' id={ id } /> : null
    ]
  }
}

