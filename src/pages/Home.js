import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';

const Home = () => {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.data);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data } = await axios.get("http://localhost:8002/api/cars/all", {
          withCredentials: true // Inclure les cookies dans la requête
        });
        console.log('Fetched car data:', data);
        dispatch(FETCH_SUCCESS(data));
      } catch (error) {
        dispatch(FETCH_FAILURE(error.message));
        console.log('Error fetching car data:', error);
      }
    };

    fetchCar();
  }, [dispatch]);

  return (
    <div className="container">
      <div className="row">
        {cars.map((car, index) => (
          <div key={index} className="col-md-4 card-container">
            <div className="card h-100">
              {car.CarImages && car.CarImages.length > 0 ? (
                <img
                  src={`http://localhost:8002${car.CarImages[0].imageURL}`}
                  className="card-img-top"
                  alt={`${car.brand} ${car.model}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              ) : (
                <img
                  src="/images/default.png"
                  className="card-img-top"
                  alt="Default"
                  style={{ width: '100%', height: 'auto' }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{car.brand} {car.model}</h5>
                <p className="card-text">Registration Plate: {car.registrationPlate}</p>
                <p className="card-text">Year: {car.years}</p>
                <p className="card-text">Price per Day: {car.pricePerDay}</p>
                <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { FETCH_SUCCESS, FETCH_FAILURE } from '../redux/reducers/sliceCar';


// const Home = () => {
//   const dispatch = useDispatch();
//   const cars = useSelector((state) => state.car.data);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8002/api/cars/all");
//         console.log('Fetched car data:', data);
//         dispatch(FETCH_SUCCESS(data));
//       } catch (error) {
//         dispatch(FETCH_FAILURE(error.message));
//         console.log('Error fetching car data:', error);
//       }
//     };

//     fetchCar();
//   }, [dispatch]);

//   return (
//     <div className="container">
//       <div className="row">
//         {cars.map((car, index) => (
//           <div key={index} className="col-md-4 card-container"> {/* Utilisation de la classe CSS personnalisée */}
//             <div className="card h-100" style={{ width: '18rem' }}> {/* h-100 pour une hauteur uniforme */}
//               {car.CarImages && car.CarImages.length > 0 ? (
//                 <img
//                   src={`http://localhost:8002${car.CarImages[0].imageURL}`}
//                   className="card-img-top"
//                   alt={`${car.brand} ${car.model}`}
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//               ) : (
//                 <img
//                   src="/images/default.png"
//                   className="card-img-top"
//                   alt="Default"
//                   style={{ width: '100%', height: 'auto' }}
//                 />
//               )}
//               <div className="card-body">
//                 <h5 className="card-title">{car.brand} {car.model}</h5>
//                 <p className="card-text">Registration Plate: {car.registrationPlate}</p>
//                 <p className="card-text">Year: {car.years}</p>
//                 <p className="card-text">Price per Day: {car.pricePerDay}</p>
//                 <p className="card-text">Available: {car.available ? 'Yes' : 'No'}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
