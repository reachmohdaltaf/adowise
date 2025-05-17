import { fetchAllServices } from '@/redux/features/serviceThunk';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const OnetoOneCallServicePage = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchAllServices());
  }, [dispatch]);

  // Filter services with type "1:1"
  const filteredServices = services
    .filter(service => service.type === "1:1")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return <LoadingSpinner />;
  }

  if (filteredServices.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        No services found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-2">
      {filteredServices.map((service) => (
        <Link 
          to={`/expert/dashboard/services/update/${service._id}`} 
          key={service._id} 
          className="md:w-2/3"
        >
          <ServiceCard service={service} />
        </Link>
      ))}
    </div>
  );
};

export default OnetoOneCallServicePage;
