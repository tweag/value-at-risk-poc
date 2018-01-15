import React, { Component } from 'react'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PositionsChart extends Component {
  render () {
    const { data: { loading, security } } = this.props
    if (loading) {
      return <div>Fetching...</div>
    }

    let totalQuantity = 0
    security.positions.map(({ acquired, quantity }) => {
      totalQuantity += position
      return {
        x: position.acquired,
        y: totalQuantity,
      }
    }

    return (
      <div>
        <VictoryChart
          theme={VictoryTheme.grayscale}
        >
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc"}
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 7 }
            ]}
          />
        </VictoryChart>
      </div>
    )
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

export default graphql(PositionsForSecurity, { options })(PositionsChart)
