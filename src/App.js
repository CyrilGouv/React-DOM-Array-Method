import React, { Component } from 'react';
import './App.css';

let data = []

class App extends Component  {
  componentDidMount = () => {
    this.fetchData()
    this.fetchData()
    this.fetchData()
  }

  fetchData = () => {
    fetch(`https://randomuser.me/api`)
      .then(res => res.json())
      .then(data => {
        const user = {
          name: data.results[0].name.first + ' ' + data.results[0].name.last,
          money: Math.floor(Math.random() * 1000000)
        }

        this.addData(user)
      })
  }

  // Add Data
  addData = (user) => {
    data.push(user)

    this.updateDOM()
  }

  // Update DOM Element
  updateDOM = (providedData = data) => {
    const main = document.getElementById('main')
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {
      const el = document.createElement('div')
      el.classList.add('person')
      el.innerHTML = `<strong>${item.name}</strong> ${this.formatMoney(item.money)}`
      main.appendChild(el)
    })
  }

  // Format Money Price
  formatMoney = (number) => {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
  } 

  // Double Money for all users
  doubleMoney = () => {
    data = data.map(item => {
      return { ...item, money: item.money * 2 }
    })

    this.updateDOM()
  }

  // Sort By Richest
  shortByRichest = () => {
    data.sort((a, b) => {
      return b.money - a.money
    })

    this.updateDOM()
  }

  // Calculate Total Wealth
  calculateWealth = () => {
    const main = document.getElementById('main')
    const wealth = data.reduce((acc, item) => (acc += item.money), 0)
    
    const el = document.createElement('div')
    el.innerHTML = `<h3>Total wealth: <strong>${this.formatMoney(wealth)}</strong></h3>`
    main.appendChild(el)
  }

  // Show Millionnaires
  showMilionnaires = () => {
    data = data.filter(item => {
      return item.money >= 1000000
    })

    this.updateDOM()
  }

  // Add User
  addUser = () => {
    this.fetchData()
  }

  render() {
    return (
      <div className="App">
        <h1>DOM Array Method</h1>
  
        <div className="container">
          <aside>
              <button onClick={ this.addUser } id="add-user">Add User 👱‍♂️</button>
              <button onClick={ this.doubleMoney } id="double">Double Money 💰</button>
              <button onClick={ this.showMilionnaires } id="show-millionnaires">Show Only Millionaires 💵</button>
              <button onClick={ this.shortByRichest } id="sort">Sort by Richest ↓</button>
              <button onClick={ this.calculateWealth } id="calculate-wealth">Calculate entire Wealth 🧮</button>
          </aside>
  
          <main id="main" ref={ this.main }>
              <h2><strong>Person</strong> Wealth</h2>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
