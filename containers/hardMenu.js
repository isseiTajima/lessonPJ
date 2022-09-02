import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import { Container,Content,Header,Title,Button, Text ,List,ListItem,Icon,Grid,Col,Row,Left,Right,Body,CheckBox} from 'native-base';
import { Actions } from 'react-native-router-flux';

class hardMenu extends React.Component {

  constructor(){
    super()

    itemList =[
      {id:1,title:"タイトル",detail:"本文",isComplate:false},
      {id:2,title:"Memo2",detail:"Detail",isComplate:false}
    ]
    titleList = {title1:'農○○論',title2:'財○○会計',title3:'人○○管理'}

    this.state = {
      itemList : itemList,
      titleList : titleList
    }
  }

  render() {
    const {itemList,titleList} = this.state
    return (
      <Container>
        <Content style={{flex:1}}>
        <List>
            <ListItem itemHeader first>
              <Text>平成29年度</Text>
            </ListItem>
              <ListItem selected onPress = {() => Actions.AnswerScreen({nendo:29,title: '平成29年度 ' + titleList.title1})}>
                <Left>
                  <Text>{titleList.title1}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                <Text>{titleList.title2}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                <Text>{titleList.title3}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            <ListItem itemHeader last>
            <Text>平成28年度</Text>
            </ListItem>
            <ListItem>
                <Left>
                  <Text>{titleList.title1}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                <Text>{titleList.title2}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                <Text>{titleList.title3}</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
          </List>
        </Content>
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

 
export default hardMenu;