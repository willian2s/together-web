import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { FiLogIn } from 'react-icons/fi'; import api from '../libs/api';
import { Container, Form } from '../styles/home';

export default function Home() {
  const [id, setId] = useState('');
  const history = useRouter('');

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);

      history.push('/profile');
    } catch (error) {
      alert('Oh no! Falha no login, tente novamente');
    }
  }

  return (
    <Container>
      <Head>
        <title>Together</title>
      </Head>
      <Form>
        <img src="images/static/logo.svg" alt="Together" />

        <form onSubmit={handleLogin}>
          <input
            placeholder="Seu ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link href="/register">
            <a className="back-link">
              <FiLogIn size={16} color="#217eeb" />
              Não tenho cadastro
            </a>
          </Link>
        </form>
      </Form>

      <img src="images/static/heroes.png" alt="Heroes" />
    </Container>
  );
}
