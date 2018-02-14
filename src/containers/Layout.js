import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from '../components/Card'
import './Layout.scss';



class Layout extends Component {
	render() {
		const { cards } = this.props;
		const cardsData = cards.map((card) => {
			return (
				<div  className="gritItem" key={card.id}>
					<Card id={card.id}
								handleDelete={this.props.handleDelete}
								name={card.name}
								entries={card.entries}
								editCardName={this.props.editCardName}
								editEntryName={this.props.editEntryName}
								updateCardPosition={this.props.updateCardPosition}
								updateEntryPosition={this.props.updateEntryPosition}
				 />
				</div>
	);
});
		return (
			<div className="gridWrapper">
        {cardsData}
			</div>
		);
	}
}

export default DragDropContext(HTML5Backend)(Layout);
