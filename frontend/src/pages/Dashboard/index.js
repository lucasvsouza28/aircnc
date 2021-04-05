import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import api from '../../services/api';
import './styles.css'
import io from 'socket.io-client'

export default function Dashboard(){
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = io('http://localhost:3000', { query: { user_id }}, { transports: ['websockets'] });
    
    useEffect(() => {
        socket.on('booking_request', req => {
            console.log('req', req)
            setRequests([...requests, req])
        });
    }, [requests, socket]);

    useEffect(() => {

        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const { data } = await api.get('/dashboard', {
                headers: {
                    user_id
                }
            });

            setSpots(data);
        }

        loadSpots();

    }, []);

    async function handleApprove(id){
        await api.post(`/booking/${id}/approve`);
        setRequests(requests.filter(r => r._id !== id));
    }

    async function handleReject(id){
        await api.post(`/booking/${id}/reject`);
        setRequests(requests.filter(r => r._id !== id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(req => (
                    <li key={req._id}>
                        <p>{req.user.email} está solicitando uma reserva em {req.spot.company} em {req.date}</p>
                        <div>
                            <button className="approve" onClick={() => handleApprove(req._id)}>APROVAR</button>
                            <button className="reject" onClick={() => handleReject(req._id)}>REJEITAR</button>
                        </div>
                    </li>
                ))}
            </ul>

            <ul className="spot-list">
                {
                    spots.map(s =>                        
                        <li key={s._id}>
                            <header style={{
                                backgroundImage: `url('${s.thumbnail_url}')`
                            }}/>
                            <strong>{s.company}</strong>
                            <span>{s.price ? `R$ ${s.price}/dia` : 'GRATUITO'}</span>
                        </li>
                    )
                }
            </ul>

            <Link to="/new">
                <button className="btn">Cadastrar novo spot</button>
            </Link>
        </>
    );

}