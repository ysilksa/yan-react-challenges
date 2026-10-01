import { useState, useEffect } from 'react';

export interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export interface Schedule {
  title: string;
  courses: Record<string, Course>;
}

export interface Schedules {
  schedules: Record<string, Schedule>;
}

type JsonQueryResult = [ unknown, boolean, Error | null];

export function useJsonQuery(url : string) : JsonQueryResult {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null> (null);

  useEffect(() => {
    let isMounted = true; 

    const fetchData = async() => {
      setLoading(true);
      setData(undefined);
      setError(null);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json(); 
        if (isMounted) {
          setData(json); // only update the state when the component is around
        }
      } catch(error) {
        if (isMounted) {
            setError(error as Error); // only update the state when the component is around
        }
      } finally {
         if (isMounted) {
           setLoading(false);
        }
      }
    };

  fetchData();

  return () => { // cleanup function for useEffect 
    isMounted = false; 
  };
  }, [url]); // this useEffect runs when the url changes 

  return [data, loading, error];

};

export default useJsonQuery;