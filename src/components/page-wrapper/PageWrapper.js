import React, {Component} from 'react';
import {Layout} from 'antd';
import PropTypes from 'prop-types';
import Header from './header/Header';
import history from '../../utils/history';
import './page-wrapper.scss';
import {NavLink} from 'react-router-dom';
const {Footer, Content} = Layout;

const ContextType = {
    history: PropTypes.object.isRequired,
};


export default class PageWrapper extends Component {

    static childContextTypes = ContextType;

    getChildContext() {
        return {
            history: history,
        };
    }

    render() {
        return (
            <div className="page-wrapper">
                <Header />
                <Content>
                    {this.props.children}
                </Content>
                <Footer>
                    <div className="footer-menu">
                        <a href='FAQ.html'>FAQ</a>
                        <a href="/faq/">Terms & Condition</a>
                        <NavLink to='/faq/'>About Us</NavLink>
                        <a>Pivacy Policy</a>
                        <a href='#/contact-us/'>Contact Us</a>
                    </div>
                </Footer>
            </div>
        );
    }
}
