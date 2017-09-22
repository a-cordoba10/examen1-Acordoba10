import React, { Component } from 'react';
import './App.css';
import { postFavorite } from './postFavorite';
export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          followers: [],
          history: [],
          favorites: [],
          name: 'john-guerra',
          searchedName: ''
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.nameChange = this.nameChange.bind(this);
      this.assignName = this.assignName.bind(this);
      this.addFavorite = this.addFavorite.bind(this);
      this.getFavorites = this.getFavorites.bind(this);
      this.isFavorite = this.isFavorite.bind(this);
  }
  componentDidMount() {
    this.handleSubmit();
    this.getFavorites();
  }
  componentDidUpdate() {
    this.handleSubmit();
  }
  handleSubmit() {
      if (this.state.name && this.state.name !== this.state.searchedName) {
        const entryHistory = {value: this.state.name, key: this.state.history.length};
        const newHistory = this.state.history.concat(entryHistory);
        this.setState(prevState => ({
          searchedName: this.state.name,
          history: newHistory
        }));
        const path = '/gitFollow/' + this.state.name; 
        fetch(path).then(res => res.json()).then(followers => this.setState({ followers }));
      }
  }
  getFavorites() {
    fetch('/favorites').then(res => res.json()).then(favorites => this.setState({ favorites }));
  }
  nameChange(event) {
    const value = event.target.value;
      this.setState(prevState => ({
        name: value,
        searchedName: value
      }));
  }
  assignName(name) {
    this.setState(prevState => ({
      name: name,
      searchedName: ''
    }));
  }
  addFavorite(favorite) {
    const newFavorite = this.state.favorites.concat(favorite);
    postFavorite(favorite).then(res => this.setState({ favorites: newFavorite }));
  }
  isFavorite(follower) {
    if(this.state.favorites.filter(e => e.login === follower.login).length > 0) {
      return true;
    }
    return false;
  }
  render() {
      return ( 
      <div>
        <div id="header">
          <label>
              <h1>Welcome!</h1>
              <h2>Github followers of:</h2>
              < input required type = "text" value = { this.state.name } onChange = { this.nameChange } placeholder = "Github User Name" />
          </label>
          < button onClick = { ()=> {this.assignName(this.state.name) }} > Search </button>
        </div>
        <div id="content">
          <div className="history">
            <h4>Favorites:</h4>
          { this.state.favorites.map(favorite => <h2 key={favorite.id}>{favorite.login}</h2>)}
          </div>
          <div className="history">
            <h4>History:</h4>
            { this.state.history.map(histo => <h2 key={histo.key}>#{histo.value}</h2>)}
          </div>
          { this.state.followers.map(follower => 
          <div key={follower.id} className="follower">
            <img src = { follower.avatar_url} alt={follower.login} className="profilePic"/>
            <h3>{follower.login}</h3>
            <button onClick = { ()=> {this.assignName(follower.login) }}>SEE FOLLOWERS</button>
            <button className={this.isFavorite(follower) ? "favorite hide" :"favorite"} onClick = { ()=> {this.addFavorite(follower) }}></button>
            <a href={follower.html_url} target="_blank">GO TO GITHUB</a>
            <br/>
          </div>)
          }
          </div>      
      </div>
      );
  }
}