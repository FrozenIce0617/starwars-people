import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { usePersonDetail } from '../Hooks/usePersonDetail';
import { Person, Film, Species } from '../../types';
import LoadingSpinner from '../Common/LoadingSpinner';

interface PersonCardProps {
  person: Person;
}

const PersonDetailPage = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const [filmTitles, setFilmTitles] = useState<string[]>([]);
  const [speciesNames, setSpeciesNames] = useState<string[]>([]);
  const { person, loading, error } = usePersonDetail(id);
  const [loadingFilms, setLoadingFilms] = useState<boolean>(false);
  const [loadingSpecies, setLoadingSpecies] = useState<boolean>(false);

  useEffect(() => {
    if (person) {
      setLoadingFilms(true);
      const fetchFilms = async () => {
        const promises = person.films.map((filmUrl) => axios.get<Film>(filmUrl));

        const responses = await Promise.all(promises);
        setLoadingFilms(false);
        const titles = responses.map((response) => response.data.title);

        setFilmTitles(titles);
      };

      const fetchSpecies = async () => {
        const promises = person.species.map((specieUrl) => axios.get<Species>(specieUrl));

        const responses = await Promise.all(promises);
        setLoadingSpecies(false);
        const names = responses.map((response) => response.data.name);

        setSpeciesNames(names);
      };

      fetchFilms();
      fetchSpecies();
    }
  }, [person]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !person) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md">
      <div className="p-4 pb-20">
        <h2 className="text-xl font-bold mb-2">{person.name}</h2>
        <p className="text-gray-700 text-base mb-4">{`Height: ${person.height}`}</p>
        <p className="text-gray-700 text-base mb-4">{`Mass: ${person.mass}`}</p>
        <p className="text-gray-700 text-base mb-4">{`Hair Color: ${person.hair_color}`}</p>
        <p className="text-gray-700 text-base mb-4">{`Skin Color: ${person.skin_color}`}</p>
        <p className="text-gray-700 text-base mb-4">{`Eye Color: ${person.eye_color}`}</p>
        <p className="text-gray-700 text-base mb-4">{`Birth Year: ${person.birth_year}`}</p>
        <p className="text-gray-700 text-base mb-4">{`Gender: ${person.gender}`}</p>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Appears in Films:</h3>
          {loadingFilms ? (
            <LoadingSpinner />
          ) : (
            <ul className="list-disc pl-4">
              {filmTitles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Appears in Species:</h3>
          {loadingSpecies ? (
            <LoadingSpinner />
          ) : (
            <ul className="list-disc pl-4">
              {speciesNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
