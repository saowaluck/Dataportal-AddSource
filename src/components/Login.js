import React, { Component } from 'react'
class Login extends Component {
  render() {
    return (
      <div>
       <form method='get' action="https://auth.login-with.com/google/">
        <input type="submit" />
       </form>
      </div>
    );
  }
}
export default Login