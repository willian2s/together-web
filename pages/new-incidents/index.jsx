import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../libs/api';
import { Container, Content, Form } from '../../styles/new-incident.style';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const router = useRouter();
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        },
      });

      router.push('/profile');
    } catch (error) {
      alert('Oh no! Erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <Container>
      <Head>
        <title>Together - Novo Caso</title>
      </Head>
      <Content>
        <section>
          <img src="images/static/logo.svg" alt="Together" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar o herói para te ajudar a solucionar.</p>

          <Link href="/profile">
            <a className="back-link">
              <FiArrowLeft size={16} color="#217eeb" />
              Voltar para a Home
            </a>
          </Link>
        </section>

        <Form onSubmit={handleNewIncident}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </Form>
      </Content>
    </Container>
  );
}
