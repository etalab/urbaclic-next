import React, { Component } from 'react'
import Head from 'next/head'
import css from 'next/css'

let Map, TileLayer, Marker

class LeafletMap extends Component {

  componentDidMount(){
    // Only runs on Client, not on server render
    Map = require('react-leaflet').Map
    TileLayer = require('react-leaflet').TileLayer
    Marker = require('react-leaflet').Marker
    this.forceUpdate()
  }

  render () {
    if (!Map) {
      return null
    }

    const { lat, long, zoom, showMarker } = this.props

    return (
      <div>
        <Head>
           <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
        </Head>
        <Map center={[lat, long]} zoom={zoom} style={{height: '60vh', marginTop: '70px', zIndex: 1}}>
          <TileLayer
            url="http://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibmlja2kiLCJhIjoiczVvbFlXQSJ9.1Gegt3V_MTupW6wfjxq2QA"
            attribution='&copy; <a href="https://www.mapbox.com/about/maps/" target="_blank">Mapbox</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />
          { showMarker ? <Marker position={[lat, long]} /> : null }
        </Map>
      </div>
    )
  }
}

export default LeafletMap
