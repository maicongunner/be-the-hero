import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '../../Services/api';

import logoImg from '../../assets/logo.svg';

import { ProfileContainer } from  './styles';

export default function Profile() {

  const ongName = localStorage.getItem('ongName');
  const ongID = localStorage.getItem('ongId');

  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongID
      }
    }).then( response => {
      setIncidents(response.data);
    })
  },[ongID]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongID
        }
      });      
      setIncidents(incidents.filter(incident => incident.id !== id));
      toast.success('Caso excluído com sucesso!');
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 10000 });
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <ProfileContainer>
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button type="submit" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>

      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>

    </ProfileContainer>
  );
}
