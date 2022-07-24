import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient,  QueryClientConfig} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { PersistQueryClientProvider, persistQueryClient } from '@tanstack/react-query-persist-client';





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const DAY = 43200000;
const queryOptions: QueryClientConfig ={
  defaultOptions:{
    queries: {
      networkMode: 'offlineFirst',
      staleTime: DAY,
      cacheTime: DAY,
      refetchOnWindowFocus: false,
      keepPreviousData : true,


    }
  }
}

const storage = createSyncStoragePersister({ storage : window.localStorage})
const qc = new QueryClient(queryOptions);
root.render(
  <PersistQueryClientProvider client={qc}  persistOptions={{ persister : storage}}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  <ReactQueryDevtools initialIsOpen={true}/>
  </PersistQueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
