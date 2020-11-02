import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  //criando um array de dependencias com useState;
  const [repositories, setRepositories] = useState([]);

  //disparar funçoes qnd tiver informação alterada
  //é preciso dois parametros: qual e quando;
    useEffect(() => {
      api.get('repositories').then(response => {
        setRepositories(response.data);
      });
    }, []);
  //listando?

  async function handleAddRepository() {
    // TODO
    //colocando o novo projeto na lista
    const response = await api.post('repositories', {
      title: `Novo repo ${Date.now()}`
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
    }

  return (
    <div>
      <ul data-testid="repository-list">        
      {repositories.map((repository) => (
                    <li key={repository.id}>
                        {repository.title}
                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
