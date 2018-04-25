import React from 'react'
import PropTypes from 'prop-types'
import GoogleButton from 'react-google-button'
import logo from './../assets/images/logo-mark.png'

const Login = ({ auth }) => (
  <div className='ui centered grid'>
    <div className='center aligned column row'>
      <div className='ui card'>
        <div className='content'>
          <div className='ui center aligned header'>
            <h1>
              <img className='ui mini image' src={logo} alt='' />
              Dataportal
            </h1>
          </div>
          <div className='meta' />
          <div className='center aligned description'>
            <GoogleButton onClick={auth.login} />
          </div>
        </div>
        <div className='extra content'>
          <div className='center aligned author'>
            Powered by Pronto
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
      body > .grid {
        height: 100%;
      }
      .ui.grid>.row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        min-height: 100vh;      
      }
      .ui.card {
        background-color: white;
        min-height: 200px;
        min-width: 250px;
        margin: 0 auto;
        border-radius: 11px 11px 11px 11px;
        -moz-border-radius: 11px 11px 11px 11px;
        -webkit-border-radius: 11px 11px 11px 11px;
        border: 0px solid #000000;
        -webkit-box-shadow: 0px -1px 8px 0px #858585;
        -moz-box-shadow: 0px -1px 8px 0px #858585;
        box-shadow: 0px -1px 8px 0px #858585; }
      }
      img {
        padding-top: 50px;
        width: 250px; 
      }
      
    `}
    </style>
  </div>
)

Login.propTypes = {
  auth: PropTypes.func.isRequired,
}

export default Login
