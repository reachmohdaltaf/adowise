import { Card } from '@/components/ui/card';
import { fetchAllServices } from '@/redux/features/serviceThunk';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ServiceCard from '../components/ServiceCard';
import { Link } from 'react-router-dom';

const OnetoOneCallServicePage = () => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);

  // Fetching services using dispatch
  useEffect(() => {
    dispatch(fetchAllServices()).then((response) => {
      // Filter out services with type "1:1"
      const filteredServices = response.payload.slice()
      .filter(service => service.type === "1:1")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setServices(filteredServices);  // Set the filtered services
    });
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1  sm:grid-cols-1 md:grid-cols-1 gap-2">
      {services.map((service) => (
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
