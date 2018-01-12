import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class PositionsChart extends Component {
  render () {
    const { data: { loading, security } } = this.props
    if (loading) {
      return <div>Fetching...</div>
    }
    return <div>Blah { JSON.stringify(security.positions) }</div>
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
