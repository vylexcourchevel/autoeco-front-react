import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';  // Corrigez ce chemin
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
   
  const cars = useSelector((state) => state.car.data);
  console.log(cars);
  // const loading = useSelector((state) => state.car.data);
  // const error = useSelector((state) => state.cars.error);

  useEffect(() => {
    const fetchCar = async () => {
     
      try {
        const { data } = await axios.get("http://localhost:8001/api/cars/all");
       
        dispatch(FETCH_SUCCESS(data));
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message));
        console.log(error);
      }
    };

    fetchCar();
  }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div>
     {cars.map((car, index) => (
        <div key={index}>
          <h2>{car.brand}</h2>
         
        </div>
      ))}
    </div>
      

  );
};

export default Home;


