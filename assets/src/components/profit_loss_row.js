import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { extent, histogram, quantile } from 'd3-array'
import { VictoryAxis, VictoryChart, VictoryBar } from 'victory'

const VaR = ({ percentile, profitLosses }) => {
  const profitLoss = quantile(profitLosses, percentile / 100.0)
  return (
    <td>
      <p>{percentile}% VaR:</p>
      <p>{(profitLoss * 100.0).toFixed(2)}%</p>
    </td>
  )
}

class ProfitLossRow extends Component {

  render () {
    const { data } = this.props
    if (data.loading) {
      return null
    }
    const { security: { pldays } } = data

    const profitLosses = pldays.map(day => parseFloat(day.profitLoss))
    const sorted = profitLosses.sort((a,b) => (+a) - (+b))
    const [loss, profit] = extent(profitLosses)
    const mag = Math.max(Math.abs(loss), Math.abs(profit))
    const [min, max] = [-mag, mag]
    const numBuckets = (max - min) * 100 * 10 // buckets in increments of .1%
    const hist = histogram().domain([min, max]).thresholds(numBuckets)(profitLosses)

    return (
      <tr className='position'>
        <td colSpan={4}>
          <VictoryChart domainPadding={20}>
            <VictoryAxis
              orientation="bottom"
              tickValues={[loss, 0, profit]}
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
        {[5, 1].map(percentile => <VaR key={percentile} profitLosses={profitLosses} percentile={percentile} />)}
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
