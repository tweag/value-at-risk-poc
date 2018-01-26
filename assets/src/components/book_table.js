import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { BookRow } from './book_row'

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
      return <tr><td>Fetching...</td></tr>
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

