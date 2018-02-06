import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { RegionRow } from './region_row'

export class BaseRegionTable extends Component {
  renderRow = (row) => {
    return (
      <RegionRow
        key={ row.name }
        bookName={ this.props.bookName }
        unnest={ this.props.unnest }
        className={ this.props.nested ? 'secondary' : 'primary' }
        { ...row } />
    )
  }

  render () {
    const { loading, regions } = this.props
    if (loading) {
      return <tr><td>Fetching...</td></tr>
    }

    return regions.map(this.renderRow)
  }
}

const RegionTable = ({ data: { loading, regions }, ...rest }) => (
  <BaseRegionTable loading={ loading } regions={ regions } { ...rest } />
)

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
