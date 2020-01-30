import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <div className="footer">
    <div className="container">

      <Link to="/faq">Vanliga frågor</Link>
      <Link to="/contact">Kontakt</Link>

    </div>
  </div>
)

export default Footer;
