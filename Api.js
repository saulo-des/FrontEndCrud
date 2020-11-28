const BASE_API = 'http://localhost:4000'

export default{
    signIn: async (nome, idade, email) =>{
    const req  = await fetch (`${BASE_API}/usuario`,{
            crossDomain: true,
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, idade, email}) 
    })
    const json = await req.json()
    return json
    },
    checkToken:async(token) =>{
        const req  = await fetch (`${BASE_API}/usuario/eu`,{
            method: 'GET',
            mode: 'cors',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const json = await req.json()
        return json
    }
}

