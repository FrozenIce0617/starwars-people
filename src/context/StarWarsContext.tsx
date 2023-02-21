import React, { createContext, useContext, useEffect, useState } from 'react';
import { Person } from '../types';
import axios from 'axios';

type StarWarsCategory = 'people' | 'planets' | 'species' | 'vehicles' | 'starships' | 'films';

type StarWarsResource = Person | any;

type StarWarsContextType = {
  category: StarWarsCategory | null;
  resources: StarWarsResource[] | null;
  loading: boolean;
  selectedPerson: Person | null;
  setCategory: (category: StarWarsCategory) => void;
  setSelectedPerson: (person: Person) => void;
};

type Props = {
  children: React.ReactNode;
};

export const StarWarsContext = createContext<StarWarsContextType>({
  category: null,
  resources: null,
  loading: false,
  selectedPerson: null,
  setCategory: () => {},
  setSelectedPerson: () => {},
});

export function useEntries() {
  return useContext(StarWarsContext);
}

export const starWarsCategoryList: StarWarsCategory[] = [
  'people',
  'planets',
  'films',
  'species',
  'vehicles',
  'starships',
];

const StarWarsProvider: React.FC<Props> = ({ children }) => {
  const [category, setCategory] = useState<StarWarsCategory | null>('people');
  const [resources, setResources] = useState<StarWarsResource[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  useEffect(() => {
    setLoading(true);
    if (category) {
      axios.get(`https://swapi.dev/api/${category}`).then((response) => {
        setResources(response.data.results);
        setLoading(false);
      });
    }
  }, [category]);

  return (
    <StarWarsContext.Provider
      value={{
        category,
        resources,
        selectedPerson,
        loading,
        setCategory,
        setSelectedPerson,
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};

export default StarWarsProvider;
