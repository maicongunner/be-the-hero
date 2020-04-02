import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../Services/api';
import { toast } from 'react-toastify';

import { FiLogIn } from 'react-icons/fi';

import { LogonContainer, FormContainer } from './styles';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png'; 

export default function Logon() {

  const [id, setId] = useState('');
  const idRef = useRef();
  const [idError, setIdError] = useState(false);

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      
      const response = await api.post('/sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');

    } catch (error) {      
      setIdError(true);
      toast.error('Favor informar um ID válido');
      idRef.current.focus();
    }
  }

  return (
    <LogonContainer>
      <FormContainer className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            name="id"
            placeholder="Sua ID" 
            value={id} 
            className={ idError ? 'input-error' : '' }
            onChange={e => setId(e.target.value)} 
            ref={idRef}
          />
          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form> 
      </FormContainer>

      <img src={heroesImg} alt="Heores"/>
    </LogonContainer>
  );
}
