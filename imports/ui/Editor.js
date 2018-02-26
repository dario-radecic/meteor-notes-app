import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";
import { createContainer } from "meteor/react-meteor-data";
import { Session } from "meteor/session";
import { Notes } from "../api/notes";
import { browserHistory } from "react-router";

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }


  handleBodyChange(e) {
    this.setState({ body: e.target.value });
    this.props.call("notes.update", this.props.note._id, {
      body: e.target.value
    });
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
    this.props.call("notes.update", this.props.note._id, {
      title: e.target.value
    });
  }

  handleRemoval() {
    this.props.call("notes.remove", this.props.note._id);
    this.props.browserHistory.push("/dashboard");
  }

  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
    if (currentNoteId && currentNoteId !== prevNoteId) {
      this.setState({ title: this.props.note.title, body: this.props.note.body });
    }
  }

  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Note title" onChange={this.handleTitleChange.bind(this)} />
          <textarea className="editor__body" value={this.state.body} placeholder="Your Note Here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Note</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">{this.props.selectedNoteId ? "Note not found" : "Pick or create a note to get started."}</p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get("selectedNoteId");
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);