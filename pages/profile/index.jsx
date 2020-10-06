import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { FiPower, FiTrash } from 'react-icons/fi';
import api from '../../libs/api';
import {
  Container, Header, IncidentList, IncidentItem,
} from '../../styles/profile.style';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const router = useRouter('');

  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      },
    }).then((res) => {
      setIncidents(res.data);
    });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert('Oh no! Erro ao deletar, tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();

    router.push('/');
  }

  return (
    <Container>
      <Head>
        <title>Together - Profile</title>
      </Head>
      <Header>
        <img src="images/static/logo.svg" alt="Together" />
        <span>
          Bem vindo(a),
          {' '}
          {ongName}
        </span>

        <Link href="/new-incidents">
          <a className="button">Cadastrar novo caso</a>
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#217eeb" />
        </button>
      </Header>

      <h1>Casos Cadastrados</h1>

      <IncidentList>
        {incidents.map((incident) => (
          <IncidentItem key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash size={20} color="#a8a8b3" />
            </button>
          </IncidentItem>
        ))}
      </IncidentList>
    </Container>
  );
}
