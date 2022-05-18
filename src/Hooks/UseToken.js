import { useEffect, useState } from "react";

const UseToken = (user) => {
   const [token, setToken] = useState('');
   useEffect(()=>{
       const email = user?.user?.email;
       const currentUser = {email: email}
       if(email){
        fetch(`https://calm-escarpment-43051.herokuapp.com/user/${email}`, {
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(currentUser)
        })
        .then(res=>res.json())
        .then(data=> {console.log('data get from backens users api', data)
        const accessToken = data.token;

        localStorage.setItem('accessToken', accessToken );
        setToken(accessToken);
        console.log(accessToken) ;
    
    })
       
       }

   },[user])
   return [token];
};

export default UseToken;