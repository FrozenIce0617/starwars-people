import { useNavigate } from 'react-router-dom';

import { Person } from '../../types';

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  const navigate = useNavigate();

  const getIndexFromUrl = (url: string): string => {
    const segments = url.split('/');
    return segments[segments.length - 2];
  };

  const onViewDetailClick = () => {
    navigate(`/detail/${getIndexFromUrl(person.url)}`);
  };

  return (
    <div className="relative bg-gray-50 rounded-lg overflow-hidden shadow-md">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">{person.name}</h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Height</h3>
            <p className="text-gray-700 text-lg">{person.height}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Mass</h3>
            <p className="text-gray-700 text-lg">{person.mass}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Birth Year</h3>
            <p className="text-gray-700 text-lg">{person.birth_year}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Gender</h3>
            <p className="text-gray-700 text-lg">{person.gender}</p>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg" onClick={onViewDetailClick}>View Details</button>
        </div>
      </div>
    </div>


  );
};

export default PersonCard;
