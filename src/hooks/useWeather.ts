import axios from "axios"
import {object, string, number, Output, parse} from 'valibot'
import type {SearchType} from "../types"

// Valibot esquema
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})

type Weather = Output<typeof WeatherSchema>

export default function useWeather() {
    const fetchWeather = async(search: SearchType) => {
        const appId = import.meta.env.VITE_API_KEY
        console.log('Consultando...')
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            const {data} = await axios(geoUrl)
            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
            const {data: weatherResult} = await axios(weatherUrl)
            const result = parse(WeatherSchema,  weatherResult)
            if(result) {
                console.log(result)
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    return {fetchWeather}
}