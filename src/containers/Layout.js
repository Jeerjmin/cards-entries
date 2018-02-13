import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from '../components/Card'
import './Layout.scss';



class Layout extends Component {
	render() {
		const { cards, view } = this.props;
		const cardsData = cards.map((card) => {
			return (
				<div key={card.id}>
					<Card view={view}
								id={card.id}
								handleDelete={this.props.handleDelete}
								name={card.name}
								entries={card.entries}
								editCardName={this.props.editCardName}
								editEntryName={this.props.editEntryName}
								cardCallbacks={this.props.cardCallbacks}
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
