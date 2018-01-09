import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class Position extends Component {
  render () {
    const { acquired, quantity, costBasis, originalPrice, marketValue } = this.props
    const acquiredDate = new Date(acquired * 1000).toLocaleString()
    const gainLoss = marketValue - costBasis
    const isGain = gainLoss > 0

    return (
      <tr className='position'>
        <td className='description'>{ `Lot Acquired: ${acquiredDate}` }</td>
        <td></td>
        <td>{ `${quantity.toFixed(3)}` }</td>
        <td>{ `\$${costBasis.toFixed(2)}` }</td>
        <td>{ `\$${marketValue.toFixed(2)}` }</td>
        <td className={ isGain ? 'gain' : 'loss'}>
          { `\$${gainLoss.toFixed(2)}` }
        </td>
      </tr>
    )
  }
}

class PositionRows extends Component {
  renderPosition (position) {
    return <Position key={ position.acquired }{ ...position } />
  }

  render () {
    const { data } = this.props
    if (data.loading) {
      return null
    }
    return data.security.positions.map(this.renderPosition)
  }
}


const PositionsForSecurity = gql`
  query PositionsForSecurity($id: ID!) {
    security(id: $id) {
      positions {
        acquired
        quantity
        costBasis
        originalPrice
        marketValue
      }
    }
  }
`

const options = ({ id }) => ({ variables: { id } })

export default graphql(PositionsForSecurity, { options })(PositionRows)


