// Modules
import React from 'react';
import {MenuHome} from "../../components/MenuHome/MenuHome";

// Css...
import {Row, Col, Alert} from 'reactstrap';
import {ContentCircle} from "../../components/ContentCircle/ContentCircle";
import './CirclePage.css';
import {connect} from "react-redux";

// Actions & Constant

export class CirclePageToBeConnected extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isGood: true,
        }
    }

    render() {
        return (
            <div className="home">
                <Col className="menu" xs={5} sm={3}>
                    <MenuHome/>
                </Col>
                <Col xs={7} sm={9}>
                    {this.state.isGood ?
                        <ContentCircle/>
                        :
                        <Alert color="danger">
                            You don't have permission to access on this circle
                        </Alert>
                    }
                </Col>
            </div>
        )
    }

    componentDidMount() {
        const circleFind = this.props.circles.filter(circle => (circle._id === this.props.idCircle) && (circle.name === this.props.nameCircle))
        console.log(circleFind)
        if (circleFind.length === 0) {
            this.setState({isGood:false})
        } else {
            this.setState({isGood:true})
        }
    }
}

const mapStateToProps = (state, props) => ({
    circles: state.circles,
});
const mapDispatchToProps = (dispatch) => ({});

export const CirclePage = connect(
    mapStateToProps,
    mapDispatchToProps
)( CirclePageToBeConnected )