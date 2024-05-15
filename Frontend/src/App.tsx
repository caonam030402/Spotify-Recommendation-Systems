import './global.css'
import Playlists from './features/playlists'
import { ThemeProvider } from './components/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Playlists />
    </ThemeProvider>
  )
}

export default App
