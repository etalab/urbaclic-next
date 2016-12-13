import React, { Component } from 'react'
import Search from '../components/Search'
import Map from '../components/Map'
import Details from '../components/Details'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = this.props
  }

  static async getInitialProps () {
    return { lat: 43.8, long: 0.1, zoom: 3 }
  }

  showDetail(suggestion) {
    const [long, lat] = suggestion.coordinates
    this.setState({ lat, long, zoom: 14, showMarker: true })
  }

  render () {
    const { lat, long, zoom, showMarker } = this.state

    return (
      <div>
        <Search showDetail={(suggestion) => this.showDetail(suggestion)} />
        <Map lat={lat} long={long} zoom={zoom} showMarker={showMarker} />
        <Details />
      </div>
    )
  }
}

export default Index
