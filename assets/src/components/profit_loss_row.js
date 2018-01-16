import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { extent, histogram } from 'd3-array'
import { VictoryAxis, VictoryChart, VictoryBar } from 'victory'

class ProfitLossRow extends Component {

  render () {
    const { data } = this.props
    if (data.loading) {
      return null
    }
    const { security: { pldays } } = data

    const profitLosses = pldays.map(day => parseFloat(day.profitLoss))
    const sorted = profitLosses.sort((a,b) => (+a) - (+b))
    const [min, max] = extent(profitLosses)
    const numBuckets = (max - min) * 100 * 10 // buckets in increments of .1%
    const hist = histogram().domain([min, max]).thresholds(numBuckets)(profitLosses)

    return (
      <tr className='position'>
        <td colSpan={4}>
          <VictoryChart domainPadding={20}>
            <VictoryAxis
              orientation="bottom"
              tickValues={[min, 0, max]}
              tickFormat={num => num == 0 ? '0%' : `${(num*100).toFixed(2)}%`}
            />
            <VictoryBar
              data={hist}
              x={t => t.x1}
              y={t => t.length}
              interpolation="step"
            />
          </VictoryChart>
        </td>
      </tr>
    )
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
