import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Components/RickAndMortyCharacter.css';

function RickAndMortyCharactes() {

    //" Api BackEnd que nao funcionou"

    // const [data, setData] = useState([]);
    // const apiToken = '76413a1a-b806-4c5b-bc18-fe977029ac2f'; // Substitua 'seu-token-aqui' pelo token real da sua API

    // useEffect(() => {
    //     // Substitua 'sua-api-aqui' pela URL real da sua API
    //     fetch('/laboratorios', {
    //         headers: {
    //             'Authorization': `Bearer ${apiToken}`,
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => setData(data))
    //         .catch(error => alert('Erro ao buscar dados:', error));
    // }, [apiToken]);

    const [characterData, setCharacterData] = useState(null);
    const characterUrl = 'https://rickandmortyapi.com/api/character/26';

    useEffect(() => {
        fetch(characterUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setCharacterData(data)) //<-- local onde as informações da API irão para variavel 'CharacterData'
            .catch(error => alert('Erro para buscar dados, verifique o servidor ou URL'));
    }, [characterUrl]);

    return (
        <div>
            {/* <h1>Dados da API</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>Data</th>
                        <th>Laboratório</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>

                        </tr>
                    ))}
                </tbody>
            </table> */}

            <h1>Detalhes do Personagem</h1>
            {characterData ? (
                <div>
                    <h2>{characterData.name}</h2>
                    <img src={characterData.image} alt={characterData.name} />
                    <p>Status: {characterData.status}</p>
                    <p>Espécie: {characterData.species}</p>
                    <p>Gênero: {characterData.gender}</p>

                    <Link to="/planets">
                        <button>Ver Planetas</button>
                    </Link>
                    <Link to="/episodes">
                        <button>Ver Episodios</button>
                    </Link>
                </div>
            ) : (
                <p>Carregando...</p>
            )}

        </div>
    );
}

export default RickAndMortyCharactes;