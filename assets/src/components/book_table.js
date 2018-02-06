import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { BookRow } from './book_row'

export class BaseBookTable extends Component {
  renderRow = (row) => {
    return (
      <BookRow
        key={ row.name }
        regionName={ this.props.regionName }
        unnest={ this.props.unnest }
        className={ this.props.nested ? 'secondary' : 'primary' }
        { ...row } />
    )
  }

  render () {
    const { loading, books } = this.props
    if (loading) {
      return <tr><td>Fetching...</td></tr>
    }

    return books.map(this.renderRow)
  }
}

const BookTable = ({ data: { loading, books }, ...rest }) => (
  <BaseBookTable loading={ loading } books={ books } { ...rest } />
)

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
