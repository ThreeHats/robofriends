import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setSearchfield, requestRobots } from "../actions";

import CardList from "../components/CardList";
import SearchBox from   "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundery from "../components/ErrorBoundery";

import './App.css';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        // error: state.requestRobots.error
    }
}

const mapDispachToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

const App = (props) => {
    useEffect(() => {
        props.onRequestRobots();
    }, [])
        
    const { searchField, onSearchChange, robots, isPending } = props;

    const filteredRobots = robots.filter(robot => {
                return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

        
    return isPending ?
        <h1>loading</h1> :
        (
        <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundery>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundery>
            </Scroll>
        </div>
    );
}

export default connect(mapStateToProps, mapDispachToProps)(App);