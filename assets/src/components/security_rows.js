import React, { Component } from 'react'
import ProfitLossRow from './profit_loss_row'

export const SecurityHeader = () => (
    <tr className='security'>
      <th className='description'>Symbol</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Value At Risk</th>
      <th>Cost Basis</th>
      <th>Market Value</th>
      <th>Profit/Loss</th>
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
    const { id, symbol, price, quantity, valueAtRisk, marketValue, costBasis, profitLoss } = this.props
    const { open } = this.state
    const isGain = profitLoss > 0

    return [
      <tr
        key='security'
        onClick={ this.toggleRow }
        className={ open ? 'open security' : 'security' }
      >
        <td className='description'>{ symbol }</td>
        <td>{ `\$${price.toFixed(2)}` }</td>
        <td>{ `${quantity.toFixed(3)}` }</td>
        <td>{ `\$${valueAtRisk.toFixed(2)}` }</td>
        <td>{ `\$${costBasis.toFixed(2)}` }</td>
        <td>{ `\$${marketValue.toFixed(2)}` }</td>
        <td className={ isGain ? 'gain' : 'loss'}>
          { `\$${profitLoss.toFixed(2)}` }
        </td>
      </tr>,
      open ? <ProfitLossRow key='positions' id={ id } /> : null
    ]
  }
}
