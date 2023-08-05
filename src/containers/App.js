import React, {useState, useEffect} from "react";
import CardList from "../components/CardList";
import SearchBox from   "../components/SearchBox";
import './App.css';
import Scroll from "../components/Scroll";
import ErrorBoundery from "../components/ErrorBoundery";

const App = () => {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchfield] = useState('');
    const [count, setCount] = useState(0);

    
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(user => setRobots(user))
        console.log(robots);
    }, [])

    useEffect(() => {
    console.log(count);
    }, [count])
        
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }

    const filteredRobots = robots.filter(robot => {
                return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
        
    return !robots.length ?
        <h1>loading</h1> :
        (
        <div className="tc">
            <h1 className="f1">RoboFriends</h1>
            <button onClick={()=>setCount(count+1)}>Click ME</button>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundery>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundery>
            </Scroll>
        </div>
    );
}

export default App;