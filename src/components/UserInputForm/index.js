import {Component} from 'react'

import './index.css'

class UserInputForm extends Component {
  state = {
    username: '',
    email: '',
    company: '',
    message: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangeCompany = event => {
    this.setState({company: event.target.value})
  }

  onChangeMessage = event => {
    this.setState({message: event.target.value})
  }

onSubmitSuccess = async userDetails => {
  try {
    const response = await fetch('http://localhost:5678/webhook/submit-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    })

    const text = await response.text()  // <- safer read as text
    console.log('Webhook Response:', text)
  } catch (error) {
    console.error('Failed to send lead:', error)
  }
}


  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, email, company, message} = this.state
    const userDetails = {username, email, company, message}
    const isValidEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
    }
    if (!isValidEmail(email)) {
        this.setState({errorMsg: 'Please enter a valid email address', showSubmitError: true})
    return
    }else{
        this.setState({showSubmitError: false, errorMsg: ''})
        if(username !== ''){
            this.onSubmitSuccess(userDetails)
        }else{
            this.setState({errorMsg: 'Username cannot be empty', showSubmitError: true})
        }
    }
    
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="password-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Enter Email"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Enter Username"
        />
      </>
    )
  }

  renderCompanyField = () => {
    const {company} = this.state

    return (
      <>
        <label className="input-label" htmlFor="company">
          COMPANY
        </label>
        <input
          type="text"
          id="company"
          className="username-input-field"
          value={company}
          onChange={this.onChangeCompany}
          placeholder="Enter Company Name"
        />
      </>
    )
  }

  renderMessageField = () => {
    const {message} = this.state

    return (
      <>
        <label className="input-label" htmlFor="message">
          MESSAGE
        </label>
        <input
          type="text"
          id="message"
          className="username-input-field"
          value={message}
          onChange={this.onChangeMessage}
          placeholder="Enter Message"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="login-heading">Put Your Details</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderCompanyField()}</div>
          <div className="input-container">{this.renderMessageField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default UserInputForm