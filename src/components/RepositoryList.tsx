import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss'  
import { useState, useEffect } from "react";


interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList(){
  // como demora um pouco para a api nos responder, devemos fazer com que
  // nossa app fique pronta pra atualizar os dados quando eles estiverem prontos
  // para isso utilizamos o useState
  const [repositories, setRepositores] = useState<Repository[]>([]); 

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/repos')
      .then(response => response.json())
      .then(data => setRepositores(data))
  }, [])

  return (
    <section className="repository-list">
      <h1>Lista de repositórios</h1>
        <ul>
          {repositories.map(repository => {
          return <RepositoryItem key={repository.name} repository={repository}/>
          })}
        </ul>
    </section>
  )
}