import React, { createContext, useEffect, useState } from 'react';



export const AuthContext =createContext()


export  function AuthContextProvider({children}) {

    const [Token, setToken] = useState(null);
    useEffect(function(){


      const val =localStorage.getItem("kay")
          if (val != null) {
            setToken(val)
          }



    },[])


  return <AuthContext.Provider value={{myToken:Token ,setToken}}>
  
  {children}
  
  
  </AuthContext.Provider>
    
  
}
