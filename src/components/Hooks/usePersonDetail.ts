import axios from 'axios';
import { useState, useEffect } from 'react';
import { Person } from '../../types';

export const usePersonDetail = (id: string | undefined) => {
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonDetail = async () => {
      try {
        setLoading(true);
        console.log('fetching person', id);
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);

        const data: Person = response.data;

        setPerson(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error fetching person details');
      }
    };
    console.log('fetching person', id);

    fetchPersonDetail();
  }, [id]);

  return { person, loading, error };
};

export default usePersonDetail;
