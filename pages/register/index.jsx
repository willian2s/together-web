import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../libs/api';
import {
  Container, Content, Description, InputGroup,
} from '../../styles/register.style';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const router = useRouter('');

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const res = await api.post('ongs', data);

      alert(`Seu ID é: ${res.data.id}. Anote em um lugar seguro, pois o mesmo é utilizado para realizar o acesso na nossa plataforma`);

      router.push('/');
    } catch (error) {
      alert('Oh no! Erro no cadastro, tente novamente');
    }
  }

  return (
    <Container>
      <Head>
        <title>Together - Cadastro</title>
      </Head>
      <Content>
        <Description>
          <img src="images/static/logo.svg" alt="Together" />

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem casos da sua ONG.</p>

          <Link href="/">
            <a className="back-link">
              <FiArrowLeft size={16} color="#217eeb" />
              Voltar pra Logon
            </a>
          </Link>
        </Description>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <InputGroup>
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </InputGroup>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Container>
  );
}
