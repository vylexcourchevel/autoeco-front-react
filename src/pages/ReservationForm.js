import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <Card>
            <Card.Img 
                variant="top" 
                src="https://via.placeholder.com/100" 
                alt="Car Image" 
                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: 'auto' }} 
            />
            <Card.Body>
                <h3>Votre réservation</h3>
                <Form>
                    <Form.Group controlId="formCarName">
                        <Form.Label>Nom de la voiture</Form.Label>
                        <Form.Control type="text" placeholder="Entrez le nom de la voiture" />
                    </Form.Group>

                    <Form.Group controlId="formCarModel">
                        <Form.Label>Modèle</Form.Label>
                        <Form.Control type="text" placeholder="Entrez le modèle de la voiture" />
                    </Form.Group>

                    <Form.Group controlId="formPrice">
                        <Form.Label>Prix</Form.Label>
                        <Form.Control type="text" placeholder="Entrez le prix" />
                    </Form.Group>

                    <Form.Group controlId="formDuration">
                        <Form.Label>Durée de location</Form.Label>
                        <div>
                            <DatePicker
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                placeholderText="Date de début"
                                className="form-control"
                            />
                            <DatePicker
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                placeholderText="Date de fin"
                                className="form-control mt-2"
                            />
                        </div>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Enregistrer
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ReservationForm;
