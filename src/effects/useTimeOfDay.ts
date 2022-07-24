import { stringify } from 'querystring';

function useTimeOfDay(){
    const timesOfDay : Record<partsOfTheDay, timeRange>  = {afternoon : {start:12, end:18 }, 'mourning' : {start:6, end : 12}, night : {start : 18, end: 24}, midnight : {start : 1, end : 6}}
    const now = new Date();
    const hour = now.getHours();

    const currentTimeOfDay : partsOfTheDay | undefined = (Object.keys(timesOfDay) as partsOfTheDay[]).find((tod)=> timesOfDay[tod as partsOfTheDay].start < hour && timesOfDay[tod as partsOfTheDay].end > hour)
    if(currentTimeOfDay)
        return {currentTimeOfDay, range: timesOfDay[currentTimeOfDay]}
    else{
        let r : {currentTimeOfDay : partsOfTheDay, range : timeRange } = { currentTimeOfDay : 'afternoon' , range : {start: 1, end : 24 }};
        return r
    } 

}

export default useTimeOfDay