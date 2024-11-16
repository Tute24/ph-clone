import axios from "axios"

export default async function HomePage(){

    try{
        const response = await axios.get('/productsList')
    }catch(error){

    }

    return(
        <h1 className="flex justify-center p-4 font-bold">Products:</h1>
    )
}