import React, { Component } from 'react'
import './App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  constructor(){
    super();
    this.state={
      datas:null,
      cards:[],
      data_to_select:null,
    }
  }
  OpenModal = () => {
    document.getElementById("Modal").style.display = 'block';
  }
  CloseModal = () => {
    document.getElementById("Modal").style.display = 'none';
  }
  Add = (id) => {
    console.log("parent add")
    console.log(id)
    let added = this.state.datas.filter(x => x.id === id);
    console.log(added)
    let tmp = this.state.cards
    tmp.push(<Card id={added[0].id} name={added[0].name}  imageUrl={added[0].imageUrl}></Card>)
    this.setState({cards: tmp});
  }
  componentDidMount() {
    fetch('http://localhost:3030/api/cards')
      .then(response => {return response.json();})
      .then(data =>{
        let datas_ = data.cards;
        /*let tmp = [];
        data.cards.forEach(element => {
          console.log(element.name,element.imageUrl)
          tmp.push(<Card id={element.id} name={element.name}  imageUrl={element.imageUrl}></Card>)
        })*/
        let tmp_select = [];
        data.cards.forEach(element => {
          console.log(element.name,element.imageUrl)
          tmp_select.push(<CardLong id={element.id} name={element.name}  imageUrl={element.imageUrl} Add={this.Add}></CardLong>)
        })
        //console.log(tmp)
        //this.setState({cards: tmp});
        this.setState({ datas:datas_})
        this.setState({ data_to_select:tmp_select})
        document.getElementById("Modal").style.display = 'none';
      });
  }
  render() {
    return (
      <div className="App">
        <div id="TopBar">
          My Pokedex
        </div>
        <div id="Background">
          {this.state.cards}
        </div>
        <div id="BottomBar" onClick={this.OpenModal}>
          +
        </div>
        <div id="Modal">
          <div id="Close" onClick={this.CloseModal}>X</div>
          <input id="textbox" type="text" name="search"></input>
          <div id="ModalBackground">
            {this.state.data_to_select}
          </div>
        </div>
      </div>
    )
  }
}

export default App

class Card extends Component{
  render(){
    return(
      <div id="Card" key={this.props.id}>
        <div id="left">
          <img src={this.props.imageUrl} alt={this.props.imageUrl} class="transparent" width="200px"></img>
        </div>
        <div id="right">
            <div class="data_name">{this.props.name}</div>
        </div>
      </div>
    )
  }
}

class CardLong extends Component{
  Add=()=>{
    console.log("child add")
    console.log(this.props.id)
    this.props.Add(this.props.id)
  }
  render(){
    return(
      <div id="CardLong" key={this.props.id}>
        <div id="left">
          <img src={this.props.imageUrl} alt={this.props.imageUrl} class="transparent" width="200px"></img>
        </div>
        <div id="right_modal">
            <div class="data_name" onClick={this.Add}>Add</div>
            <div class="data_name">{this.props.name}</div>
        </div>
      </div>
    )
  }
}
