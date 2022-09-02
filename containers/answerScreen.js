import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container,Content,Header,Title,Button,Text,Separator ,List,ListItem,Icon,Grid,Col,Row,Left,Right,Body,CheckBox} from 'native-base';
import { createAnimatableComponent, View } from 'react-native-animatable';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import questionData from '../test/testData.json';
class answerScreen extends React.Component {

  constructor(){
    super()

    // var testData = require('../testData.json');
    // console.log("json読み込みテスト");

    //答えを可変にする
    // questionList = 
    //   {
    //   1:{
    //     questionNo:1,
    //     questionDetail:'問題内容1',
    //     answerList:
    //     [
    //       {no:1,answer:'答え内容1',isAnswer:true},
    //       {no:2,answer:'答え内容2',isAnswer:false},
    //       {no:3,answer:'答え内容3',isAnswer:false},
    //       {no:4,answer:'答え内容4',isAnswer:false},
    //     ],
    //     answerNo:1
    //   },
    //   2:{
    //     questionNo:2,
    //     questionDetail:'問題内容2',
    //     answerList:
    //     [
    //       {no:1,answer:'答え1',isAnswer:false},
    //       {no:2,answer:'答え2',isAnswer:true},
    //       {no:3,answer:'答え3',isAnswer:false},
    //       {no:4,answer:'答え4',isAnswer:false},
    //     ],
    //     answerNo:2
    //   }
    // }

    let questionNo = 1

    this.state = {
      questionNo : questionNo,
      questionList : questionData,
      isSuccessOpen: false,
      isFailOpen: false,
      isDisabled: false,
      swipeToClose: true
    }
  }

  //
  createNowAnswer(questionNo){
    let result;
    let nowAnswer;
    let answerNo;
    for(key in this.state.questionList){
      if(this.state.questionList[key].questionNo == questionNo){
        //答えのみ格納
        for(key2 in this.state.questionList[key].answerList){
          if(this.state.questionList[key].answerList[key2].isAnswer){
            nowAnswer = this.state.questionList[key].answerList[key2].answer
          }
        }
        answerNo = this.state.questionList[key].answerNo;
        break;
      }
    }
    return result;
  }

  componentDidMount(){
    let questionNo = 1
    let nowAnswer;
    let answerNo;
    for(key in this.state.questionList){
      if(this.state.questionList[key].questionNo == questionNo){
        //答えのみ格納
        for(key2 in this.state.questionList[key].answerList){
          if(this.state.questionList[key].answerList[key2].isAnswer){
            nowAnswer = this.state.questionList[key].answerList[key2].answer
          }
        }
        answerNo = this.state.questionList[key].answerNo;
        break;
      }
    }

    console.log(nowAnswer);
    this.setState({nowAnswer:nowAnswer,questionNo:questionNo,answerNo:answerNo});
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  //答えをチェックします
  checkAnswer(item){
    console.log(item.isAnswer);
    // alert(item.isAnswer)
    if(item.isAnswer){
      this.setState({isSuccessOpen:true});
    }else{
      // this.refs.failModal.open()
      this.setState({isFailOpen:true});
    }
  }

  //次の問題
  nextQuestion(){
    let nextNo = this.state.questionNo + 1;
    let maxNo = Object.keys(this.state.questionList).length;
    if(maxNo < nextNo){
      this.setState(
        {
        isSuccessOpen: false,
        isFailOpen: false
        });
      alert("終了");
    }else{
      this.setState(
        {
        isSuccessOpen: false,
        isFailOpen: false,
        questionNo: nextNo
        });
    }
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <ListItem itemDivider>
        <Text style={{fontSize:16}}>解答群</Text>
      </ListItem>
    );
  }

  render() {
    const {questionList,questionNo,nowAnswer,answerNo} = this.state
    return (
      <Container>
        <Grid>
          <Row style={{ padding:10,height:40,backgroundColor:"#3F51B5",alignItems:"center"}}>
            <Text style={{color:"#fff"}}>問題 {questionNo}</Text>
          </Row>
          <Row style={{ padding: 15}} size={4}>
            <Text>{questionList[questionNo].questionDetail}</Text>
            {/* <View animation="bounceInUp" delay={1000}>
              <Text>Tap one of the following to animate for {duration} ms</Text>
              <Button　onPress={() => this.setState({ toggledOn: !toggledOn })}>
                <Text
                  style={[styles.toggle, toggledOn && styles.toggledOn]}
                >
                  Toggle me!
                </Text>
              </Button>
            </View> */}
          </Row>
          <View style={styles.separator}></View>
          
          <Row size={5} style={{backgroundColor:"#fafafa"}}>
            <List dataArray={questionList[questionNo].answerList} renderHeader={this.renderSectionHeader}
              renderRow={(item) =>
                <ListItem
                //  onPress={() => this.refs.modal.open()}>
                 onPress={this.checkAnswer.bind(this,item)}>
                  <Body style={{flexDirection:"row"}}>
                    <Text style={{flex:1,fontSize:20}}>{item.no}</Text>
                    <Text style={{flex:11}}>{item.answer}</Text>
                  </Body>
                </ListItem>
              }>
            </List>
          </Row>

          {/* <Row style={{ padding: 15}} size={1}>
            <Text>{questionList[questionNo].answer1}</Text>
          </Row>
          <Row style={{ padding: 15}} size={1}>
            <Text>{questionList[questionNo].answer2}</Text>
          </Row>
          <Row style={{ padding: 15}} size={1}>
            <Text>{questionList[questionNo].answer3}</Text>
          </Row>
          <Row style={{ padding: 15}} size={1}>
            <Text>{questionList[questionNo].answer4}</Text>
          </Row> */}
        </Grid>
        <Modal style={[styles.modal]} isOpen={this.state.isSuccessOpen} position={"center"} backdropPressToClose={false} ref={"successModal"}>
          <Grid style={{padding:10}}>
            <Row size={4} style={{flexDirection:"column"}}>
              <Icon name="checkmark-circle" style={{color:'#00c853',marginLeft:-20,flex:2}} size={30}>
                <Text style={{fontSize:35}}> 正解</Text>
              </Icon>
              <Text style={{flex:1}}>答えは{answerNo}です</Text>
              <Text style={{flex:5}}>{nowAnswer}</Text>
            </Row>
            <Row size={1}>
              <Button onPress={this.nextQuestion.bind(this)} block>
                <Text style={{color:"#fff"}}>次の問題へ</Text>
              </Button>
            </Row>
          </Grid>
        </Modal>
        <Modal style={[styles.modal]} isOpen={this.state.isFailOpen} onClosed={() => this.setState({isFailOpen: false})}
           position={"center"} backdropPressToClose={false}  ref={"failModal"}>
          <Grid style={{padding:10}}>
            <Row size={4} style={{flexDirection:"column"}}>
              <Icon name="close-circle" style={{color:'#ff5252',marginLeft:-30,flex:2}} position={'center'} size={30}>
                <Text style={{fontSize:35}}> 不正解</Text>
              </Icon>
              <Text style={{flex:1}}>答えは{answerNo}です</Text>
              <Text style={{flex:5}}>{nowAnswer}</Text>
            </Row>
            <Row size={1}>
              <Button onPress={this.nextQuestion.bind(this)} block>
                <Text style={{color:"#fff"}}>次の問題へ</Text>
              </Button>
            </Row>
          </Grid>
        </Modal>
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
  separator: {
    height:1,
    backgroundColor: '#DDDDDD'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300
  }
});

 
export default answerScreen;