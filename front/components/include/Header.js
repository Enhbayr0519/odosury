import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Col, Row } from 'react-bootstrap';
const reducer = ({ main }) => ({ main });

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false,
            trans: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        if(window.scrollY > 100 && !this.state.trans) {
            this.setState({trans: true})
        } else if(window.scrollY < 100 && this.state.trans) {
            this.setState({trans: false})
        }
    }

    render() {
        console.log(this.state.trans)
        return (
            <div>
                <div className={`header ${this.state.trans ? 'trans' : ''}`}>
                    <Container>
                        <Row className="header-top">
                            <Col md={6} className="section-1">
                                <div className="logo" style={{display: 'inline-block'}}>
                                    <img src="/images/logo.png" alt=""/>
                                </div>
                                <div className="category-menu" style={{display: 'inline-block'}}>
                                    <Button>
                                        <span>Ангилал</span>
                                        <ion-icon name="caret-down-outline"/>
                                    </Button>
                                    <ul style={{display: 'none'}}>
                                        <Link to={'#'}>
                                            <li>
                                                3D + Animation
                                            </li>
                                        </Link>
                                        <Link to={'#'}>
                                            <li>
                                                3D + Animation
                                            </li>
                                        </Link>
                                        <Link to={'#'}>
                                            <li>
                                                3D + Animation
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={6} className="section-2">
                                <div className="section-1-1">
                                    <input style={{width: '100%'}} placeholder="Хичээл хайх ..."/>
                                    <ion-icon name="search-outline"/>
                                </div>
                                <div>
                                    {/*<ion-icon name="person-circle-outline"/>*/}
                                    <span style={{
                                        width: 158,
                                        display: 'block',
                                        fontSize: 12,
                                        color: '#fff',
                                        padding: '6px 0px 6px 15px',
                                        marginRight: -25,
                                        marginLeft: 15,
                                        cursor: 'pointer'
                                    }}>
                                        Нэвтрэх / Бүртгүүлэх
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="header-bottom">
                    <Container>
                        <div className="section-1">
                            <div className="header-menu">
                                <ul>
                                    <li>
                                        <Link to={'#'}>
                                            Premium хэргэлэгч
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="section-2">
                            <div className="header-menu">
                                <ul>
                                    <li>
                                        <Link to={'#'}>
                                            Багцууд
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'#'}>
                                            Хичээлүүд
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'#'}>
                                            Заавар
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'#'}>
                                            Холбоо барих
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default  connect(reducer)(Header);