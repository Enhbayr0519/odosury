import React, { Component } from "react";
import { connect } from 'react-redux';
import Header from "./include/Header";
import Footer from "./include/Footer";
import {Container, Row, Col, Button, Tabs, Tab, Accordion, Card, Spinner} from "react-bootstrap";
import * as actions from '../actions/bundle_actions';
import config from "../config";
import GridItem from "./include/GridItem";
import Cookies from 'js-cookie'
import Loader from "./include/Loader";
const reducer = ({ main, bundle }) => ({ main, bundle });

class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            card: (Cookies.get('odosuryCard') ? JSON.parse(Cookies.get('odosuryCard')) : {})
        };
    }

    componentDidMount() {
        window.scroll(0, 0);
        const {dispatch, match} = this.props;
        dispatch(actions.getBundle(match.params.slug));
    }
    cardAction(){
        const {
            main: { user },
            bundle: { bundle, addingToCard, removingFromCard },
            dispatch
        } = this.props;
        let hadInCard = (user || {})._id ? ((user || {}).bundles || []).indexOf(bundle._id) > -1 : ((this.state.card || {}).bundles || []).indexOf(bundle._id) > -1;
        if(user){
            if(hadInCard){
                if(!removingFromCard){
                    dispatch(actions.removeFromCard({_id: bundle._id}))
                }
            } else {
                if(!addingToCard){
                    dispatch(actions.addToCard({_id: bundle._id}))
                }
            }
        } else {
            let card = this.state.card;
            let bundles = card.bundles || [];
            if(hadInCard){
                bundles = bundles.filter((c) => c !== bundle._id);
            } else {
                if(bundles.indexOf(bundle._id) === -1){
                    bundles.push(bundle._id);
                }
            }
            card.bundles = bundles;
            Cookies.set('odosuryCard', JSON.stringify(card));
            dispatch(actions.removeFromCookie(bundle._id));
            this.setState({card: card})
        }
    }
    render() {
        const {
            main: { user },
            bundle: { bundle, loading, addingToCard, removingFromCard },
            dispatch
        } = this.props;
        let hadInCard = user ? ((user || {}).bundles || []).indexOf(bundle._id) > -1 : ((this.state.card || {}).bundles || []).indexOf(bundle._id) > -1;
        return (
            <React.Fragment>
                <Header location={this.props.location}/>
                <div className="bundle-single">
                    <Loader status={loading}>
                        <Container>
                            <div className="bundle-header">
                                <img src={(bundle.thumbnail || {}).path ? `${config.get('hostMedia')}${bundle.thumbnail.path}` : '/images/default-lesson.jpg'}  onError={(e) => e.target.src = `/images/default-lesson.jpg`}/>
                                <div className="bundle-header-inner">
                                    <span>Багц</span>
                                    <h3>{bundle.title}</h3>
                                    <p>{bundle.description}</p>
                                </div>
                            </div>
                            <div className="price">
                                <div style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start'
                                }}>
                                    {
                                        bundle.sale > 0 ?
                                            <React.Fragment>
                                                <span style={{fontSize: 18, color: '#909090', display: 'block', fontWeight: 600 , textDecoration: 'line-through', marginRight: 15}}>{config.formatMoney(bundle.price)}₮</span>
                                                <span style={{fontSize: 24, color: '#000000', display: 'block', fontWeight: 700}}>{config.formatMoney(bundle.sale)}₮</span>
                                            </React.Fragment>
                                            :
                                            <span style={{fontSize: 24, color: '#000000', display: 'block', fontWeight: 700}}>{config.formatMoney(bundle.price)}₮</span>
                                    }
                                    <Button
                                        disabled={addingToCard || removingFromCard}
                                        variant="primary"
                                        onClick={this.cardAction.bind(this)}
                                    >
                                        {
                                            addingToCard || removingFromCard ?
                                                <Spinner variant={'light'} animation={'border'} size={'sm'}/>
                                                :
                                                <ion-icon name={hadInCard ? "trash-outline" : "cart-outline"}/>
                                        } {hadInCard ? "Сагснаас хасах" : "Сагслах"}
                                    </Button>
                                </div>
                                <p>Доорхи хичээлүүд бүгд багтсан үнэ болно.</p>
                            </div>
                            <div className="bundle-levels">
                                {
                                    (bundle.levels || []).map((item, index) => (
                                        <div className="bundle-item" key={index}>
                                            <h4>
                                                {item.title}
                                                <ion-icon name="chevron-down"/>
                                            </h4>
                                            <p>{bundle.description}</p>
                                            <div className="bundle-body">
                                                <Row>
                                                    {
                                                        (item.lessons || []).map((lesson, ind) => (
                                                            <Col key={ind} md={3} style={{marginBottom: 30}}>
                                                                <GridItem item={lesson}/>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Container>
                    </Loader>
                </div>
                <Footer/>
            </React.Fragment>
        );
    }
}

export default  connect(reducer)(Bundle);