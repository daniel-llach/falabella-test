import React, {Component} from 'react';

export default class PhotoGallery extends Component {
  render() {
    return (
      <div className="photo">
        <a href={this.props.uri}>
          <img src={this.props.preview} />
        </a>
        <div className="likes">
          <span>likes: </span>
          {this.props.likes}
        </div>
      </div>
    );
  }
}
