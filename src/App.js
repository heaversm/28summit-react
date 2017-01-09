import React, { Component } from 'react';
import './App.css';




const appData = {
  address: {
    street: '28 Summit',
    city: 'Philmont, NY',
    zip: '12565'
  },
  menuItems: [
    { name: 'Gallery'},
    { name: 'Details'},
    { name: 'Virtual Tour'},
    { name: 'Contact'}
  ],
  copy: {
    title: '28 Summit',
    subtitle: 'Modern living with upstate lakeside charm'
  }
}


function AppHeader(props) {
  return (
    <div className="App-header">
      <h2 className="App-title">{appData.copy.title}</h2>
      <h4 className="App-subtitle">{appData.copy.subtitle}</h4>
    </div>
  );
}

function AppMenuItem(props){
  return <li className="App-menu-item"><a className="App-menu-link" href={props.name.toLowerCase()}>{props.name}</a></li>;
}

function AppMenu(props) {

  const menuItems = appData.menuItems.map((menuItem) =>
    <AppMenuItem key={menuItem.name.toLowerCase()} name={menuItem.name} />
  );

  return (
    <div className="App-menu">
      <ul className="App-menu-items">
        {menuItems}
      </ul>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMenu />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
