import LoadingSpinner from '../Common/LoadingSpinner';
import { useEntries } from '../../context/StarWarsContext';
import PersonCard from '../Common/PersonCard';

const HomePage = () => {
  const { category, resources, loading } = useEntries();
  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{category?.toUpperCase()}</h1>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources &&
            resources.map((entry, idx) => {
              return <PersonCard key={idx} person={entry} />;
            })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
