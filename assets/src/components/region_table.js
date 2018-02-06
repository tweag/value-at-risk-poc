import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { RegionRow } from './region_row'
import { SecurityHeader } from './security_row'


class RegionTable extends Component {
  renderRow = (row) => {
    return (
      <RegionRow
        key={ row.name }
        bookName={ this.props.bookName }
        unnest={ this.props.unnest }
        { ...row } />
    )
  }

  render () {
    const { data: { loading, regions } } = this.props
    if (loading) {
      return <tr><td>Fetching...</td></tr>
    }

    return regions.map(this.renderRow)
  }
}

export default graphql(gql`
  query {
    regions {
      name
      costBasis
      marketValue
      profitLoss
      valueAtRisk1
      valueAtRisk5
    }
  }
`)(RegionTable)

