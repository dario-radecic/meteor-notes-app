import React, { Component } from 'react';
import { Meteor } from "meteor/meteor";
import { Session } from "meteor/session";
import { createContainer } from "meteor/react-meteor-data";


export const NoteListHeader = (props) => {
  return (
    <div>
      <button onClick={() => {
        props.meteorCall("notes.insert", (err, res) => {
          if (res) {
            props.Session.set("selectedNoteId", res);
          }
        });
      }}>Add Note</button>
    </div>
  );
};

NoteListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, NoteListHeader);