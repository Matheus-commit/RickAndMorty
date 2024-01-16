import React, { useState, useEffect } from 'react';

function EpisodeDetails() {
    const [episodeData, setEpisodeData] = useState(null);
    const [characterDetails, setCharacterDetails] = useState([]);

    useEffect(() => {
        const fetchEpisodeData = async () => {
            try {
                const response = await fetch('https://rickandmortyapi.com/api/episode/20');
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                const data = await response.json();
                setEpisodeData(data);

                // Para cada URL de personagem, faça uma nova solicitação
                const characterPromises = data.characters.map(async (characterUrl) => {
                    const characterResponse = await fetch(characterUrl);
                    if (!characterResponse.ok) {
                        throw new Error(`Erro na solicitação do personagem: ${characterResponse.status}`);
                    }
                    const characterData = await characterResponse.json();
                    return characterData;
                });

                // Aguarde todas as solicitações de personagens serem concluídas
                const characters = await Promise.all(characterPromises);
                setCharacterDetails(characters);
            } catch (error) {
                console.error('Erro ao buscar dados do episódio ou personagens:', error);
            }
        };

        fetchEpisodeData();
    }, []);

    const containerStyle = {
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const titleStyle = {
        color: '#333',
    };

    const subtitleStyle = {
        color: '#333',
        marginTop: '0',
    };

    const listItemStyle = {
        marginBottom: '10px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Detalhes do Episódio</h1>
            {episodeData && (
                <div>
                    <h2 style={titleStyle}>{episodeData.name}</h2>
                    <p style={listItemStyle}>Data de Lançamento: {episodeData.air_date}</p>
                    <p style={listItemStyle}>Episódio: {episodeData.episode}</p>

                    <h3 style={subtitleStyle}>Personagens:</h3>
                    <ul style={{ padding: '0', listStyleType: 'none' }}>
                        {characterDetails.map((character, index) => (
                            <li key={index} style={listItemStyle}>
                                <img src={character.image} alt={character.name} /> - <strong>{character.name}</strong> - {character.species}, {character.status},
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default EpisodeDetails;