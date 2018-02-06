import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { BookRow } from './book_row'

class NestedBookTable extends Component {
  renderRow = (row) => {
    return (
      <BookRow
        key={ row.name }
        regionName={ this.props.regionName }
        unnest={ this.props.unnest }
        { ...row } />
    )
  }

  render () {
    const { data: { loading, region } } = this.props
    if (loading) {
      return <tr><td>Fetching...</td></tr>
    }

    return region.books.map(this.renderRow)
  }
}

export default graphql(gql`
  query($regionName: String) {
    region(name: $regionName) {
      books {
        name
        costBasis
        marketValue
        profitLoss
        valueAtRisk1
        valueAtRisk5
      }
    }
  }
`)(NestedBookTable)

