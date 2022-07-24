import React from 'react';

class ClockUtil{
    sunset: Date
    sunrise: Date
    isMourning: Boolean
    lengthOfDay: number
    constructor(sunrise: number, sunset: number){
        this.sunset = new Date(sunset);
        this.sunrise = new Date(sunrise);
        let now = Date.now();
        this.isMourning =  now < this.sunrise.getTime();
        this.lengthOfDay = sunrise - sunset  

    }
    static sixDegreeToMin = 24 * 60 * 1000; // 24 mins
    static hour = 3.6e+6
    timeTillNext(event: events): number{

        let timeRemaining: number
        switch(event){
            case 'sunrise': 
                timeRemaining = Date.now() - this.sunrise.getTime();
            break;
            case 'sunset':
                timeRemaining =  Date.now() - this.sunset.getTime();
                break;
            default:
                timeRemaining = 0;

        }

        return timeRemaining;
    }
    update(sunset: number, sunrise: number ): void{
        this.sunrise = new Date(sunrise); 
        this.sunset = new Date(sunset);
    }
    updateFromWeatherReport(wr: weatherReport): void{
        this.sunrise = new Date(wr.sys.sunrise); 
        this.sunset = new Date(wr.sys.sunset);
    }
    percentOfDay(time: number){
        return (time / this.lengthOfDay)  * 100
    }
    createInterval(nextEvent : events, reactSet : React.Dispatch<React.SetStateAction<number>>, timeout = 1000){
        return setInterval(()=>{
            let delta = Date.now() - this[nextEvent].getTime();
            reactSet(delta);

        }, timeout)
    }
    static convertToString(time: number): string{ 
        time = Math.abs(time);
        let hours = Math.floor(time/ClockUtil.hour)
        time =  time % ClockUtil.hour; 
        let min = Math.floor(time/60000);
        time = time % 60000;
        let seconds = Math.floor(time/1000);
        let leadingMinZero : Boolean = min.toString().length === 1;
        let leadingSecondZero : Boolean = seconds.toString().length === 1;
        

        let result = `${hours}:${leadingMinZero ? '0' : ''}${min}:${leadingSecondZero ? '0' : ''}${seconds}`;
        return result;
    }
}

export default ClockUtil;