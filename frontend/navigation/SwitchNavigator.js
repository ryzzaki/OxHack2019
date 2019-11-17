import { 
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import LoginScreen from '../screens/LoginScreen'
import MainScreen from '../screens/MainScreen';

const Switch = createSwitchNavigator(
  {
    app: MainScreen,
    logIn: LoginScreen
  },{
    initialRouteName: 'logIn'//TOCHANGE
  }
);

export default SwitchNavigator = createAppContainer(Switch);