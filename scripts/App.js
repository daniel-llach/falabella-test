import React, {Component} from 'react';
import $ from 'jquery'
// my react components
import SearchBar from './SearchBar.js'
import Photo from './Photo.js'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos:[]
    }
  }

  typing(searchtxt){
    $.get('https://pixabay.com/api/?key=3438575-9e90c9c6bdcc7c533aee92749&q=' + searchtxt + '&image_type=photo')
      .done( (res)=> {
        this.checkPhoto(res);
    })
  }

  checkPhoto(photos){
    // clean photos array
    this.setState({
      photos: []
    })
    // start checking
    for (var photo of photos.hits) {
      let width = photo.imageWidth;
      let height = photo.imageHeight;
      // Only photos greater than 300px width and height are allowed.
      if(width > 300 || height > 300){
        // Just photos with a width greater than their height should be shown.
        if(width > height){
          let difference = width - height;
          // The difference between width and height must not be greater
          // than 250 pixels.(A square like photo is a lot better than a rectangle)
          if(difference > 250){
            let photoChecked = {
              width: photo.previewWidth,
              height: photo.previewHeight,
              preview: photo.previewURL,
              uri: photo.pageURL,
              likes: photo.likes
            }
            this.setState({
              photos: this.state.photos.concat([photoChecked])
            })
          }
        }
      }
    }
  }


  render() {
    let photos = [];
    // create a Photo component for each
    // photo after filter in checkPhoto()

    for (var i = 0; i < this.state.photos.length; i++) {
      photos.push(<Photo
        width={this.state.photos[i].width}
        height={this.state.photos[i].height}
        preview={this.state.photos[i].preview}
        likes={this.state.photos[i].likes}
        uri={this.state.photos[i].uri}
         />);
    }
    return (
      <div className="photogallery">
        <SearchBar onTyping = {this.typing.bind(this)} />
        <div className="photos">
          {photos}
        </div>
      </div>
    );
  }
}
