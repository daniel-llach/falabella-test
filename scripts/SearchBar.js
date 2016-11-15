import React, {Component} from 'react';

export default class SearchBar extends Component {
  // set initial state values
  componentWillMount(){
    this.state = {
      searchtxt:''
    }
  }

  changetxt(e){
    this.props.onTyping(e.target.value);
  }

  keydown(e){
    if (e.key === 'Enter') {
          this.props.onTyping(e.target.value);
        }
  }

  render() {
    return (
      <div className="searchbar" >
        <input type="text" name="search"
              placeholder="Qué quieres ver hoy?"
              onBlur={ (e) => this.changetxt(e) }
              onKeyDown={ (e) => this.keydown(e) }
              />
      </div>
    );
  }
}
