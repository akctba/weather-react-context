import React, {Component} from "react";
const { Provider, Consumer } = React.createContext();

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
      default:
        return state;
    }
  };

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
      fetch(`${process.env.REACT_APP_BASE}weather?q=vancouver&lang=${this.state.language}&units=metric&APPID=${process.env.REACT_APP_KEY}`)
      .then(res => res.json())
      .then(result => {
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
