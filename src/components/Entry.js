import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import './Entry.scss';
const deleteEntry = require('../assets/images/deleteIcon.png');
const editEntry = require('../assets/images/edit.png');

const entryDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().idEntry;
        props.updateEntryPosition(draggedId, props.idEntry);
    }
};

let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};


const entryDragSpec = {
    beginDrag(props) {
        return {
            idEntry: props.idEntry
        };
    }
};

let collectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    };
}

class Entry extends Component {
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
  	this.props.handleDelete(this.state.idEntry);

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

}



	render() {
		const { connectDragSource, connectDropTarget } = this.props;

		return connectDropTarget(connectDragSource(
			<div className='wrapper-entry'>
				<div className='content'>

					<input className ='input-entry'
								 ref={(input) => { this.textInput = input; }}
								 value={this.state.entry}
								 onKeyPress={this._handleKeyPress}
								 onChange={this.addEntry}
								 placeholder="Enter text..."
								 readOnly=""
								 onBlur={this.blur}
					>

					</input>
				</div>

        <div className='deleteEntryGrid' >
					<img src={editEntry} onClick={this.edit} title="Edit entry" id={this.state.idEntry} alt="delete" className="editMe-entry"/>
          <img src={deleteEntry} onClick={this.delete} title="Delete entry" id={this.state.idEntry} alt="delete" className="deleteMe-entry"/>
        </div>

			</div>
		));
	}
}

const dragHighOrderEntry = DragSource('entry',entryDragSpec, collectDrag)(Entry);
const dragDropHighOrderEntry = DropTarget('entry',entryDropSpec, collectDrop)(dragHighOrderEntry);
export default dragDropHighOrderEntry
