import React from 'react';

// Components & Actions

// Css
import { Row, Button, Form, Input } from 'reactstrap';
import {postCommentToCard} from "../../../../../../requests/comments";
import Octicon from 'react-octicon';
import './AddComment.css'

export class AddComment extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        commentText: "",
        addComment: false,
      }
  }

  handleSubmit = ( event ) => {
    event.preventDefault();
    const commentText = this.state.commentText;
    if (commentText !== "") {

        postCommentToCard(this.cardId, commentText)
            .then()
        this.props.addComment(commentText);
        this.setState({ commentText: "" })
        this.toggleAddComment();
    }
  }

  handleChange = async (event) => {
      const value = event.target.value;
      this.setState({
          commentText: value,
      });
  };

  toggleAddComment = () => { this.setState({ addComment: !this.state.addComment }) }


  render() {
    const { addComment } = this.props;
    return (
      <Row>
        {(this.state.addComment) ?
          <Form className="form" onSubmit={this.handleSubmit}>
          <Input
          type="text"
          name="commentText"
          placeholder="Comment text"
          required={true}
          onChange={(e) => this.handleChange(e)}
          />
          <Button color="success">Add comment</Button>
          <Button outline color="secondary" type="button" onClick={ () => this.toggleAddComment() }><Octicon name="x"/></Button>
          </Form>
          :
          <Button onClick={ () => this.toggleAddComment() }>Add comment</Button>
        }
      </Row>
    )
  }
}
