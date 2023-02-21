const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-10 h-10 border-8 border-red-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
