import React from 'react';
import footer from '../../assets/images/footer.png'

const Footer = () => {
    return (
        <footer className=" px-10 py-14" style={{backgroundImage: `url(${footer})`,  backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}
        >
  <div className="footer p-10 ">
  <div>
    <span className="footer-title">SERVICES</span> 
    <a className="link link-hover">Emergency Checkup</a>
    <a className="link link-hover">Monthly Checkup</a>
    <a className="link link-hover">Weekly Checkup</a>
    <a className="link link-hover">Deep Checkup</a>
  </div> 
  <div>
    <span className="footer-title">ORAL HEALTH</span> 
    <a className="link link-hover">Fluoride Treatment</a>
    <a className="link link-hover">Cavity Filling</a>
    <a className="link link-hover">Teath Whitening</a>
  </div> 
  <div>
    <span className="footer-title">OUR ADDRESS</span> 
    <a className="link link-hover">New York - 101010 Hudson</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </div>
  </div>
  <div>
    <p className='text-center'>Copyright 2022 All Rights Reserved</p>
  </div>
</footer>
    );
};

export default Footer;