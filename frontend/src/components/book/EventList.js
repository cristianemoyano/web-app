import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../../actions/events';
import {
Search,
Grid,
Header,
Segment,
Button,
Card,
Icon,
Label,
} from 'semantic-ui-react'

import _ from 'lodash'
import moment from "moment";
import 'moment-timezone';

import {bookTexts} from './texts'

const texts = bookTexts.eventList;

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

const getRelativeTime = (date, time) => {
    if (!_.isEmpty(date) && !_.isEmpty(time)) {
        return moment(`${date.split('T')[0]}T${time.split('T')[1]}`).tz(tz).fromNow()
    }
}


const List = ({events}) => {

    if (!_.isEmpty(events)) {
        const eventList = events.map(event => (
            <Card>
              <Card.Content>
                <Card.Header>
                    <Link to={`/event/edit/${event.id}`} className='header'>
                        {event.name || event.title}
                    </Link>
                </Card.Header>
                <Card.Meta>
                  <Icon name='calendar outline' />
                  {
                    moment(event.date).tz(tz).format('dddd, LL')
                  }
                  <br/>
                  <Icon name='time outline' /> 
                  {
                    moment(event.time).tz(tz).format('h:mm a')
                  }
                  <br />
                  <Label>
                  {
                    getRelativeTime(event.date, event.time)
                  }
                  </Label>
                </Card.Meta>
                <Card.Description>
                  {event.description}
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui two buttons'>
                  <Button basic color='green'>
                    <Link to={`/event/edit/${event.id}`}>
                        {texts.list.editBtn}
                    </Link>
                  </Button>
                  <Button basic color='red'>
                    <Link
                        to={`/event/delete/${event.id}`}
                    >
                        {texts.list.deleteBtn}
                    </Link>
                  </Button>
                </div>
              </Card.Content>
            </Card>
        ))
        return (
            <Card.Group>
                {eventList}
            </Card.Group>
        )
    }
}


class EventList extends Component {
  componentDidMount() {
    this.props.getEvents();
  }

  state = {
    isLoading: false,
    results: this.props.events,
    value: '',
  }


  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    const eventList = this.props.events.map(function(event) {
        return {
                'id': event.id,
                'title': event.name,
                'description': event.description,
                'date': event.date,
                'time': event.time,
                'created': event.created,
            }
      });

    setTimeout(() => {
      if (_.isEmpty(this.state.value)) {
        return this.setState({
            isLoading: false,
            results: this.props.events,
            value: '',
        })
      }
        

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        results: _.filter(eventList, isMatch),
      })
    }, 10)

    this.setState({
        isLoading: false,
    })
  }

  render() {
    const { isLoading, value, results } = this.state
    const { events } = this.props
    const source = _.isEmpty(results) ? events : results;
    let eventsFeed;

    if (_.isEmpty(source)) {
        eventsFeed = (
            <Header icon>
              <Icon name='calendar times file outline' />
              {texts.list.noneMsg}
            </Header>
        )
    } else {
        eventsFeed = (
            <List events={source} />
        )
    }

    return (
        <Segment>
            <Grid>
                <Grid.Column width={6}>
                    <Search
                        loading={isLoading}
                        onResultSelect={this.handleResultSelect}
                        onSearchChange={_.debounce(this.handleSearchChange, 500, {
                          leading: true,
                        })}
                        results={results}
                        value={value}
                        fluid={true}
                        {...this.props}
                        noResultsMessage={texts.list.noResultsMsg}
                    />
                </Grid.Column>
                    {eventsFeed}                 
            </Grid>
         </Segment>
    );
  }
}

const mapStateToProps = state => ({
  events: Object.values(state.events),
});

export default connect(
  mapStateToProps,
  { getEvents, deleteEvent }
)(EventList);
