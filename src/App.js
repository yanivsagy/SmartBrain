import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 3,
      random: false,
      anim: {
        enable: false,
        speed: 20,
        size_min: 0,
        sync: false
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      numFaces: 0,
      route: 'Signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  multipleBoxCalculation = (width, height, regions) => {
    const arrayOfBoxes = [];
    for (let i = 0; i < regions.length; i++) {
      let clarifaiFace = regions[i].region_info.bounding_box;
      arrayOfBoxes.push({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height) + 6
      })
    }
    return arrayOfBoxes;
  }

  calculateFaceLocation = (data) => {
    console.log(data);

    const regions = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    this.setState({numFaces: regions.length});

    return this.multipleBoxCalculation(width, height, regions);
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (e) => {
    this.setState({input: e.target.value});
  }

  onDetect = () => {
    if (this.state.input.length) {
      this.setState({ imageUrl: this.state.input });
      fetch(`http://${ process.env.REACT_APP_API }/imageurl`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'input': this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
          if (response) {
            fetch(`http://${ process.env.REACT_APP_API }/image`, {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({'id': this.state.user.id})
            })
              .then(response => response.json())
              .then(count => this.setState(Object.assign(this.state.user, { entries: count })))
              .catch(console.log);
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        },
        err => console.log(err)
      )
      this.setState({input: ''});
    }
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true});
    } else {
      this.setState({isSignedIn: false});
    }
    this.setState({route: route});
  }

  resetImage = () => {
    this.setState({ imageUrl: '' });
    this.setState({ numFaces: 0 });
  }

  render() {
    const { input, imageUrl, box, numFaces, route, isSignedIn, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} resetImage={this.resetImage}/>
        {
          route === 'home' ?
          <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm input={input} onInputChange={this.onInputChange} onDetect={this.onDetect}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
            {
              (numFaces === 1) ?
              <h1 className='white normal'>{numFaces} face found!</h1> :
              (
                (numFaces > 1) ?
                <h1 className='white normal'>{numFaces} faces found!</h1> :
                <div></div>
              )
            }
          </div> :
          (
            route === 'Signin' ?
            <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
      </div>
    );
  }
}

export default App;
