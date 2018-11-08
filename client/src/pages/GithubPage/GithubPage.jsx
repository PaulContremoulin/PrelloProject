// Modules
import React from 'react';
import ReactLoading from 'react-loading';
import { Container, Row, Col, Button } from 'reactstrap';

import { history } from '../../history';

// constants and actions
import {setLogin} from "../../actions/signActions";
import {NavBar} from "../../components/NavBar/NavBar";

// Css...
import "./GithubPage.css"

// Requests
import { githubAuth } from "../../requests/githubAuth";
import {connect} from "react-redux";

export class GithubPageToBeConnected extends React.Component  {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      const code = this.props.location.search.split("?code=")[1];
      githubAuth(code)
          .then(res => {
              if (res.status === 200) {
                  this.props.setLogin(res.data);
                  history.push('/home');
              } else {
                  history.push('login');
              }
          })
          .catch(res => {
              history.push('login');
          })
    }

    render() {
      return (
        <div className="GithubPage">
              <div>
                  <ReactLoading className="load" type={"spinningBubbles"} color={"#1a1a1a"} height={'5%'} width={'5%'} />
              </div>
        </div>
      )
    }

}

const mapStateToProps = (state, props) => ({});
const mapDispatchToProps = (dispatch) => ({
    setLogin: (res) => dispatch( setLogin(res)),
});

export const GithubPage = connect(
    mapStateToProps,
    mapDispatchToProps
)( GithubPageToBeConnected )
