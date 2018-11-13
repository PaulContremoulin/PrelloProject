import React from 'react';

// Components & Actions

// Css
import { Container, Row, Col, Input, Card, CardText, CardTitle, CardBody, CardFooter, Button } from 'reactstrap';
import Octicon from 'react-octicon';
import './Comment.css';


export class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputComment: false,
    }
  }

  handleOnBlurComment = () => {

  }

  toggleCommentInput = () => {
    this.setState({ inputComment: true })
  }

  render() {
    const {
      comment,
     } = this.props;
     const { inputComment } = this.state;
    return(
      <div className="Comment">
        <Row>
          <Card className="CommentCard">
            <CardTitle className="CommentTitle">
              {comment.idAuthor}
            </CardTitle>
            <CardBody>
              {comment.text}
            </CardBody>
          </Card>
        </Row>
      </div>
    )
  }
}
