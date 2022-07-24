import React, { useEffect, useState } from 'react';
import ClockUtil from '../utilities/clockCalc';
import { Container, Icon, Popup, Grid } from 'semantic-ui-react';
import '../styles/circularProgrss.css'
import useTimeOfDay from '../effects/useTimeOfDay';

export default function Clock(props : any){
        const {sunrise, sunset } = props;
        const [time, setTime] = useState(0)
        const [mainClock, setClock] = useState(new ClockUtil(sunrise, sunset));
        const [ nextEvent, setNextEvent ] = useState<events>('sunset')
        const timeofDay = useTimeOfDay();
        const temp: eventDiscription= {
                dawn: '',
                sunrise : '',
                mourning : '',
                night : '',
                noon:'',
                afternoon: '',
                sunset: `The time of sunset is defined in astronomy as the moment when the upper limb of the Sun disappears below the horizon.[1] Near the horizon, atmospheric refraction causes sunlight rays to be distorted to such an extent that geometrically the solar disk is already about one diameter below the horizon when a sunset is observed.`,
                dusk: `Dusk occurs at the darkest stage of twilight, or at the very end of astronomical twilight after sunset and just before nightfall. At predusk, during early to intermediate stages of twilight, enough light in the sky under clear conditions may occur to read outdoors without artificial illumination; however, at the end of civil twilight (when Earth rotates to a point at which the center of the Sun's disk is 6° below the local horizon), such lighting is required to read outside. The term dusk usually refers to astronomical dusk, or the darkest part of twilight before night begins.<a href="https://en.wikipedia.org/wiki/Dusk" target="_blank" aria-label="about dusk"> more info</a>`,
                twilight : '',
                midnight : ''


        }


        useEffect(()=>{
                setClock(new ClockUtil(sunrise, sunset));
                setNextEvent(timeofDay.currentTimeOfDay === 'night' || timeofDay.currentTimeOfDay === 'midnight' ? 'sunrise' : 'sunset');
                setTime(mainClock.timeTillNext(nextEvent));
                let timer = mainClock.createInterval(nextEvent, setTime);
                return ()=>{
                        clearInterval(timer);
                }

        }, [sunrise, sunset]);

        useEffect(()=>{
                let delta = Date.now() - timeofDay.range.end;
                let ne =  setTimeout(()=>{},delta)
                return ()=>{
                clearTimeout(ne)
               }
        }, [nextEvent])


        const percentOfDayRemaining: number = Math.floor(100 - mainClock.percentOfDay(time));
        

        return ( 
        <Container id="clock" aria-live='polite' fluid>
                <Grid>
                        <Grid.Column>
                                <Grid.Row>
                                        <div role="progressbar" aria-valuemax={100} aria-valuenow={percentOfDayRemaining} style={{"--value" : percentOfDayRemaining} as any}> {ClockUtil.convertToString(time)} </div> <sup>until</sup>
                                        <span id="next_stage">{nextEvent}</span><Popup content={temp[timeofDay.currentTimeOfDay]} trigger={<Icon name="info circle" role="image" aria-label={`more info about ${timeofDay}`}/>} /> 
                                </Grid.Row>
                        </Grid.Column>
                </Grid>
        </Container>
        );
}