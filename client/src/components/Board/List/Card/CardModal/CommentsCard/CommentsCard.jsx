import React from "react";
import {Col, Input, Row, Button, Form} from "reactstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/fontawesome-free-regular';

import './CommentsCard.css';
import {postCommentToCard} from "../../../../../../requests/comments";
import {Comment} from "./Comment/Comment";

export class CommentsCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value : ''
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        });
    };

    sendComment(textComment) {
        if (textComment !== "") {
            postCommentToCard(textComment, this.props.cardId)
                .then( (res) => {
                    this.props.addComment(res.data)
                });
            this.setState({value : ''});
        }
    }

    render() {
        const {
            comments,
        } = this.props;
        return (
            <Col>
                <Row>
                    <Col xs="1"><FontAwesomeIcon className='hidden-sm-down' icon={faComments}/></Col>
                    <Col xs="11">
                        <h5>Comments</h5>
                        {(comments.length > 0) ?
                            comments.map((comment, index) =>
                                <Comment
                                    comment={comment}
                                />
                            )
                        : null}
                        <Form onSubmit={ (e) => { e.preventDefault(); this.sendComment(e.target.textComment.value)}}>
                            <Input
                                style={{"margin-top":"8px"}}
                                type="textarea"
                                name="textComment"
                                value={this.state.value}
                                placeholder="Write your message..."
                                onChange={ (e) => this.handleChange(e)}
                            />
                            <Button className="float-right  descButton" type="submit" value="Submit" color="primary" size="sm">Send</Button>
                        </Form>
                    </Col>
                </Row>
            </Col>
        );
    }

}