import React, { Component } from 'react';
import update from 'react-addons-update';
import Header from './Header'
import Layout from './Layout'
import './App.scss'


var cards =  [];

export default class App extends Component {
  constructor(props) {
  super(props);
    this.state = {cards: cards, view: 'grid'};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.editCardName = this.editCardName.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.editEntryName = this.editEntryName.bind(this);
    this.updateCardPosition = this.updateCardPosition.bind(this);
    this.updateCardStatus = this.updateCardStatus.bind(this);

}


handleSubmit() {
  console.log(this.state.cards);
  var newCards=cards;
  var newCard = {
    id: Math.random().toString(36).substring(7),
    name: '',
    entries: []
  };
  newCards.push(newCard);
  localStorage.setItem('cards', JSON.stringify(newCards));
  this.setState((prevState) => ({
    cards: newCards,

  }));
}

handleDelete(id) {
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].id === id) {
        cards.splice(i,1);
        break;
      }
    }
    localStorage.setItem('cards', JSON.stringify(cards));
    this.setState((prevState) => ({
      cards: cards
    }));
  }


  editCardName(name,id) {
    var newCards=cards;
    for (var i=0;i<newCards.length;i++)
      if (newCards[i].id === id)
        newCards[i].name = name;

    this.setState((prevState) => ({
      cards: newCards,
    }));
  }

  editEntryName(entry, idCard, idEntry) {
    var newCards = this.state.cards;

    for (var i=0;i<newCards.length;i++)
      if (newCards[i].id === idCard)
        for(var j=0;j<newCards[i].entries.length;j++)
          if(newCards[i].entries[j].idEntry === idEntry)
              newCards[i].entries[j].entry=entry

    this.setState({
      cards: newCards
    })
  }

  doSearch(e){
  var query=e.target.value.toLowerCase();
  var queryResult=[];
  this.setState({
    cards: cards.filter(n =>
       n.entries.some(m => m.entry.includes(query))
       ||
       n.name.includes(query)
  )
      })
}

updateCardStatus(cardId, listId) {
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    // Get the current card
    let card = this.state.cards[cardIndex];
    // Only proceed if hovering over a different list
    if (card.status !== listId) {
        // set the component state to the mutated object
        this.setState(update(this.state, {
            cards: {
                [cardIndex]: {
                    status: {$set: listId}
                }
            }
        }));
    }
}

updateCardPosition(cardId, afterId) {
    // Only proceed if hovering over a different card
    if (cardId !== afterId) {
        // Find the index of the card
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        // Get the current card
        let card = this.state.cards[cardIndex];
        // Find the index of the card the user is hovering over
        let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
        // Use splice to remove the card and reinsert it a the new index
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [cardIndex, 1],
                    [afterIndex, 0, card]
                ]
            }
        }));
    }
}




  render() {


return (
    <div className="App">
      <Header handleSubmit={this.handleSubmit.bind(this)} />
      <div className="App-body">
        <div className="filterWrapper">
            <div className="searchbar">
              <form>
                <input onChange={this.doSearch}
                       type="text"
                       ref="searchInput"
                       name="search"
                       placeholder="Search.."/>
              </form>
            </div>
            <Layout cards={this.state.cards}
                    editCardName={this.editCardName}
                    editEntryName={this.editEntryName}
                    view={this.state.view}
                    handleDelete={this.handleDelete}
                    cardCallbacks={{
                        updateStatus: this.updateCardStatus.bind(this),
                        updatePosition: this.updateCardPosition.bind(this)
                    }}

                    />
        </div>
      </div>

    </div>
  );
      }
}
