import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { BaseBookTable } from './book_table'

const NestedBookTable = ({ data: { loading, region }, ...rest }) => (
  <BaseBookTable loading={ loading } books={ region && region.books } nested { ...rest } />
)

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
