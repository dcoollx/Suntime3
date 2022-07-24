/**
 * @description - shortcut util for making http request also stores env vars
 */
class Fetcher {
    public static weatherUrl = process.env.REACT_APP_WEATHERURL;
    private static apiKey = process.env.REACT_APP_WEATHERAPI;
    private static currentWeather = '/data/2.5/weather';
    private static forcast = '/data/2.5/forecast';
    private static gecoding = '/geo/1.0/reverse';// ?lat=#&lon=#
   
    static createEndpoint = (coords : GeolocationPosition) =>{
        return `?lat=${coords?.coords?.latitude}&lon=${coords.coords.longitude}&appid=${Fetcher.apiKey}`;
    }

    static getCurrentWeather = async (coords : GeolocationPosition | undefined): Promise<weatherReport>=>{
        if(!coords)
            return Promise.reject(new Error('Coords is invalid'))
        const endpoint = this.createEndpoint(coords)
        return fetch(`${Fetcher.weatherUrl + Fetcher.currentWeather }${endpoint}`).then(res => res.ok ? res.json() : new Error(res.statusText)) 
    }
    static async getCurrentLocationPromise(): Promise<GeolocationPosition>{
        return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition((pos)=>resolve(pos), (err)=>reject(err));
      });
    }
    static getForcast = async (coords: GeolocationPosition): Promise<forcastResponse> =>{
        let endpoint = this.createEndpoint(coords);
        return fetch(`${this.weatherUrl}${this.forcast}${endpoint}`).then(resp => resp.ok ? resp.json() : new Error(resp.statusText) );
    }
    static async getLocaleName(coords : GeolocationPosition | undefined) : Promise<gecodingResponse[]>{
        if(!coords)
            return Promise.reject(new Error('no coords'));
        let response: Array<gecodingResponse> = await fetch(`${this.weatherUrl}${this.gecoding}${this.createEndpoint(coords)}&limit=1`).then((resp) => resp.ok ? resp.json() : new Error(resp.statusText));
        return response;


    }
    static convertForcastToWR = (fc : forcastResponse) =>{
        let report =  {
                sunrise : fc.city.sunrise,
                sunset : fc.city.sunset,
                
        }
        return report;
    }
}
export default Fetcher