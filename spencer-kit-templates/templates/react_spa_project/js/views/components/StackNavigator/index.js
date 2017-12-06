import { createNavigator, StackRouter, addNavigationHelpers,NavigationActions } from 'react-navigation';
import NavigatorFrame from './NavigatorFrame';
function StackNavigator(routeConfigs,config){
    return createNavigator(StackRouter(routeConfigs,config))(NavigatorFrame);
}
export default StackNavigator;