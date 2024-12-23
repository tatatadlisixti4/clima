import axios from "axios"
import type {SearchType} from "../types"

export default function useWeather() {
    const fetchWeather = async(search: SearchType) => {
        console.log('Consultando...')
        try {
            const appId = 'a3779f0c2090cf5e7942339f8d308cfd'
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const {data} = await axios(geoUrl)
            console.log(data) 
            
                        
        } catch (error) {
            console.log(error)
            
        }
    }
    return {fetchWeather}
}