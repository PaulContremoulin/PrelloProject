import React from 'react';
import { connect } from 'react-redux';

// Components & Actions
// import {List} from '../../components/List/List';

// Css
import { Container, Row, Col } from 'reactstrap';

export const BoardToBeConnected = ({ board }) => (
    <div className="Board">
      <Row>
      {
        board.lists.map( list => (
          <Col md="4">
            // <List listId={list.listId} />
          </Col>
        ) )
      }
      </Row>
    </div>
)

const mapStateToProps = ( state, props ) => ({
  // board: state.board
})

const mapDispatchToProps = ( dispatch ) => ({})

export const Board = connect(
  mapStateToProps,
  mapDispatchToProps,
)( BoardToBeConnected );
