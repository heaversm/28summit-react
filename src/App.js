import React, { Component } from 'react';
import './App.css';
import Carousel from 'nuka-carousel'; //http://kenwheeler.github.io/nuka-carousel/#/

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

  carouselItems: [
    { name: '1', image: 'http://placehold.it/1000x400/ffffff/c0392b/&text=slide1'},
    { name: '2', image: 'http://placehold.it/1000x400/ffffff/c0392b/&text=slide1'},
    { name: '3', image: 'http://placehold.it/1000x400/ffffff/c0392b/&text=slide1'},
    { name: '4', image: 'http://placehold.it/1000x400/ffffff/c0392b/&text=slide1'},
    { name: '5', image: 'http://placehold.it/1000x400/ffffff/c0392b/&text=slide1'},
    { name: '6', image: 'http://placehold.it/1000x400/ffffff/c0392b/&text=slide1'}
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

function AppCarouselItem(props){
  return <img data-id={props.name} className="carousel-item-image" role="presentation" src={props.image} />;
}

class MainCarousel extends Component {
  mixins: [Carousel.ControllerMixin];

  render() {
    const carouselItems = appData.carouselItems.map((carouselItem) =>
    <AppCarouselItem key={carouselItem.name.toLowerCase()} name={carouselItem.name} image={carouselItem.image} />
    );
    return (
      <div className="App-carousel">
        <Carousel>
          {carouselItems}
        </Carousel>
      </div>
    );
  }
}

class App extends Component {


  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMenu />
        <MainCarousel/>
      </div>
    );
  }
}

export default App;
