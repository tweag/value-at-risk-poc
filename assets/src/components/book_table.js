import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Table } from './table'
import { BookRow } from './book_row'
import { SecurityHeader } from './security_row'


class BookTable extends Component {
  renderRow = (row) => {
    return (
      <BookRow
        key={ row.name }
        unnest={ this.props.unnest }
        { ...row } />
    )
  }

  render () {
    const { data: { loading, books } } = this.props
    if (loading) {
      return <div>Fetching...</div>
    }

    return books.map(this.renderRow)
  }
}

export default graphql(gql`
  query {
    books {
      name
      costBasis
      marketValue
      profitLoss
      valueAtRisk1
      valueAtRisk5
    }
  }
`)(BookTable)

