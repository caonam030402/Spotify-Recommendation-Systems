import './global.css'
import useRouteElements from './useRouteElements'

function App() {
  const routeElements = useRouteElements()
  return <div className=''>{routeElements}</div>
}

export default App
