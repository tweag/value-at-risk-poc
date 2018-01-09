import React, { Component } from 'react'

export const Table = (props) => {
  const { renderHeader, renderRow, rows } = props
  return (
    <table>
      <thead>
        { renderHeader() }
      </thead>
      <tbody>
        { rows.map(renderRow, rows) }
      </tbody>
    </table>
  )
}
