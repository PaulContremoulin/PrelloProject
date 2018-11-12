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
                <Col className="menu" xs={6} sm={5} md={3} xl={2}>
                    <MenuHome/>
                </Col>
                <Col xs={6} sm={7} md={9} xl={10}>
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
        this.setState({isGood: !(circleFind.length === 0)})
    }

    componentDidUpdate() {
        const circleFind = this.props.circles.filter(circle => (circle._id === this.props.idCircle) && (circle.name === this.props.nameCircle))
        if (this.state.isGood !== !(circleFind.length === 0)) {
            this.setState({isGood: !this.state.isGood});
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