import React, { Component } from 'react'

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {Input } from 'semantic-ui-react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'
import { reduxForm, Field } from 'redux-form'
import Script from 'react-load-script'


class NameGeoEncode extends Component {
    constructor(props){
      super(props);
      this.state = {
        address : "",
        lat : "",
        lng : ""
      }
      this.onChange = (address) => this.setState({ address })
      this.res = ""
      this.res2 = ""
    }

    handleSelect(address, placeId) {
      console.log(address);
      this.res += "You have been to :" + address;
      console.log(this.res);
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then((latLng) => {
          console.log('Success', latLng)
          this.setState({lat : latLng.lat})
          this.setState({lng : latLng.lng})
          this.res += "! latitude:";
          this.res += this.state.lat.toString();
          this.res += ", longitude:";
          this.res += this.state.lat.toString();

          this.res2 = `${address},${this.state.lat},${this.state.lng}`;
          console.log(this.state.lat);
          console.log(this.state.lng);
          console.log(this.res);
        })
        .catch(error => console.error('Error', error))
    }

    handleFormSubmit(event) {
      event.preventDefault()

      geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then((latLng) => {
          console.log('Success', latLng)
        })
        .catch(error => console.error('Error', error))
    }

    // componentWillMount () {
    //     const script = document.createElement("script");
    //
    //     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8O31ZZoX38C8EkyvJYYdGoG5H5lDadCI&libraries=places";
    //     script.async = true;
    //
    //     document.body.appendChild(script);
    // }

    // componentDidMount() {
    //   const s = document.createElement('script');
    //   s.type = 'text/javascript';
    //   s.async = true;
    //   s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD8O31ZZoX38C8EkyvJYYdGoG5H5lDadCI&libraries=places";
    //   this.instance.appendChild(s);
    // }


    render(){
      const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
      }
      const options = {
        googleLogo:false
      }
      return (
        <div>
        {this.state.lat === '' ?
          <PlacesAutocomplete inputProps = {inputProps} onSelect={this.handleSelect.bind(this)}/>
          :
          <div className = "enter-city">
              <Input {...this.props.input} value = {this.res2} fluid/>
          </div>}
        </div>
      )
    }
};


// const WrappedContainer = GoogleApiWrapper({
//    apiKey: "AIzaSyAJNbOFFGV2FE-yLYI8L-XWK5GG3Gpb-2U"
// })(NameGeoEncode);
//
//
// export default reduxForm ({
//   form: 'NameGeoEncode'
// })(WrappedContainer );





export default reduxForm ({
  form: 'NameGeoEncode'
})(NameGeoEncode);
