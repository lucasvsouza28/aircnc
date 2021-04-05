import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){
    const [email, setEmail] = useState('');

    return(
        <>
            <p>
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-mail</label>
            <input
                id="email"
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}></input>
            <button className="btn">Entrar</button>
            </form>
        </>     
    );

    async function handleSubmit(e){
        e.preventDefault();
    
        const resp = await api.post('/user', {
          email
        });
    
        const { _id } = resp.data;
    
        if (_id){
          localStorage.setItem('user', _id);

          history.push('/dashboard');
        }
    
      }

}