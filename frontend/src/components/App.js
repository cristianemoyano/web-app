import React, { Component } from "react";

import Head from './layout/Head'
import EventList from './book/EventList'


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading",
        };
    }

    render() {
        return (
            <div className="App">
                <Head title="Turnos"/>
                <EventList />
            </div>
        );
    }
}

export default App;
