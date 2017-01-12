import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import Carousel from 'nuka-carousel'; //http://kenwheeler.github.io/nuka-carousel/#/

//DATA



//HEADER

function AppHeader(props) {
  return (
    <div className="App-header">
      <h2 className="App-title">{props.appData.copy.title}</h2>
      <h4 className="App-subtitle">{props.appData.copy.subtitle}</h4>
    </div>
  );
}

//MENU


function AppMenuItem(props){
  return <li className={"App-menu-item" + props.mobile}><a className="App-menu-link" href={props.name.toLowerCase()}>{props.name}</a></li>;
}

function AppMenu(props) {

  const menuItems = props.appData.menuItems.map((menuItem) =>
    <AppMenuItem key={menuItem.name.toLowerCase()} name={menuItem.name} mobile={menuItem.mobile === false ? ' no-mobile' : ''} />
  );

  return (
    <div className="App-menu">
      <ul className="App-menu-items">
        {menuItems}
      </ul>
    </div>
  );
}


//CAROUSEL

function AppCarouselItem(props){
  return <img data-id={props.name} className="carousel-item-image" role="presentation" src={props.image} />;
}

class MainCarousel extends Component {
  mixins: [Carousel.ControllerMixin];

  constructor(props) {
    super(props);
  }

  render() {
    const carouselItems = this.props.appData.carouselItems.map((carouselItem) =>
      <AppCarouselItem key={carouselItem.name.toLowerCase()} name={carouselItem.name} image={carouselItem.image} />
    );
    return (
      <div className="App-carousel">
        <Carousel autoplay={true} wrapAround={true}>
          {carouselItems}
        </Carousel>
      </div>
    );
  }
}

//DETAILS

function HomeDetailSection(props){

  const homeDetails = props.details.map((detail) =>
    <p className="detail" key={detail.toLowerCase()}>{detail}</p>
  );

  return(
    <div className={"details-section " + props.col}>
      <h4 className="details-section-header">{props.name}</h4>
      <div className="details-container">
        {homeDetails}
      </div>
    </div>
  );
}

function HomeDetails(props){
  const homeDetailSections = props.appData.copy.details.sections.map((detailSection,i) =>
    <HomeDetailSection key={detailSection.name.toLowerCase()} name={detailSection.name} details={detailSection.details} col={i%2 ? 'even' : 'odd'}/>
  );

  return(
    <div className="App-details">
      <h3 className="details-title">{props.appData.copy.details.title}</h3>
      <div className="details-sections clearfix">
        {homeDetailSections}
      </div>
      <h4 className="details-price">Asking: ${props.appData.copy.details.price}</h4>
    </div>
  );
}

//3D MODEL

class Model3D extends React.Component{

  constructor(props) {
    super(props);
  }

  render(props){
    return(
      <div className="model-outer no-mobile">
        <h3 className="details-title">{this.props.appData.copy.tour.title}</h3>
        <p className="tour-description">{this.props.appData.copy.tour.description}</p>
        <div className="model-container">
          <iframe ref={(iframe) => { this.modelframe = iframe; }} className="model-frame" src={this.props.appData.copy.tour.model} allowFullScreen></iframe>
        </div>
      </div>
    )
  }
}

//MAP

function AppMapSection(props){

  return(
    <div className={"map-section " + props.col}>
      <h4 className="map-section-header">{props.name}</h4>
      <div className="model-container">
        <iframe className="model-frame" src={props.link}></iframe>
      </div>
    </div>
  );
}

function AppMaps(props){
  const appMapSections = props.appData.maps.maps.map((mapItem,i) =>
    <AppMapSection key={mapItem.name.toLowerCase()} name={mapItem.name} link={mapItem.link} col={i%2 ? 'even' : 'odd'}/>
  );

  return(
    <div className="App-maps">
      <h3 className="details-title">{props.appData.maps.title}</h3>
      <div className="map-sections">
        {appMapSections}
      </div>
    </div>
  );
}

//CONTACT

function AppContact(props){
  return(
    <div className="App-contact">
      <h3 className="details-title">{props.appData.copy.contact.title}</h3>
      <div className="app-contact-container">
        <p className="contact-description">{props.appData.copy.contact.description}</p>
        <p className="contact-method"><span className="oswald">Phone:</span><br/> <a href={"tel:" + props.appData.copy.contact.tel}>{props.appData.copy.contact.phone}</a></p>
        <p className="contact-method"><span className="oswald">Email:</span><br/><a href={"mailto:" + props.appData.copy.contact.email}>{props.appData.copy.contact.email}</a></p>
      </div>
    </div>
  )
}

//APP

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {appData: {}};
  }

  componentDidMount() {
    axios.get('/data/appData.json')
    .then((result)=> {
      const thisData = result.data;
      this.setState({
        appData: result.data
      });
    })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {

    const theData = this.state.appData;
    if (Object.keys(theData).length > 0 && theData.constructor === Object){ //if the object is not empty
      return (
        <div className="App">
          <AppHeader appData={theData} />
          <AppMenu appData={theData} />
          <MainCarousel appData={theData} />
          <HomeDetails appData={theData} />
          <Model3D appData={theData} />
          <AppMaps appData={theData} />
          <AppContact appData={theData} />
        </div>
      );
    } else {
      return (
        <div className="App"></div>
      )
    }

  }
}

export default App;
