import _ from 'lodash'

import React, { Component } from 'react'
import { Search, Header, Segment } from 'semantic-ui-react'

export default class Searcher extends Component {
  state = { isLoading: false, results: [], value: '' }

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(this.state)

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.name)

      this.setState({
        isLoading: false,
        results: _.filter(this.props.source, isMatch),
      })
    }, 10)
  }

  render() {
    const { isLoading, value, results } = this.state

    const Feed = this.props.feed;

    const renderFeed = () => (
        <Feed source={this.props.source} />
    )

    return (
      <div>
        <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            {...this.props}
        />
        {this.renderFeed()}
        
      </div>
    )
  }
}