import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Col, Row } from 'react-bootstrap';
const reducer = ({ main }) => ({ main });

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{backgroundColor: '#313356'}}>
                <Container>
                    <Row style={{alignItems: 'center', padding: '30px 0'}}>
                        <Col md={6} className="section-1">
                            <div className="logo" style={{display: 'inline-block'}}>
                                <img src="/images/logo.png" alt="" width={200}/>
                            </div>
                        </Col>
                        <Col md={6} className="section-2">
                            <div>
                            <span style={{
                                display: 'block',
                                fontSize: 12,
                                color: '#fff',
                                padding: '6px 0px 6px 15px',
                                fontWeight: 600,
                                width: '100%',
                                textAlign: 'right'
                            }}>
                                © 2020 All Rights Reserved.  Powered by Amjilt.com
                            </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default  connect(reducer)(Footer);