import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export class PLDay extends Component {
  render () {
    const { date, profitLoss } = this.props
    const acquiredDate = new Date(date * 1000).toLocaleDateString()
    const isGain = profitLoss > 0

    return (
      <tr className='position'>
        <td className='description'>{ `Date: ${acquiredDate}` }</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className={ isGain ? 'gain' : 'loss'}>
          { `${(parseFloat(profitLoss)*100).toFixed(2)}%` }
        </td>
      </tr>
    )
  }
}

class ProfitLossRow extends Component {
  renderPosition (position) {
    return <PLDay key={ position.date }{ ...position } />
  }

  render () {
    const { data } = this.props
    if (data.loading) {
      return null
    }
    return data.security.pldays.map(this.renderPosition)
  }
}


const PLDaysForSecurity = gql`
  query PLDaysForSecurity($id: ID!) {
    security(id: $id) {
      pldays {
        date
        profitLoss
      }
    }
  }
`

const options = ({ id }) => ({ variables: { id } })

export default graphql(PLDaysForSecurity, { options })(ProfitLossRow)


