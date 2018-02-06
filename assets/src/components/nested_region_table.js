import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { RegionRow } from './region_row'
import { SecurityHeader } from './security_row'


class NestedRegionTable extends Component {
  renderRow = (row) => {
    return (
      <RegionRow
        key={ row.name }
        bookName={ this.props.bookName }
        unnest={ this.props.unnest }
        className={ 'secondary' }
        { ...row } />
    )
  }

  render () {
    const { data: { loading, book } } = this.props
    if (loading) {
      return <tr><td>Fetching...</td></tr>
    }

    return book.regions.map(this.renderRow)
  }
}

export default graphql(gql`
  query($bookName: String) {
    book(name:$bookName) {
      regions {
        name
        costBasis
        marketValue
        profitLoss
        valueAtRisk1
        valueAtRisk5
      }
    }
  }
`)(NestedRegionTable)

