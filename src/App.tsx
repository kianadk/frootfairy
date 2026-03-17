
import './App.css'
import logo from './assets/frootfairy.png';

function App() {

  return (
    <div className='flex flex-col items-center justify-center bg-background h-full' data-theme='neutral'>
    <img src={logo} className='max-w-100'/>
    <p className='text-foreground'>frooty things coming soon</p>
          
    </div>
  )
}

export default App
