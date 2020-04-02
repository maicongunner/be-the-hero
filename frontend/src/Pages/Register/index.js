import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';
import TextInputMask from 'react-masked-text';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import api from '../../Services/api';

import { RegisterContainer } from  './styles';

export default function Register() {

  const history = useHistory();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Informe no mínimo 2 caracteres')
    .max(50, 'Informe no máximo 50 caracteres')
    .required('Campo obrigatório'),
    email: Yup.string()
      .email('Informe um e-mail válido')
      .required('Campo obrigatório'),
    phone: Yup.string()
      .min(12, 'Informe no mínimo 12 caracteres')
      .max(50, 'Informe no máximo 50 caracteres')
      .required('Campo obrigatório'),
    city: Yup.string()
      .min(2, 'Informe no mínimo 2 caracteres')
      .max(50, 'Informe no máximo 50 caracteres')
      .required('Campo obrigatório'),
    uf: Yup.string()
    .min(2, 'Informe no mínimo 2 caracteres')
    .max(2, 'Informe no máximo 2 caracteres')
    .required('Campo obrigatório')
  });

  const handleRegister = async (values) => {
    
    const {name, email, phone, city, uf} = values;

    const whatsapp = phone.replace(/[^0-9]/g,'');

    const data = {
      name,
      email,
      whatsapp,
      city, 
      uf,
    };
    
    try {
      const response = await api.post('ongs', data);                  
      toast.success(`Cadastro realizado com sucesso! Seu ID de acesso: é ${response.data.id}`, { autoClose: 10000 });
      history.push('/');
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 10000 });  
    }
  }

  return (
    <RegisterContainer>
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontraremos casos da sua ONG.</p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>

        <Formik
          initialValues={{
            name: '',
            phone: '',
            email: '',
            city: '',
            uf: ''
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
        
        {formikProps => (
          <Form autoComplete="off">
            <div className="box-field">
              <Field 
                name="name"
                onChange={formikProps.handleChange('name')}
                onBlur={formikProps.handleBlur('name')}
                placeholder="Nome da ONG"
                className={ formikProps.errors.name ? 'input-error' : ''}                
              />
              {formikProps.errors.name && formikProps.touched.name ? (
                <span className="message-error">{formikProps.errors.name}</span>
              ) : null}
            </div>          

            <div className="box-field">    
              <Field 
                type="email"
                name="email"
                placeholder="E-mail"  
                className={ formikProps.errors.email ? 'input-error' : ''}   
                onChange={formikProps.handleChange('email')}
                onBlur={formikProps.handleBlur('email')}
              />
              {formikProps.errors.email && formikProps.touched.email ? (
                <span className="message-error">{formikProps.errors.email}</span>
              ) : null}
            </div>

            <div className="box-field">
              <Field                   
                name="phone"
                render={({ field }) => (
                  <TextInputMask      
                    {...field}
                    onChangeText={(text) => field.onChange({target: {value: text, name: "phone"}})}               
                    kind={'cel-phone'}    
                    placeholder="Whatsapp"      
                    className={ formikProps.errors.phone ? 'input-error' : ''}      
                  />                  
                )}
              />                
              {formikProps.errors.phone && formikProps.touched.phone ? (
                <span className="message-error">{formikProps.errors.phone}</span>
              ) : null}
            </div>

            <div className="input-group">
              <div className="box-field">
                <Field 
                  name="city" 
                  onChange={formikProps.handleChange('city')}
                  onBlur={formikProps.handleBlur('city')}
                  placeholder="Cidade"
                  className={ formikProps.errors.city ? 'input-error' : ''} 
                />
                {formikProps.errors.city && formikProps.touched.city ? (
                  <span className="message-error">{formikProps.errors.city}</span>
                ) : null}      
              </div>
              
              <div className="box-field" style={{ width: 200 }}>
                <Field                      
                  name="uf"
                  onChange={formikProps.handleChange('uf')}
                  onBlur={formikProps.handleBlur('uf')}
                  placeholder="UF"
                  className={ formikProps.errors.uf ? 'input-error' : ''} 
                />
                {formikProps.errors.uf && formikProps.touched.uf ? (
                  <span className="message-error">{formikProps.errors.uf}</span>
                ) : null}        
              </div>
            </div>

            <button type="submit" className="button">Salvar</button>
          </Form>
        )}
        </Formik>
        
      </div>
    </RegisterContainer>
  );
}
