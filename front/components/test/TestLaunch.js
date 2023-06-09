import React, { Component } from "react";
import { connect } from 'react-redux';
import Footer from "../include/Footer";
import GridItem from "../include/GridItem";
import {Container, Row, Col, Button, Modal} from "react-bootstrap";
import * as actions from '../../actions/testLaunch_actions';
import {Link} from "react-router-dom";
import Select from "react-dropdown-select";
import TestSideBar from "./testComponents/TestSideBar"
import Question from "./testComponents/Question";
import Pagination from "./testComponents/Pagination";
import Loader from "../include/Loader";
import {
    isMobile
} from "react-device-detect";
import config from "../../config";
import moment from "moment";
import testLaunch from "../../reducers/testLaunch";
const reducer = ({ main, testLaunch, test }) => ({ main, testLaunch, test });

class TestLaunch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionMainNum: 0,
            timer: 0
        };
       
        this.changingPage = this.changingPage.bind(this);
        this.selectingAnswer = this.selectingAnswer.bind(this);
        this.endTest = this.endTest.bind(this);
    }
    componentDidMount() {
        const {match, dispatch, testLaunch:{openTest, loading}} = this.props;
        let cc = {
        };
        dispatch(actions.getTest(cc, match.params.slug));
        let self = this;
        this.getTestSeconds = config.get('emitter').addListener('testSingleGetSeconds', function(data) {
            if (data.success) {
                if(data?.timer!==0) {
                    self.setState({
                        timer: data?.timer
                    }, () => {
                        let interval = setInterval(() => {
                            self.setState({
                                timer: (self.state.timer - 1)
                            })
                            if(self.state.timer === 1)  {
                                clearInterval(interval)
                                self.endTest();
                            }
                         }, 1000)
                    });
                }
                
            }
        });
        
    }
    componentWillUnmount() {
        const {testLaunch:{openTest}, dispatch} = this.props;
        const {questionMainNum} = this.state;
        this.getTestSeconds.remove();
        if(openTest && openTest.questions && openTest.questions.length>0){
            let cc = {
                _id: openTest._id,
                question_id: openTest.questions[questionMainNum]._id,
                answer_id: openTest.questions[questionMainNum].answer
            };
            dispatch(actions.postAnswers(cc));
        }
    }
    selectingAnswer(e, question_id, answer_id) {
        const {testLaunch:{openTest, loading}} = this.props;
        this.props.dispatch(actions.selectedAnswer({_id: openTest._id, question_id, answer_id}))
    }
    changingPage(e, question_id, answer_id) {
        const {testLaunch:{openTest, loading}} = this.props;
        this.setState({questionMainNum: e}, () => {
            if(question_id && answer_id){
                this.props.dispatch(actions.postAnswers({_id: openTest._id, question_id, answer_id}))
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    endTest(){
        const {testLaunch:{openTest, loading}} = this.props;
        this.props.dispatch(actions.endTest({openTest:openTest})).then((e) => {
            if (e.json.success) {
                this.props.history.replace(`/test/result/${e.json.payload}`)
            } else {
                
            }
        })
    }
    render() {
        const {test: {tests}} = this.props;
        const {testLaunch:{openTest, loading}} = this.props;
        const demoTest = [];
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes*60;
        
        return (
            <React.Fragment>
                <div className="testHeader1">
                        <div className="logo" style={{display: 'inline-block'}}>
                        
                            <img src="/images/odosuryo.png" alt="" style={{width: 175}} />
                        </div>
                </div>
                <div className="list-container" style={{minHeight: 'calc(100vh - 40px)', backgroundColor:'#f2e8e9'}}>
                        
                    <Container>
                            <div className="container">
                                <Row>
                                    <Col xl={3} lg={3} md={12} sm={12}>
                                        <div className="sideBarPage">
                                            <TestSideBar answerSelect={this.selectingAnswer} answer={this.state.selectedAnswer} pageNum={this.state.questionMainNum} question={(openTest.questions || [])[this.state.questionMainNum]} changeNum={this.changingPage}/>
                                        </div>
                                    </Col>
                                    <Col xl={8} lg={8} md={12}>
                                        <div className="mainSection" >
                                            <Row>
                                                <div className="headerTestLaunch">
                                                    <div className="timer" >
                                                    Хугацаа: {
                                                        minutes === 0 && seconds === 0 ?
                                                        <span style={{color: '#f8513c'}}> Хугацаагүй </span>
                                                        :
                                                        <>{minutes} : {seconds}</>
                                                        
                                                    } 
                                                    </div>
                                                    <div className="titleHeader">
                                                        {openTest?.title}
                                                    </div>
                                                    
                                                </div>
                                            </Row>
                                            <Row>
                                                <Question answerSelect={this.selectingAnswer} answer={this.state.selectedAnswer} question={(openTest.questions || [])[this.state.questionMainNum]} pageNum={this.state.questionMainNum} changeNum={this.changingPage}/>
                                            </Row>
                                            <Row>
                                                <Pagination endTest={this.endTest}  answerSelect={this.selectingAnswer} answer={this.state.selectedAnswer} question={(openTest.questions || [])[this.state.questionMainNum]} pageNum={this.state.questionMainNum} changeNum={this.changingPage}/>
                                            </Row>
                                        </div>
                                    </Col>
                                    
                                </Row>
                            </div>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(TestLaunch);