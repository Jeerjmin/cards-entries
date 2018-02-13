import React, { Component } from 'react';
import './Header.scss';

const list = require('../assets/images/list.png');
const plus = require('../assets/images/Plus.png');
const grid = require('../assets/images/grid.png');

export default class Header extends Component {
	constructor(props) {
    super(props);
    this.addCard = this.addCard.bind(this);
  }

  addCard(e){

  this.props.handleSubmit();
}

	render() {
		return (
			<div className="headerWrapper">
				<div className="companyTitle">LOGO</div>
				<div className="navRight">
					<div className="add">
					  <img src={plus} name="plus" className="plusIcon" alt="plus" onClick={this.addCard}/>
					  <input type="button" value="Create New Card" className="addCard" onClick={this.addCard}/>
					</div>
					<div className="listView" name={'list'} >
						<img src={list} name="list" className="listIcon" alt="list"/>
					</div>
					<div className="gridView" name={'grid'}  >
					  <img src={grid} name="grid" className="gridIcon"alt="grid"/>
					</div>
				</div>
			</div>
		);
	}
}
