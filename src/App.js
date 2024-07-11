import logo from './logo.svg';
import './App.css';
import TodoList from './screens/TodoList';
import TabComponent from './components/TabComponent';
import MapCurrentLocation from './screens/MapCurrentLocation';
import { useState } from 'react';

function App() {
  const [ActiveTab, setActiveTab] = useState(1)
  return (
    <div className="App">
      <div className="rootComponent">
        <TabComponent active_tab={ActiveTab} onChange={(val) => {
          setActiveTab(val)
        }}/>
        {ActiveTab === 1 && <TodoList />}
        {ActiveTab === 2 && <MapCurrentLocation />}
        </div>
    </div>
  );
}

export default App;
