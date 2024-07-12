import React from 'react'
import ThreeDContainer from './Menu'
import Calendar from './MyCalendar'
import {Link} from 'react-router-dom'

const InfoBox = ({text, link, btnText}) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">{btnText}</Link>
    </div>
)

const renderContent = {
    1: (
    <h1 className="sm:text-xl sm:leading-snug rounded-lg font-poppins text-center bg-green-800 py-8 px-16 text-white mx-5">Our Story:
     <span className="font-bold"> Sip & Play!</span>
     <br/>
     Founder, Jonathan Li, shares a passion for board games, boba, and delicious food, 
     so he combined them all to become Sip & Play, Park Slope’s first board game cafe.  
     It is a straightforward concept, come in with your friends and family to play any board game from our library of 300+ games! 
     We hope when you visit, you also enjoy our coffee, espresso, boba, sandwiches, and snacks! ☕

     </h1>
    ),
     2: (
    <h1 className="sm:text-xl sm:leading-snug rounded-lg font-bold text-center bg-green-800 py-8 px-16 text-white mx-5">Menu:
    <br/>
    <ThreeDContainer/>
    </h1>
    ),
    3: (
    <Calendar/>
     ),
     4: (
    <h1 id="title" className="text-center">Sip & Play
    <br/>
    <span className="font-semibold">Address: 471 5th Ave, Brooklyn, NY 11215</span>
    <br/>
    Phone: (718) 971-1684
    </h1>
    
    ),
}

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo