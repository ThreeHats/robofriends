import React, {useState, useEffect} from "react";
import CardList from "../components/CardList";
import SearchBox from   "../components/SearchBox";
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundery from "../components/ErrorBoundery";

const App = () => {
    // constructor(){
    //     super()
    //     this.state = {
    //         robots: [],
    //         searchfield: ""
    //     }
    // }

    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(user => setRobots(user))
    })
    
    // const [filteredRobots, setFilteredRobots] = useState(robots);
    
    // componentDidMount(){
        //     fetch("https://jsonplaceholder.typicode.com/users")
        //       .then(response => response.json())
        //       .then(user => this.setState({robots: user}))
        // }
        
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
        // this.setState({searchfield: event.target.value})
    }

    const filteredRobots = robots.filter(robot => {
                return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
        
    return !robots.length ?
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


    // render(){
    //     const {robots, searchfield} = this.state;
    //     const filteredRobots = robots.filter(robot => {
    //         return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    //     })
    //     return !robots.length ?
    //         <h1>loading</h1> :
    //         (
    //             <div className="tc">
    //                 <h1 className="f1">RoboFriends</h1>
    //                 <SearchBox searchChange={this.onSearchChange} />
    //                 <Scroll>
    //                     <ErrorBoundery>
    //                         <CardList robots={filteredRobots}/>
    //                     </ErrorBoundery>
    //                 </Scroll>
    //             </div>
    //         );
        
    // }
}

export default App;