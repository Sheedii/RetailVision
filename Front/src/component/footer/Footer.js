// Footer.js
import React from 'react';
import "./Footer.css";
import { ReactComponent as Logo } from "../../assets/Logo2.svg";
import { ReactComponent as Facebook } from "../../assets/facebook.svg";
import { ReactComponent as Whatsapp } from "../../assets/wtsp.svg";
import { ReactComponent as Linkedin } from "../../assets/linkedin.svg";

const Footer = () => {


  return (
    <div className="appFooter">
      <div className='FooterHeader'>
        <div className='logoFooter'>
          <div className="logo-wise"><Logo /> </div>
          <div className="logoSlogan">Exceed your store's limits</div>
        </div>

        <div className="footerGroup90">
          <div className="customer-behaviour-footer">Customer Behaviour</div>
          <div className="affinity-testing-footer">Affinity testing</div>
          <div className="sales-forecasting-footer">Sales Forecasting</div>
        </div>





        <div className="footerSocialMedia">
          <div className="facebook"><Facebook /></div>
          <div className="whatsapp"><Whatsapp /></div>
          <div className="linkedin"><Linkedin /></div>
        </div>
      </div>

      <div className="line2footer"></div>
      <div className="footerCopyright">
        Copyright ©2024. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
