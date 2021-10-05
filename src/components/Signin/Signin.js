import React, { Component } from 'react';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            loginSuccess: true
        }
    }

    onEmailChange = (e) => {
        this.setState({ signInEmail: e.target.value });
    }

    onPasswordChange = (e) => {
        this.setState({ signInPassword: e.target.value });
    }

    onSubmitSignIn = () => {
        fetch(`http://${ process.env.REACT_APP_API }/signin`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': this.state.signInEmail,
                'password': this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    this.setState({ loginSuccess: false });
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--white-10 mv7 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 normal fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className="pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    value={this.state.signInEmail}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset white ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={this.state.signInPassword}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 white input-reset ba b--white bg-transparent grow pointer f4 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn} />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f4 link dim white db pointer" onClick={() => onRouteChange('Register')}>Register</p>
                        </div>
                        {
                            !this.state.loginSuccess ?
                            <div>
                                <p className='red f4 b'>Username or password is incorrect!</p>
                            </div> :
                            <div></div>
                        }
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;