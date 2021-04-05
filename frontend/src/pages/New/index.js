import React, { useState, useMemo } from 'react';
import './styles.css'
import camera from '../../assets/camera.svg'
import api from '../../services/api'

export default function New({ history }){

    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() =>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(e){
        e.preventDefault();

        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        const user_id = localStorage.getItem('user')

        await api.post('/spot', data, {
            headers:{
                user_id
            }
        });

        history.push('/dashboard');

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label 
                    id="thumbnail"
                    style={{
                        backgroundImage: `url('${preview}')`
                    }}
                    className={thumbnail ? 'has-thumbnail' : ''}>
                    <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                    <img src={camera} alt="selecione uma imagem" />
                </label>
                <label htmlFor="company">EMPRESA *</label>
                <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)} />

                <label htmlFor="techs">Técnologias *<span>(separadas por vírgula)</span></label>
                <input
                    id="techs"
                    type="text"
                    value={techs}
                    onChange={(e) => setTechs(e.target.value)} />
                <label htmlFor="price">Preço *<span>(por dia)</span></label>
                <input
                    id="price"
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <button className="btn" type="submit">Cadastrar Spot</button>
            </form>
        </>
    );    

}