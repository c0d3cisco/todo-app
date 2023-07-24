import { useContext } from 'react';
import { AuthContext } from '../../Context/Auth';

function Auth({ capability, children}){
	
  const { isLoggedIn, can } = useContext(AuthContext);

  return (
    isLoggedIn && can(capability) &&
		<>
      {children}
		</>
		
  )

}
export default Auth;
