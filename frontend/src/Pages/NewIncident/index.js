import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../Services/api';
import { toast } from 'react-toastify';
import TextInputMask from 'react-masked-text';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { NewIncidentContainer} from './styles';

export default function NewIncident() {

  const ongID = localStorage.getItem('ongId');

  const history = useHistory();

  const RegisterSchema = Yup.object().shape({
    title: Yup.string()
    .min(5, 'Informe no mínimo 10 caracteres')
    .max(100, 'Informe no máximo 100 caracteres')
    .required('Campo obrigatório'),
    description: Yup.string()
      .min(10, 'Informe no mínimo 10 caracteres')
      .max(500, 'Informe no máximo 500 caracteres')
      .required('Campo obrigatório'),
    value: Yup.string()
    .required('Campo obrigatório')
  });

  async function handleNewIncident(values) {
    
    const {title, description, value } = values;

    const valueNew = Number(value.replace(/\.|R\$/g, '').replace(/,/g, '.'));

    const data = {
      title,
      description,
      value: valueNew,
    };

    try {
      await api.post('/incidents', data, {
        headers: {
          Authorization: ongID,
        }        
      }); 
      toast.success('Caso cadastrado com sucesso!');
      history.push('/profile');
    } catch (error) {
      toast.error(error.response.data, { autoClose: 10000 });
    }

  }

  return (
    <NewIncidentContainer>
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <Formik
          initialValues={{
            title: '',
            description: '',
            value: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleNewIncident}
        >

        {formikProps => (
          <Form autoComplete="off">
            <div className="box-field">
              <Field 
                name="title"
                onChange={formikProps.handleChange('title')}
                onBlur={formikProps.handleBlur('title')}
                placeholder="Título do caso"
                className={ formikProps.errors.title ? 'input-error' : ''}                
              />
              {formikProps.errors.title && formikProps.touched.title ? (
                <span className="message-error">{formikProps.errors.title}</span>
              ) : null}
            </div> 

            <div className="box-field">
              <Field
                component="textarea" 
                name="description"
                onChange={formikProps.handleChange('description')}
                onBlur={formikProps.handleBlur('description')}
                placeholder="Descrição do caso"
                className={ formikProps.errors.description ? 'input-error' : ''}                
              />
              {formikProps.errors.description && formikProps.touched.description ? (
                <span className="message-error">{formikProps.errors.description}</span>
              ) : null}
            </div>   

            <div className="box-field">
              <Field                   
                name="value"
                render={({ field }) => (
                  <TextInputMask      
                    {...field}
                    onChangeText={(text) => field.onChange({target: {value: text, name: "value"}})}               
                    kind={'money'}    
                    options={{
                      format: 'R$ 0,00'
                    }} 
                    placeholder="Valor do caso"      
                    className={ formikProps.errors.value ? 'input-error' : ''}      
                  />
                )}
              />                
              {formikProps.errors.value && formikProps.touched.value ? (
                <span className="message-error">{formikProps.errors.value}</span>
              ) : null}
            </div>
            <button type="submit" className="button">Salvar</button>
          </Form>
        )}
        </Formik>

      </div>
    </NewIncidentContainer>
  );
} 
