import React, { Component } from 'react'
import ProfitLossChart from './profit_loss_chart'

export const SecurityHeader = () => (
    <tr className='header'>
      <th className='description'>Description</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Value At Risk 1%</th>
      <th>Value At Risk 5%</th>
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
    const { id, symbol, price, quantity, valueAtRisk1, valueAtRisk5, marketValue, costBasis, profitLoss } = this.props
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
        <td>{ `\$${valueAtRisk1.toFixed(2)}` }</td>
        <td>{ `\$${valueAtRisk5.toFixed(2)}` }</td>
        <td>{ `\$${costBasis.toFixed(2)}` }</td>
        <td>{ `\$${marketValue.toFixed(2)}` }</td>
        <td className={ isGain ? 'gain' : 'loss'}>
          { `\$${profitLoss.toFixed(2)}` }
        </td>
      </tr>,
      open
        ? <ProfitLossChart id={ id } />
        : null
    ]
  }
}
