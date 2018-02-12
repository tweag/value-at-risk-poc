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
    <div className='brand'>
      <span className='logo'>&#128200;</span>
      <span>Client X</span>
    </div>
  )
}

const MenuItems = () => {
  return (
    <ul>
      <li><a href='/graphql'>Queries</a></li>
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
