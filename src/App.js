import React, { Component } from 'react';
import './App.css';
import Carousel from 'nuka-carousel'; //http://kenwheeler.github.io/nuka-carousel/#/

//DATA

const appData = {
  address: {
    street: '28 Summit',
    city: 'Philmont, NY',
    zip: '12565'
  },
  menuItems: [
    { name: 'Gallery'},
    { name: 'Details'},
    { name: 'Virtual Tour', mobile: false},
    { name: 'Map'},
    { name: 'Contact'}
  ],

  carouselItems: [
    { name: '1', image: '/images/carousel/bedroom.jpg'},
    { name: '2', image: '/images/carousel/loft.jpg'},
    { name: '3', image: '/images/carousel/swing.jpg'},
    { name: '4', image: '/images/carousel/shed-yard.jpg'},
    { name: '5', image: '/images/carousel/firepit.jpg'},
    { name: '6', image: '/images/carousel/floorplans.jpg'}
  ],

  copy: {
    title: '28 Summit',
    subtitle: 'Modern living with upstate lakeside charm',
    details: {
      title: 'Home Details',
      price: '179,000',
      sections: [
        { name: 'the main house',
          details: [
            '2 bedroom, 2 bath',
            '1450 sq. ft of finished space',
            'Single car garage with washer dryer',
            'Huge lofted second level could accommodate extra bedroom',
            'Radiant Heat, Wood Floors, & Wood Stove',
            'Cathedral ceilings & abundant skylights',
            'Warming room and upstairs rear deck'
          ]
        },
        { name: 'the guest shed',
          details: [
            'Day bed & loft bed',
            'Plenty of windows',
            'Heated, private outdoor shower',
            'Deck and fire pit'
          ]
        },
        { name: 'the grounds',
          details: [
            '13,000 sq. ft (~.29 acres)',
            'Shady fenced in back yard for pets & kids',
            'Picnic area and private side yard',
            'Privacy fences and shrubs around entire lot',
            'Vegetable garden',
            'Views of Summit Reservoir and Summit Mill'
          ]
        },
        { name: 'the area',
          details: [
            'Just above High Falls (swimming & hiking)',
            '~2 hours to NYC via train or car',
            '5 min. to Hawthorne Valley Waldorf School & Farm Store',
            '15 min. from charming towns like Hudson, Chatham & Hillsdale',
            '20 min. to Catamount ski area or the Hudson River'
          ]
        }
      ]
    },
    tour: {
      title: 'Virtual Tour',
      description: 'click the model below to begin interaction.',
      model: 'https://3dwarehouse.sketchup.com/embed.html?mid=b49d60e2-08f9-4240-8e3d-83d3e245f915&width=1200&height=480',
      scene: 'https://3dwarehouse.sketchup.com/embed.html?mid=c25e3b04-8de0-4743-9bb0-9b7940b8f59a&width=1200&height=480'
    },
    contact: {
      title: 'Contact',
      description: 'We would love to show you the house. Get in touch with us in order to schedule a viewing or learn about the next open house.',
      email: 'palomacmedina@gmail.com',
      phone: '503-453-0172',
      tel: '+15034530172'
    }
  },
  maps: {
    title: 'Maps',
    descripion: 'Select the map you wish to view',
    maps: [
      {
        name: 'Area',
        link: 'https://www.google.com/maps/d/embed?mid=1fNl1qw1RtYJvYz63D7LKWv8LvAM'
      },
      {
        name: 'Town',
        link: 'https://www.google.com/maps/d/embed?mid=1qoBsE-hl8BAg56bqDCU-ftX2MsM'
      }
    ]
  }
}

//HEADER

function AppHeader(props) {
  return (
    <div className="App-header">
      <h2 className="App-title">{appData.copy.title}</h2>
      <h4 className="App-subtitle">{appData.copy.subtitle}</h4>
    </div>
  );
}

//MENU


function AppMenuItem(props){
  return <li className={"App-menu-item" + props.mobile}><a className="App-menu-link" href={props.name.toLowerCase()}>{props.name}</a></li>;
}

function AppMenu(props) {

  const menuItems = appData.menuItems.map((menuItem) =>
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

  render() {
    const carouselItems = appData.carouselItems.map((carouselItem) =>
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
  const homeDetailSections = appData.copy.details.sections.map((detailSection,i) =>
    <HomeDetailSection key={detailSection.name.toLowerCase()} name={detailSection.name} details={detailSection.details} col={i%2 ? 'even' : 'odd'}/>
  );

  return(
    <div className="App-details">
      <h3 className="details-title">{appData.copy.details.title}</h3>
      <div className="details-sections clearfix">
        {homeDetailSections}
      </div>
      <h4 className="details-price">Asking: ${appData.copy.details.price}</h4>
    </div>
  );
}

//3D MODEL

class Model3D extends React.Component{

  componentDidMount() {
    /*console.log(this.modelframe); //MH - attempt to auto-initiate model
    setTimeout(()=>{
      console.log('click');
      this.modelframe.click()
    },5000);*/
  }

  render(){
    return(
      <div className="model-outer no-mobile">
        <h3 className="details-title">{appData.copy.tour.title}</h3>
        <p className="tour-description">{appData.copy.tour.description}</p>
        <div className="model-container">
          <iframe ref={(iframe) => { this.modelframe = iframe; }} className="model-frame" src={appData.copy.tour.model} allowFullScreen></iframe>
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
  const appMapSections = appData.maps.maps.map((mapItem,i) =>
    <AppMapSection key={mapItem.name.toLowerCase()} name={mapItem.name} link={mapItem.link} col={i%2 ? 'even' : 'odd'}/>
  );

  return(
    <div className="App-maps">
      <h3 className="details-title">{appData.maps.title}</h3>
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
      <h3 className="details-title">{appData.copy.contact.title}</h3>
      <div className="app-contact-container">
        <p className="contact-description">{appData.copy.contact.description}</p>
        <p className="contact-method"><span className="oswald">Phone:</span><br/> <a href={"tel:" + appData.copy.contact.tel}>{appData.copy.contact.phone}</a></p>
        <p className="contact-method"><span className="oswald">Email:</span><br/><a href={"mailto:" + appData.copy.contact.email}>{appData.copy.contact.email}</a></p>
      </div>
    </div>
  )
}

//APP

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppHeader />
        <AppMenu />
        <MainCarousel/>
        <HomeDetails/>
        <Model3D />
        <AppMaps />
        <AppContact />
      </div>
    );
  }
}

export default App;
