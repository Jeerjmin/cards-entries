import React, { Component } from 'react';

import './Entry.scss';



export default class Entry extends Component {
	constructor(props) {
	super(props);

	this.state = {
    idEntry: this.props.idEntry,
		entry: this.props.entry
	};

  this.delete = this.delete.bind(this)
	this.edit = this.edit.bind(this);
	this._handleKeyPress = this._handleKeyPress.bind(this);
	this.blur = this.blur.bind(this);
	this.addEntry=this.addEntry.bind(this);
}
delete(e) {
  	this.props.handleDelete(e.target.id);
}

blur(e) {
	e.target.readOnly="readOnly"
}

edit(e) {
		this.textInput.readOnly=""
		this.textInput.focus()
}

addEntry(e) {
	this.setState({
		entry: e.target.value
	})
	this.props.editEntryName(e.target.value,this.props.idCard,this.state.idEntry)
}

_handleKeyPress(e) {
	if (e.key === 'Enter') {
      this.textInput.readOnly="readOnly"
    }
}

componentDidMount() {
	this.textInput.focus()
}



	render() {
    const deleteEntry = require('../assets/images/deleteIcon.png');
		const editEntry = require('../assets/images/edit.png');

		return (
			<div className='wrapper-entry'>
				<div className='content'>

					<input className ='input-entry'
								 ref={(input) => { this.textInput = input; }}
								 value={this.state.entry}
								 onKeyPress={this._handleKeyPress}
								 onChange={this.addEntry}
								 placeholder="Add entry"
								 readOnly=""
								 onBlur={this.blur}
					>

					</input>
							{this.state.idEntry}
				</div>

        <div className='deleteEntryGrid' >
					<img src={editEntry} onClick={this.edit} id={this.state.idEntry} alt="delete" className="deleteMe"/>
          <img src={deleteEntry} onClick={this.delete} id={this.state.idEntry} alt="delete" className="deleteMe"/>
        </div>

			</div>
		);
	}
}
