import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { extent, histogram, quantile } from 'd3-array'
import { VictoryAxis, VictoryChart, VictoryBar, VictoryTheme } from 'victory'

class ProfitLossChart extends Component {
  render () {
    const { data } = this.props
    if (data.loading) {
      return null
    }
    const { security: { pldays, marketValue } } = data

    const profitLosses = pldays.map(day => parseFloat(day.profitLoss))
    const sorted = profitLosses.sort((a,b) => (+a) - (+b))
    const [loss, profit] = extent(profitLosses)
    const mag = Math.max(Math.abs(loss), Math.abs(profit))
    const [min, max] = [-0.07, 0.07]
    const numBuckets = (max - min) * 100 * 4  // buckets in increments of some%
    const hist = histogram().domain([min, max]).thresholds(numBuckets)(profitLosses)
    const percentProfitLoss = quantile(profitLosses, 5 / 100.0)

    const hist2 = hist.map(
      arr => ({
        len: arr.length,
        start: arr.x0,
        end: arr.x1,
        average: (arr.x0 + arr.x1)/2
      })
    )

    return (
      <VictoryChart domainPadding={20} width={800} theme={VictoryTheme.material}>
        <VictoryAxis
          crossAxis
          orientation="bottom"
          tickCount={11}
          tickFormat={num => num == 0 ? '0%' : `${(num*100).toFixed(0)}%`}
        />
        <VictoryBar
          data={hist2}
          x={t => t.average}
          y={t => t.len}
          interpolation="step"
        />
      </VictoryChart>
    )
  }
}

const PLDaysForSecurity = gql`
  query PLDaysForSecurity($id: ID!) {
    security(id: $id) {
      marketValue
      pldays {
        date
        profitLoss
      }
    }
  }
`

const options = ({ id }) => ({ variables: { id } })

export default graphql(PLDaysForSecurity, { options })(ProfitLossChart)

