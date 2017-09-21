import React, { Component } from 'react';
import logo from './logo.svg';
import './styleApp.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        listNames: [],
        nombreGit: 'a-cordoba10',
        listFollowers: []
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.buscarFollower = this.buscarFollower.bind(this);
}
componentDidMount() {
}
getFollowers(a) {
    fetch("/getFollowrs/"+a)
    .then((res)=> res.json())
    .then((json)=>   this.setState(prevState => ({
        listNames: this.state.listNames.concat(json)
      })));
}
handleClick() {
  const newPro = this.state.listNames.concat(this.state.nombreGit);
  this.getFollowers(this.state.nombreGit);
  const listnames = newPro;
  this.setState(prevState => ({
    listNames: listnames
  }));
}
buscarFollower(a) {

    const newPro = this.state.listNames.concat(a);
    this.getFollowers(a);
    const listnames = newPro;
    this.setState(prevState => ({
      listNames: listnames
    }));

}
nameChange(event) {
const target = event.target;
const value = target.value;
    this.setState(prevState => ({
      nombreGit: value
    }));
}


  render() {
    return (
      < div > 
         <div className="product">
             <h2>Tu lista de followers</h2>
                <form>
                    <label>
                        Usuario en Git:<input required type="text" value={this.state.nombreGit} onChange={this.nameChange} />
                    </label>
               </form> 
                    </div>
      < button onClick ={this.handleClick.bind(this)}  > Buscar</button>
            <div><h1>Lista de los usuarios buscados</h1>
             {
                this.state.listNames.map(item => < div> < h2 > Has buscado a : { item } </h2>  </div>)
            }</div>
            <div><h1>Lista de los followers de {this.state.nombreGit}</h1>
             {
                this.state.listFollowers.map(item => < div> < h2 > Follower : { item } </h2>  < button onClick ={()=> {this.buscarFollower(item)} }  > Buscar Follower</button>  </div>)
            }</div>
            
             </div>
    );
  }
}

export default App;




