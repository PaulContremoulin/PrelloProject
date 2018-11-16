import React from "react";
import {Col, Input, Row, Button, Form} from "reactstrap";
import TimeAgo from 'react-timeago'
import enLang from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import './Comment.css';

export class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formatter : buildFormatter(enLang)
        }
    }

    render() {
        const {
            comment
        } = this.props;
        return (
            <Col className="oneComment">
                <div>
                    <div className="author">{comment.idAuthor.username},</div>
                    <div className="date"><TimeAgo date={comment.date} live={false} formatter={this.props.formatter}/></div>
                </div>
                <Row className="text">
                    {comment.text}
                </Row>
            </Col>
        );
    }

}