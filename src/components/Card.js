import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import Entry from './Entry'
import './Card.scss';



const cardDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updatePosition(draggedId, props.id);
    }
};

let collectDrop = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};


const cardDragSpec = {
    beginDrag(props) {
        return {
            id: props.id
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

class Card extends Component {
	constructor(props) {
	super(props);

	this.state = {
		id: this.props.id,
		entry: this.props.entries,
		name: this.props.name
	};
	this.addNameCard = this.addNameCard.bind(this);
	this.delete = this.delete.bind(this);
	this.edit = this.edit.bind(this);
	this.addEntry = this.addEntry.bind(this);
	this.deleteEntry = this.deleteEntry.bind(this);
	this._handleKeyPress = this._handleKeyPress.bind(this);
	this.blur = this.blur.bind(this);
}




delete(e) {
	this.props.handleDelete(e.target.id);
}



addEntry() {

	var newEntries=this.state.entry;
	var newEntry = {
		idEntry: Math.random().toString(36).substring(7),
		entry: ''
	};
	newEntries.push(newEntry);
	localStorage.setItem('entry', JSON.stringify(newEntries));
	this.setState((prevState) => ({
		entry: newEntries,
	}));



}

deleteEntry(id) {
	var entry = this.state.entry;
	for (var i = 0; i < entry.length; i++) {
		if (entry[i].id === id) {
			entry.splice(i,1);
			break;
		}
	}
	localStorage.setItem('entry', JSON.stringify(entry));
	this.setState((prevState) => ({
		entry: entry
	}));
}

blur(e) {
	e.target.readOnly="readOnly"
}

edit(e) {
		this.textInput.readOnly=""
		this.textInput.focus()
}



_handleKeyPress(e) {
	if (e.key === 'Enter') {
      this.textInput.readOnly="readOnly"
    }
}



addNameCard(e) {

	this.setState({
		name: this.textInput.value,
		id: this.state.id
	});

	this.props.editCardName(this.textInput.value,this.state.id);

}



	render() {
		  const { connectDragSource, connectDropTarget } = this.props;

		const deleteCard = require('../assets/images/deleteIcon.png');
		const editTitle = require('../assets/images/edit.png');
		const { Title, Description, id, view }=this.props;

		const entryData = this.state.entry.map((item) => {
			return (
				<div key={item.id}>
					<Entry
						idEntry={item.idEntry}
						idCard={this.state.id}
						entry={item.entry}
						handleDelete={this.deleteEntry}
						editEntryName={this.props.editEntryName}

				 />
				</div>
	);
});

		return connectDropTarget(connectDragSource(
			<div className='wrapper'>
        <div className= 'hidden' onClick={this.delete}>
          <img src={deleteCard} id={id} alt="delete" />
        </div>
        <div className='card'>
          <div className='cardGridImageWrapper'>
            <div className='deleteCardGrid' >
							<img src={editTitle} id= {id} onClick={this.edit} alt="edit" className="deleteMe" />
              <img src={deleteCard} id={id} onClick={this.delete} alt="delete" className="deleteMe" />
            </div>

          </div>
  				<div className='cardDetails' >
						{this.state.id}
						<input
									 className="input-card"
									 ref={(input) => { this.textInput = input; }}
									 value={this.state.name}
									 onKeyPress={this._handleKeyPress}
							 		 onChange={this.addNameCard}
									 placeholder="Give name to card"
									 readOnly=""
									 onBlur={this.blur}
						>
						</input>

						<button onClick={this.addEntry}>Добавить запись...</button>
						{entryData}
          </div>
        </div>
			</div>
		));
	}
}

const dragHighOrderCard = DragSource('card', cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget('card', cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard
