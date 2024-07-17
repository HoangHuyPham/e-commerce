import React from 'react';
import { Card } from 'react-bootstrap';

const CheckOutItem = ({ item }) => {
    return (
        <Card>
            <Card.Img variant="top" src={item.url} className="img-fluid" />
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                    })}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CheckOutItem;
