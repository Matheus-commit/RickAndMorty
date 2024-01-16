import React, { useState, useEffect } from 'react';

function Planets() {

    const locationsUrl = 'https://rickandmortyapi.com/api/location';

    const [locationsData, setLocationsData] = useState([]);

    useEffect(() => {
        fetch(locationsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setLocationsData(data.results))
            .catch(error => console.error('Erro ao buscar dados:', error));
    }, [locationsUrl]);

    return (
        <div className="locations-container">
            <h1>Planetas e Dimensões</h1>
            {locationsData.length > 0 ? (
                <ul className="locations-list">
                    {locationsData.map(location => (
                        <li key={location.id}>
                            <h2>{location.name}</h2>
                            <p>Type: {location.type}</p>
                            <p>Dimension: {location.dimension}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    );
}

export default Planets;