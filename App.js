import React from 'react';
import { StyleSheet, } from 'react-native';
import { Scene, Router,Actions,Modal,Tabs } from 'react-native-router-flux';
import { Icon,StyleProvider,Root} from 'native-base';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';
import { Font, AppLoading } from "expo";
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
// import TabIcon from './containers/tabIcon';
import EasyMenu from './containers/easyMenu';
import NomalMenu from './containers/nomalMenu';
import HardMenu from './containers/hardMenu';
import AnswerScreen from './containers/answerScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  //theme適用のためのFont読み込み
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
    
      <StyleProvider style={getTheme(material)}>
      <Router>
      <Scene key="root">
      <Tabs
        key='root'
        swipeEnabled={ true }
        animationEnabled={ true }
        labelStyle={{fontSize:13}}
        inactiveBackgroundColor={"#f5f5f5"}
        activeBackgroundColor={"#eeeeee"}
        activeTintColor={"#311b92"}
        inactiveTintColor={"#616161"}
        hideNavBar>
          <Scene 
              key='EasyMenu'
              component={EasyMenu}
              headding
              title='初級過去問題集一覧'
              tabBarLabel='初級'
              // icon={ () => (<Icon name='book' color={props.focused ? 'blue' : 'grey'}/>)}
              icon={ () => (<Icon name='book' style={{color:"#3F51B5"}}/>)}
          />
          <Scene 
              key='NomalMenu'
              component={NomalMenu}
              title='中級過去問題集一覧'
              tabBarLabel="中級"
              icon={ () => (<Icon name='book' style={{color:"#3F51B5"}}/>)}
          />
          <Scene 
              key='HardMenu'
              initial={ true }
              component={HardMenu}
              title='上級過去問題集一覧'
              tabBarLabel="上級"
              icon={ () => (<Icon name='book' style={{color:"#3F51B5"}}/>)}
          />
          <Scene 
              key='setting'
              component={NomalMenu}
              title='オプション'
              tabBarLabel="設定"
              icon={ () => (<Icon name='settings' style={{color:"#3F51B5"}}/>)}
          />
        </Tabs>
        <Scene 
            key='AnswerScreen'
            component={AnswerScreen}
            tabBarLabel="設定"
            icon={ () => (<Icon name='settings' style={{color:"#3F51B5"}}/>)}
        />
      </Scene>
  </Router>
  </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
