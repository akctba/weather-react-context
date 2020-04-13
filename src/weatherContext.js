import React, {Component} from "react";
const { Provider, Consumer } = React.createContext();

const api = {
    key: "720b1a41660c87e3beb3873ed2143b01",
    base: "https://api.openweathermap.org/data/2.5/"
}

const reducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_LANGUAGE":
        return {
          ...state,
          language: action.payload,
          message: ""
        };
      case "SET_WEATHER":
        return {
          ...state,
          weather: action.payload,
          message: ""
        };
      case "CLEAR_WEATHER":
        return {
          ...state,
          weather: {}
        };
      case "SHOW_MESSAGE":
        return {
          ...state,
          weather: {},
          message: action.payload
        };
        // case "FIND_BY_NAME":
        // return {
        //   ...state,
        //   location: action.payload,
        //   weather: loadWeather(action.payload, state.language) //nao funciona
        // };
        // case "FIND_BY_LOCATION":
        // return {
        //   ...state,
        //   location: '',
        //   weather: loadWeatherLocation(state.language) //nao funciona
        // };
      default:
        return state;
    }
  };

// const loadWeather = (place, lang) => {
//     fetch(`${api.base}weather?q=${place}&lang=${lang}&units=metric&APPID=${api.key}`)
//     .then(res => res.json())
//     .then(result => {
//       console.warn(result);
//       return result;
//     }).catch(error => {
//       console.error(error);
//     })
// }

// const loadWeatherLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//         let lat = position.coords.latitude;
//         let lon = position.coords.longitude;

//         //let endpoint = `${api.base}weather?lat=${lat}&lon=${lon}&lang=${this.state.language}&units=metric&APPID=${api.key}`;
//         let endpoint = `${api.base}weather?lat=${lat}&lon=${lon}&lang=en&units=metric&APPID=${api.key}`;

//         fetch(endpoint)
//             .then(res => res.json())
//             .then(result => {
//                 console.log(result);
//                 return result;
//             }).catch(error => {
//               //TODO: show error message
//             });

//     }, error => {console.error(error)},
//     {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000});
//   } else {
//     console.log("Geolocation is not supported by this browser.");
//   }
// }

class WeatherProvider extends Component {
    state = {
        language: "en",
        location: "",
        weather : {},
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    }

    // componentDidMount() {
    //   //reducer(this.state, {type: "FIND_BY_NAME", payload: "Vancouver"});
    //   loadWeather('vancouver', this.state.language, this.setState);
    // }

    componentDidMount() {
      fetch(`${api.base}weather?q=vancouver&lang=${this.state.language}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        //console.warn(result);
        //return result;
        this.setState({weather: result});
      }).catch(error => {
        console.error(error);
      })
    }

    render() {
        return (
            //Return the Provider with the data that we wanna share between components. 
            //Everything that we have inside Value, will be visible for all components.
            <Provider value={this.state}>
              {this.props.children}
            </Provider>
          );
    }
}

export { WeatherProvider, Consumer as WeatherConsumer };
