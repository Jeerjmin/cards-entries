import React, { Component } from 'react';
import Card from '../components/Card'
import './Layout.scss';


export default class Layout extends Component {
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
