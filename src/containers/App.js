import React, { Component } from 'react';
import update from 'react-addons-update';
import Header from './Header'
import Layout from './Layout'
import './App.scss'

const plus = require('../assets/images/Plus.svg');
const deleteCard = require('../assets/images/deleteIcon.png');

var cards =  [];

export default class App extends Component {
  constructor(props) {
  super(props);
    this.state = {cards: cards};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.editCardName = this.editCardName.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.editEntryName = this.editEntryName.bind(this);
    this.updateCardPosition = this.updateCardPosition.bind(this);
    this.updateEntryPosition = this.updateEntryPosition.bind(this);
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

updateCardPosition(cardId, afterId) {
    if (cardId !== afterId) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        console.log('gj', cardIndex)
        let card = this.state.cards[cardIndex];
        let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);

        var stateCopy = Object.assign({}, this.state);

        [stateCopy.cards[cardIndex],stateCopy.cards[afterIndex]]
          =
        [stateCopy.cards[afterIndex],stateCopy.cards[cardIndex]]

        this.setState(stateCopy);


    }
}

updateEntryPosition(Id, afterId) {
  if (Id !== afterId) {
    let cardIndex;
    let entryIndex;
    let afterIndex;
    this.state.cards.map(card => card.entries.findIndex((entry) =>
                     entry.idEntry == Id)).forEach((item,index) =>
                     (item>=0) ? [entryIndex, cardIndex]=[item,index] : 0)

    this.state.cards.map(card => card.entries.findIndex((entry) =>
                     entry.idEntry == afterId)).forEach(item =>
                     (item>=0) ? afterIndex=item : 0)


    var stateCopy = Object.assign({}, this.state);

    [stateCopy.cards[cardIndex].entries[entryIndex], stateCopy.cards[cardIndex].entries[afterIndex]]
      =
    [stateCopy.cards[cardIndex].entries[afterIndex], stateCopy.cards[cardIndex].entries[entryIndex]]

    this.setState(stateCopy);
  }
}




  render() {


return (
    <div className="App">
      <Header />
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
              <form >
                <img className="addCard" src={plus}  alt="add" onClick={this.handleSubmit.bind(this)} />

              </form>
            </div>
            <Layout cards={this.state.cards}
                    editCardName={this.editCardName}
                    editEntryName={this.editEntryName}
                    handleDelete={this.handleDelete}
                    updateCardPosition={this.updateCardPosition}
                    updateEntryPosition={this.updateEntryPosition}

                    />
        </div>
      </div>

    </div>
  );
      }
}
