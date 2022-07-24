import { Serializable } from 'worker_threads';

const lsm = {
    get : () : weatherReport | null=>{
        let wr: weatherReport | string | null = localStorage.getItem('previousReport')
        if(typeof wr === 'string'){
            wr = JSON.parse(wr) as weatherReport
        }
        return wr;
    },
    set : (report : Serializable | string)=>{
        if(typeof report !== 'string')
            report = JSON.stringify(report);
        return localStorage.setItem('previousReport', report);
    },
    getForcast : () :forcastResponse | null =>{
        let wr: forcastResponse| string | null = localStorage.getItem('previousReport')
        if(typeof wr === 'string'){
            wr = JSON.parse(wr) as forcastResponse
        }
        return wr;
    },
    setForcast : (report : Serializable | string)=>{
        if(typeof report !== 'string')
            report = JSON.stringify(report);
        return localStorage.setItem('forcast', report);
    },
}
export default lsm;