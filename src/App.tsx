import React, { useEffect, useState } from 'react';
import Clock from './components/clock';
import Location from './components/location';
import Footer from './components/footer';
import lsm from './utilities/localStorage.util'; //local storage manager
import Fetcher from './utilities/fetch.utility';
import 'semantic-ui-css/semantic.css';
import { Container, Menu } from 'semantic-ui-react';
import { useQuery } from '@tanstack/react-query';
import useTimeOfDay from './effects/useTimeOfDay';




//?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}




function App() {
 
  const {  error: gpsError, data : coords, isLoading: gpsLoading } = useQuery(['coords'], Fetcher.getCurrentLocationPromise);
  const { status, error, data: todaysReport } = useQuery(['currentWeather', coords ], ()=> Fetcher.getCurrentWeather(coords), 
  {
    enabled: !!coords,
    select: (data)=> ({sunrise: data.sys.sunrise, sunset: data.sys.sunset }),
  });

  const { data: localName } = useQuery(['localName', coords],()=> Fetcher.getLocaleName(coords), 
  { 
    enabled: !!coords,
    select: (d) =>d[0].name
  });
 

  return todaysReport ? (
    <>
    <Container as="main">
      <Menu as="header" inverted fixed='top'>
        <Location gps={ localName ? localName :'...loading'}/>
      </Menu>
      <Clock sunrise={todaysReport.sunrise * 1000 } sunset={todaysReport.sunset * 1000 }/>
    </Container>
    <Footer/>
   </>
  ): (<>...loading</>)
}

export default App;
