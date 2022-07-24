interface coords {
    "lon": number,
    "lat": number
}
interface weatherTypes{
            "id": number,
            "main": string,
            "description": string
            "icon": string
        }
interface weatherReportCore{
     "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "humidity": number
}
interface weatherReportSystem{
     "type" ?: number,
        "id" ?: number,
        "country" ?: string,
        "sunrise": number,
        "sunset": number
}
interface weatherReport {
    "lastUpdated"?: number
    "coord": coords,
    "weather": weatherTypes[],
    "base": string,
    "main": weatherReportCore
    "visibility": number,
    "wind": {
        "speed": number,
        "deg": number
    },
    "clouds": {
        "all": number
    },
    "dt": number,
    "sys": weatherReportSystem
    "timezone": number,
    "id": number,
    "name":string,
    "cod": number
}
interface gecodingResponse{
    name: string,
    local_names : Record<string, string>
    lat: number,
    lon: number
    country:string
}

type events = 'sunset' | 'sunrise';

interface forcastInstance  {
            "dt": number,
            "main": {
                "temp": number,
                "feels_like": number,
                "temp_min": number,
                "temp_max": number,
                "pressure": number,
                "sea_level": number,
                "grnd_level": number,
                "humidity": number,
                "temp_kf": number
            },
            "weather": [
                {
                    "id": number,
                    "main": string,
                    "description": string,
                    "icon": string
                }
            ],
            "clouds": {
                "all": number
            },
            "wind": {
                "speed": number,
                "deg": number,
                "gust": number
            },
            "visibility": number,
            "pop": number,
            "sys": {
                "pod": string
            },
            "dt_txt": string
}
interface cityData{
        "id": number,
        "name": string,
        "coord": {
            "lat": number
            "lon": number
        },
        "country": "US",
        "population": number,
        "timezone": number,
        "sunrise": number,
        "sunset": number
    }


interface forcastResponse {
    lastUpdated ? : number,
    "cod": string,
    "message": number,
    "cnt": number,
    "list": Array<forcastInstance>,
    "city": cityData
}

type partsOfTheDay = 'night' | 'mourning' | 'afternoon' | 'midnight';
type solarEvents = 'sunrise' | 'sunset' | 'dusk' | 'dawn' | 'twilight' | 'noon'

type eventDiscription = Record<partsOfTheDay | solarEvents, string>
interface timeRange{start: number, end: number} 
