import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { Offline, Online } from 'react-detect-offline'

function App() {
  
  return (
    <>
    <Online>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Online>

    <Offline>Failed Connection</Offline>
    </>
  )
}

export default App

