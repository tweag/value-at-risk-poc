import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { SecurityRow } from './security_row'


class SecurityTable extends Component {
  renderRow = (row) => {
    return <SecurityRow key={ row.symbol } { ...row } />
  }

  render () {
    const { data: { loading, book } } = this.props
    if (loading) {
      return <tr><td>Fetching...</td></tr>
    }

    return book.region.securities.map(this.renderRow)
  }
}

export default graphql(gql`
  query ($bookName:String, $regionName:String) {
    book(name:$bookName) {
      region(name:$regionName) {
        securities {
          id
          symbol
          price
          quantity
          costBasis
          marketValue
          profitLoss
          valueAtRisk1
          valueAtRisk5
        }
      }
    }
  }
`)(SecurityTable)

