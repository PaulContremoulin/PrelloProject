// Modules
import React from 'react';
import ReactLoading from 'react-loading';
import { history } from '../../history';
import {connect} from "react-redux";

// Css...
import "./GithubPage.css"

// constants and actions
import {setLogin} from "../../actions/signActions";
import { githubAuth } from "../../requests/githubAuth";


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
