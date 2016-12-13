import React, { Component } from 'react'
import Autosuggest from 'react-autosuggest'
import Api from '../helpers/Api'

export function renderSuggestion(suggestion) {
  return <span>{ suggestion.label }</span>
}

export function getSuggestionValue(suggestion) {
  return suggestion.label
}

class AutocompleteInput extends Component {
  constructor(props) {
    super(props)

    this.state = { result: [], err: '', value: '' }
  }

  onSuggestionsFetchRequested({ value }) {
    return Api.fetchFromBAN(value)
      .then(({ result, err }) => this.setState({ result, err }))
  }

  onSuggestionSelected(suggestion) {
    this.props.showDetail(suggestion)
    this.clearSuggestions()
  }

  clearSuggestions() {
    this.setState({ result: [] })
  }

  render() {
    const { value, result } = this.state

    const inputProps = {
      placeholder: 'Rechercher une adresse',
      value,
      onChange: (event, { newValue }) => {
        this.setState({ value: newValue })
      },
    }

    return (
      <Autosuggest
        theme={theme}
        suggestions={result}
        onSuggestionSelected={(event, { suggestion }) => this.onSuggestionSelected(suggestion)}
        onSuggestionsFetchRequested={inputValue => this.onSuggestionsFetchRequested(inputValue)}
        onSuggestionsClearRequested={() => this.clearSuggestions()}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

AutocompleteInput.propTypes = {
  showDetail: React.PropTypes.func,
}

const theme = {
  container: {
    width: '70%',
    position: 'fixed',
    top: '10px',
    zIndex: 10,
  },

  input: {
    width: '100%',
    height: '30px',
    padding: '10px 20px',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: '16px',
    border: '1px solid #aaa',
    borderRadius: 4,
  },

  suggestionsList: {
    position: 'fixed',
    top: '70px',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    backgroundColor: '#fff',
  },

  suggestion: {
    cursor: 'pointer',
    fontFamily: 'Helvetica, sans-serif',
    padding: '5px 20px',
    fontWeight: 300,
  },

  suggestionFocused: {
    textDecoration: 'underline',
  },
}

export default AutocompleteInput
