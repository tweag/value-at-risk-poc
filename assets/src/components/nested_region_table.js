import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { BaseRegionTable } from './region_table'

const NestedRegionTable = ({ data: { loading, book }, ...rest }) => (
  <BaseRegionTable loading={ loading } regions={ book && book.regions } nested { ...rest } />
)

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
