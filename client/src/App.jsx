import './App.css'
import { AuthProvider } from './context/authProvider'
import { AppRouter } from './routers/AppRouter'

function App() {


  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
