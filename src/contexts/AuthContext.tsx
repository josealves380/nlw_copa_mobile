import { createContext, ReactNode } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){

  Google.useAuthRequest({
    clientId: '1073957746333-n6f33vsdv8k630u22gij2899h86u7pbm.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
    console.log('Entrou')
  }

  return(
    <AuthContext.Provider value={{
      signIn,
      user: {
        name: 'José Alves',
        avatarUrl: 'https://github.com/josealves380.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}