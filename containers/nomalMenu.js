import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import { Container,Content,Header,Button, Text ,List,ListItem,Icon,Grid,Col,Row,Left,Right,Body,CheckBox} from 'native-base';
import { Actions } from 'react-native-router-flux';

class nomalMenu extends React.Component {

  constructor(){
    super()

    itemList =[
      {id:1,title:"タイトル",detail:"本文",isComplate:false},
      {id:2,title:"Memo2",detail:"Detail",isComplate:false}
    ]

    this.state = {
      itemList : itemList
    }
  }

  render() {
    const {itemList} = this.state
    return (
      <Container>
        <View style={{flex:1}}>
            <List style={styles.mainContent} dataArray={itemList}
              renderRow={(item) =>
                <ListItem>
                  <Body>
                    <Text>{item.title}</Text>
                  </Body>
                </ListItem>
              }>
            </List>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainContent: {
    flex: 5,
  },
});

 
export default nomalMenu;