import React, { Component } from 'react'

const TheDate = () => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return (
    <div className='date'>
      <span>
        { new Date().toLocaleString('en-us', dateOptions) }
      </span>
    </div>
  )
}

const Logo = () => {
  return (
    <div className='logo'>
      <span>&#128200;</span>
    </div>
  )
}

const MenuItems = () => {
  return (
    <ul>
      <li><a href='/graphql'>Queries</a></li>
      <li><a href='/embed_charts'>Charts</a></li>
    </ul>
  )
}

export default class Menu extends Component {
  render () {

    return (
      <div className='menu'>
        <Logo />
        <TheDate />
        <MenuItems />
      </div>
    )
  }
}
