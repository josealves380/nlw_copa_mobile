import { createContext, ReactNode, useState } from "react";
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
  isUserLoading: boolean;
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps){
  const [isUserLoading, setIsUserLoading] = useState(false)
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '1073957746333-n6f33vsdv8k630u22gij2899h86u7pbm.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  async function signIn() {
   try{
      setIsUserLoading(true);
   }catch(error){

   }finally{
      setIsUserLoading(false)
   }
  }

  return(
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user: {
        name: 'José Alves',
        avatarUrl: 'https://github.com/josealves380.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}