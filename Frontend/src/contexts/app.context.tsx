import { getAccessTokenFromLS } from '@/lib/auth'
import { createContext, SetStateAction, useState } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)

  // const reset = () => {
  //   setIsAuthenticated(false)
  // }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
