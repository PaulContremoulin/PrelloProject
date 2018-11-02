// Modules
import React from 'react';
import ReactLoading from 'react-loading';
import { Container, Row, Col } from 'reactstrap';

import history from '../../history';

// constants and actions
import {setLogin} from "../../actions/signActions";

// Css...
import "./GithubPage.css"

// Requests
import { githubAuth } from "../../requests/githubAuth";

export default class GithubPage extends React.Component  {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
      const code = this.props.location.search.split("?code=")[1];
      githubAuth(code)
      .then(res => ( res.status < 400 ) ? setLogin(res.data.member) : Promise.reject("Error") )
      .then( () => history.push('/home') )
      .catch( err => console.log(err) || history.push('/') )
    }

    render() {
      return (
        <div className="GithubPage">
          <Row>
            <Col>
              <ReactLoading type={"spinningBubbles"} color={"#1a1a1a"} height={'5%'} width={'50%'} />
            </Col>
          </Row>
        </div>
      )
    }

}
