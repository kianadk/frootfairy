
import { Route, Routes } from 'react-router-dom';
import './App.css'

import Header from './Header';
import Home from './Home';
import Order from './Order';

function App() {

  return (
    <div className='flex flex-col items-center gap-8 bg-background h-full w-full py-4' data-theme='neutral'>
    <Header />
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/order' element={<Order />} />
     </Routes>
    </div>
  )
}

export default App
