import React, {Component} from 'react';
import {Table, Icon, Divider, Row, Col, DatePicker} from 'antd';
import './contactus.scss';

export default class ContactUs extends Component {
    constructor() {
        super();
        
        this.state = {
        };
    }

    render() {
        return (
            <div className="user-admin-dashboard">
                <section id="about">
                    <div className="container text-center vertical-align">
                      <h3 className="text-uppercase"> A little <strong>about</strong> us</h3>
                      <hr/>
                     <h4>
                        <p>Cyber security seems to be a hot issue these days with all the recent news about online hackings and whatnots. However, todays functioning society revolves around the online infrastructure that is the world wide web.</p>
                     </h4> 
                    </div>
                </section>

                <section id="services" className="animated  fadeInLeft">
                    <div className="section-heading text-center " >
                      <h3 className="text-uppercase"> Our <strong>Services</strong></h3>
                      <hr className="icon"/>
                    </div>

                    <div className="container">
                    <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12 service-item">
                      <header>
                        <i className="fa fa-desktop"></i>
                          <div className="service-title">
                            <h3> Web Design</h3>
                            <h4>Lorem ipsum dolor sit.</h4>
                          </div>
                        
                      </header>
                         
                         <p>Cyber security seems to be a hot issue these days with all the recent news about online hackings and whatnots. </p>
                    </div>  

                    <div className="col-md-4 col-sm-6 col-xs-12 service-item">
                      <header>
                        <i className="fa fa-desktop"></i>
                          <div className="service-title">
                            <h3> Web Design</h3>
                            <h4>Lorem ipsum dolor sit.</h4>
                          </div>
                        
                      </header>
                         
                         <p>Cyber security seems to be a hot issue these days with all the recent news about online hackings and whatnots.</p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12 service-item">
                      <header>
                        <i className="fa fa-desktop"></i>
                          <div className="service-title">
                            <h3> Web Design</h3>
                            <h4>Lorem ipsum dolor sit.</h4>
                          </div>
                       
                      </header>
                         
                         <p>Cyber security seems to be a hot issue these days with all the recent news about online hackings and whatnots. </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12 service-item">
                      <header>
                        <i className="fa fa-desktop"></i>
                          <div className="service-title">
                            <h3> Web Design</h3>
                            <h4>Lorem ipsum dolor sit.</h4>
                          </div>
                        
                      </header>
                         
                         <p>Cyber security seems to be a hot issue these days with all the recent news about online hackings and whatnots. </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12 service-item">
                      <header>
                        <i className="fa fa-desktop"></i>
                          <div className="service-title">
                            <h3> Web Design</h3>
                            <h4>Lorem ipsum dolor sit.</h4>
                          </div>
                        
                      </header>
                         
                         <p>Cyber security seems to be a hot issue these days with all the recent news about online hackings and whatnots.</p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12 service-item">
                      <header>
                        <i className="fa fa-desktop"></i>
                          <div className="service-title">
                            <h3> Web Design</h3>
                            <h4>Lorem ipsum dolor sit.</h4>
                          </div>
                        
                      </header>
                         
                         <p>Cyber security seems to be a hot issue these days with all the recent news about online hackings and whatnots. </p>
                    </div>     
                    </div>
                    </div>

                  </section>


                  <section id="portfolio" className="animated  fadeInRight">

                    <div className="section-heading text-center">
                      <h3 className="text-uppercase"> Our <strong>Portfolio</strong></h3>
                      <hr className="icon" />
                    </div>

                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                          <div className="portfolio-thumb">
                            <img src="https://s-media-cache-ak0.pinimg.com/736x/99/40/6a/99406aca166cda8e50b7c1f2c2e1d1aa.jpg" className="img-responsive"/>
                            <div className="portfolio-overlay">
                              <h2 className="vertical-align">Project One</h2>
                              <a href=""> <i className="fa fa-search"></i> </a>
                            </div>
                          </div>
                        </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                          <div className="portfolio-thumb">
                            <img src="http://c.fastcompany.net/multisite_files/fastcompany/imagecache/1280/poster/2014/01/3025275-poster-p-brownlee.jpg" className="img-responsive"/>
                            <div className="portfolio-overlay">
                              <h2 className="vertical-align">Project One</h2>
                              <a href=""> <i className="fa fa-search"></i> </a>
                            </div>
                          </div>
                        </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                          <div className="portfolio-thumb">
                            <img src="http://c.fastcompany.net/multisite_files/fastcompany/imagecache/1280/poster/2014/01/3025363-poster-p-square-project-2.jpg" className="img-responsive"/>
                            <div className="portfolio-overlay">
                             <h2 className="vertical-align">Project One</h2>
                              <a href=""> <i className="fa fa-search"></i> </a>
                            </div>
                          </div>
                        </div>
                        <div className="container">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                          <div className="portfolio-thumb">
                            <img src="https://i.vimeocdn.com/video/473723067_1280.jpg" className="img-responsive"/>
                            <div className="portfolio-overlay">
                              <h2 className="vertical-align">Project One</h2>
                              <a href=""> <i className="fa fa-search"></i> </a>
                            </div>
                          </div>
                        </div>
                        <div className="container">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                          <div className="portfolio-thumb">
                            <img src="https://s-media-cache-ak0.pinimg.com/736x/99/40/6a/99406aca166cda8e50b7c1f2c2e1d1aa.jpg" className="img-responsive"/>
                            <div className="portfolio-overlay">
                             <h2 className="vertical-align">Project One</h2>
                              <a href=""> <i className="fa fa-search"></i> </a>
                            </div>
                          </div>
                        </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                          <div className="portfolio-thumb">
                            <img src="http://s3media.squarespace.com/domains/domains-3.jpg" className="img-responsive"/>
                            <div className="portfolio-overlay">
                              <h2 className="vertical-align">Project One</h2>
                              <a href=""> <i className="fa fa-search"></i> </a>
                            </div>
                          </div>
                        </div>

                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                  </section>
            </div>
        );
    }
}
