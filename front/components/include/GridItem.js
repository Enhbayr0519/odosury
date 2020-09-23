import React, { Component } from "react";
import { connect } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
const reducer = ({ main }) => ({ main });

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showNotf: false
        }
    }

    render() {
        const {main: {user}, item, watching} = this.props;
        let lectures = (item.levels || []).reduce(function (subTotal, level) {
            return subTotal + (level.programs || []).length
        }, 0);
        let hours = (item.levels || []).reduce(function (subTotal, level) {
            return subTotal + (level.programs || []).reduce((total, program) => (total + ((program || {}).timeline || {}).minutes || 0), 0)
        }, 0) / 60;
        let hoursText = 'Цаг';
        let progress = 0;
        if(watching) {
            item.progress.map(function (item) {
                if(item.user.toString() === user._id.toString()) {
                    progress = item.progress || 0
                }
            })
        }
        let rating = 0;
        if((item.rating || []).length > 0) {
            rating = item.rating.reduce((total, rate) => (total + rate.rate), 0) / item.rating.length
        }
        if(hours < 1 && hours !== 0) {
            hours = hours * 60;
            hoursText = 'Минут';
        } else if(hours === 0) {
            hoursText = false;
        }
        return (
            <div className={`grid-item ${watching ? 'watching' : ''}`}>
                <div title={item.title}>
                    <div className="grid-item-box">
                        <img src="http://demo.foxthemes.net/courseplusv3.3/assets/images/course/p-1.png" alt=""/>
                            <div className="contents">
                                <Link to={`/lesson/${item.slug}`} title={item.title}>
                                    <h3>{item.title}</h3>
                                </Link>
                                {
                                    watching ? (
                                        <div className="progressbar">
                                            <div className="filler" style={{width:`${progress}%`}}/>
                                        </div>
                                    ) : (
                                        <div>
                                            <Link className="teacher" to={`/teacher/${item.slug}`} title={`${(item.teacher || {}).last_name} ${(item.teacher || {}).first_name}`}>
                                                {((item.teacher || {}).last_name || '').slice(0, 1)}. {(item.teacher || {}).first_name}
                                            </Link>
                                            <div style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                                <ReactStars
                                                    count={5}
                                                    value={rating}
                                                    edit={false}
                                                    size={18}
                                                />
                                                <span style={{fontSize: 12, color: '#909090', marginLeft: 5}}>({(item.rating || []).length})</span>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                watching ? null : (
                                    <div className="footer">
                                        <h5><ion-icon name="library"/> {lectures} Хичээл </h5>
                                        <div>
                                            {
                                                hoursText ? (
                                                    <h5>
                                                        <ion-icon name="time"/>
                                                        {Math.ceil(hours)} {hoursText}
                                                    </h5>
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                )
                            }
                    </div>
                </div>
            </div>
        );
    }
}

export default  connect(reducer)(Header);