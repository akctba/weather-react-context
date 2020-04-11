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
          language: action.payload
          
        };
        case "FIND_BY_NAME":
        return {
          ...state,
          location: action.payload,
          weather: loadWeather(action.payload)
        };
      default:
        return state;
    }
  };

const loadWeather = (place) => {
    fetch(`${api.base}weather?q=${place}&lang=${this.context.language}&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      console.log(result);
      return result;
    }).catch(error => {
      console.error(error);
    })
}

class WeatherProvider extends Component {
    state = {
        language: "en",
        location: "",
        weather : {},
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    }

    componentDidMount() {
        //get location and call API by Lat and Lon
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                let endpoint = `${api.base}weather?lat=${lat}&lon=${lon}&lang=${this.state.language}&units=metric&APPID=${api.key}`;
                console.log(endpoint);

                fetch(endpoint)
                    .then(res => res.json())
                    .then(result => {
                        console.log(result);
                        //return result;
                        this.setState({weather: result});
                    }).catch(error => {
                      //TODO: show error message
                    });

            }, error => {console.error(error)},
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 5000});
          } else {
            console.log("Geolocation is not supported by this browser.");
          }
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
