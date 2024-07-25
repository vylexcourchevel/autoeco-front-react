import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar'; // Corrigez ce chemin si nécessaire
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.data);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/cars/all");
        dispatch(FETCH_SUCCESS(data));
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message));
        console.log(error);
      }
    };

    fetchCar();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        {cars.map((car, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card" style={{ width: '18rem' }}>
              <img src={car.image} className="card-img-top" alt={`${car.brand} ${car.model}`} />
              <div className="card-body">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Registration Plate: {car.registrationPlate}</p>
                <p className="card-text">Year: {car.years}</p>
                <p className="card-text">Price per Day: {car.pricePerDay}</p>
                <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
