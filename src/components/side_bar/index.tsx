import React from 'react';
import './style.scss';
import { Scrollbars } from 'react-custom-scrollbars';
import { LogoSVG, User, Message, Group, Contact, Settings, Logout } from '../../assets/SVGIcons';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


class SideBar extends React.Component {

   constructor(props: any) {
      super(props);
      this.NavItem = this.NavItem.bind(this);
      this.DarkThemeIcon = this.DarkThemeIcon.bind(this);
      this.LightThemeIcon = this.LightThemeIcon.bind(this);
   }

   state = {
      activeNavItem: 'profile',
      isLightTheme: true
   }

   SVGThemeIconsAnimate = {
      init: {
         opacity: 0,
         rotate: -150
      },
      animate: {
         opacity: 1,
         rotate: 0
      },
      exit: {
         opacity: 1,
         rotate: 150
      },
      transition: { 
         duration: 0.05,
         mass: 1.6,
         type: 'spring'
      }
   }

   ToggleThemeEvent() {
      this.setState((state: any) => ({
         ...state,
         isLightTheme: !state.isLightTheme
      }))
   }

   CustomScrollbar({ children }: any) {
      const style: any = {
         height: '100%',
         display: 'flex',
         width: '100%',
         flexDirection: 'column'
      };

      return(
         <Scrollbars autoHide hideTracksWhenNotNeeded>
            <div style={ style }>
               { children }
            </div>
         </Scrollbars>
      );
   }

   LogoImg() {
      return(
         <div className="logo">
            <Link to="/chat" className="logo-link">
               <LogoSVG />
            </Link>
         </div>
      );
   }

   NavItem({ id, Icon }: any) {
      const Active = this.state.activeNavItem === id? ' active': ''
      const ClassName = `nav-item${ Active }`

      const OnClick = () => {
         this.setState(state => ({
            ...state,
            activeNavItem: id
         }))
      }

      return(
         <div className={ ClassName } onClick={ OnClick }>
            <Icon />
         </div>
      );
   }

   DarkThemeIcon() {
      return(
         <svg viewBox="0 0 24 24">
            <motion.path variants={ this.SVGThemeIconsAnimate } initial="init" animate="animate" exit="exit" transition={ this.SVGThemeIconsAnimate.transition } d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"/>
         </svg>
      );
   }

   LightThemeIcon() {
      return(
         <svg viewBox="0 0 24 24">
            <motion.path variants={ this.SVGThemeIconsAnimate } initial="init" animate="animate" exit="exit" transition={ this.SVGThemeIconsAnimate.transition } d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
         </svg>
      );
   }

   UserPicture() {
      return(
         <div className="user-pic" tabIndex={10}>
            <img src="http://chatvia-light.react.themesbrand.com/static/media/avatar-1.67e2b9d7.jpg" alt="user_picture"/>
         </div>
      )
   }

   DropDown() {
      return(
         <div className="drop-down" tabIndex={10}>
            <div className="item">
               <Logout />
               Logout
            </div>
         </div>
      );
   }

   render() {
      return(
         <div className="side-bar">
            <this.CustomScrollbar>
               <this.LogoImg />
               <div className="nav">
                  <this.NavItem id="profile" Icon={ User } />
                  <this.NavItem id="message" Icon={ Message } />
                  <this.NavItem id="group" Icon={ Group } />
                  <this.NavItem id="contact" Icon={ Contact } />
                  <this.NavItem id="settings" Icon={ Settings } />
               </div>
               <div className="toggle-theme" onClick={ this.ToggleThemeEvent.bind(this) }>
                  <AnimatePresence exitBeforeEnter initial={ false }>
                     {
                        this.state.isLightTheme
                           ? <this.LightThemeIcon /> 
                           : <this.DarkThemeIcon />
                     }
                  </AnimatePresence>
               </div>
               <this.UserPicture />
            </this.CustomScrollbar>
            <this.DropDown />
         </div>
      );
   }
}

export default SideBar;
