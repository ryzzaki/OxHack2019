'use strict';

import React, {Component} from 'react';
import SwitchNavigatorLogIn from './navigation/SwitchNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.disableYellowBox = true; //for development time to disable yellow warnings inside the simulators
    return (
      < SwitchNavigatorLogIn />
    );
  }
}
