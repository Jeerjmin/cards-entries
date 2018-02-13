import React, { Component } from 'react';

import './Entry.scss';



export default class Entry extends Component {
	constructor(props) {
	super(props);

	this.state = {
    id: this.props.id,
	};

  this.delete = this.delete.bind(this)
	this.edit = this.edit.bind(this);
	this._handleKeyPress = this._handleKeyPress.bind(this);
	this.blur = this.blur.bind(this);
	this.addNameCard=this.addNameCard.bind(this);
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

addNameCard(e) {
	this.setState({
		name: e.target.value
	})
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
								 value={this.state.value}
								 onKeyPress={this._handleKeyPress}
								 onChange={this.addNameCard}
								 placeholder="Give name to card"
								 readOnly=""
								 onBlur={this.blur}
					>
					</input>
				</div>

        <div className='deleteEntryGrid' >
					<img src={editEntry} onClick={this.edit} id={this.state.id} alt="delete" className="deleteMe"/>
          <img src={deleteEntry} onClick={this.delete} id={this.state.id} alt="delete" className="deleteMe"/>
        </div>

			</div>
		);
	}
}
