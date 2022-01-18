import React, { useState, useRef } from "react";
import { Card, Container, Row, Table, Col, Form, Button, Spinner } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import { useFormik } from 'formik';

const CadastroEscolas = () => {

    let escolas_cadastradas = [
        {
            id: 1,
            nome: 'Escola Charles Xavier',
            diretor: 'Charles Xavier',
            localizacao: 2,
            turnos: ['M', 'T']
        },
        {
            id: 2,
            nome: 'East High School',
            diretor: 'Suzanna Alves',
            localizacao: 1,
            turnos: ['T', 'N']
        },
        {
            id: 3,
            nome: 'Escola Hogwarts',
            diretor: 'Alvo Dumbledore',
            localizacao: 1,
            turnos: ['M', 'T']
        },
        {
            id: 4,
            nome: 'Instituto Shield',
            diretor: 'Nick Fury',
            localizacao: 2,
            turnos: ['I']
        },
    ];

    const [listaEscolas, setlistaEscolas] = useState(escolas_cadastradas);
    const [spinner, setspinner] = useState(false);
    const notificationAlertRef = useRef(null); //usado pelo template para gerar notificações

    const listarTurnos = (listaTurnos) => {

        let turnos = [];

        listaTurnos.forEach(element => {
            switch (element) {
                case 'M':
                    turnos.push('Manhã');
                    break;
                case 'T':
                    turnos.push('Tarde');
                    break;
                case 'N':
                    turnos.push('Noite');
                    break;
                case 'I':
                    turnos.push('Integral');
                    break;
                default:
                    break;
            }
        });

        return turnos;
    }

    //produção dos alertas de sucesso e erro
    const notify = (place, color, message) => {
        let options = {};
        options = {
            place: place,
            message: (
                <div className="mt-3">
                    <p>{message}</p>
                </div>
            ),
            type: color,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        }
        notificationAlertRef.current.notificationAlert(options);
    }

    const cadastrarEscola = values => {

        setspinner(true);

        setTimeout(() => {
            let novoId = parseInt(listaEscolas.length) + 1;

            const listaEscolasNovo = [...listaEscolas, {
                id: novoId,
                ...values
            }];

            setlistaEscolas(listaEscolasNovo);

            setspinner(false);

            notify("tr", "success", "Escola gravada com sucesso");
        }, 1000);

    }

    const validate = values => {
        const errors = {}

        if (values.nome == "" || values.localizacao == "" || values.turnos.length == 0) {
            errors.todos = "Todos os campos (com exceção do nome do diretor) devem ser preenchidos"
        }

        return errors;
    }

    //Criação de Formulário com o Formik
    const formik = useFormik({
        initialValues: {
            nome: '',
            diretor: '',
            localizacao: '',
            turnos: []
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            cadastrarEscola(values);
            resetForm();

            //limpeza dos checkbox de forma manual devido a nao encontrar como limpar o checkbox com o Formik
            document.getElementById('turnoManha').checked = false;
            document.getElementById('turnoTarde').checked = false;
            document.getElementById('turnoNoite').checked = false;
            document.getElementById('turnoIntegral').checked = false;
        }
    });

    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container fluid>
                <Row>
                    <Card className="w-100 p-3">
                        <Card.Title as="h3" className="mb-3 mt-2">Cadastrar Escola</Card.Title>
                        {formik.errors.todos ? (
                            <div className="text-muted text-danger">
                                {formik.errors.todos}
                            </div>
                        ) : null}
                        <Form onSubmit={formik.handleSubmit}>
                            <Row>
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label htmlFor="nomeEscola">Nome da Escola:</Form.Label>
                                    <Form.Control type="text" id="nomeEscola" name="nome" placeholder="Ex: Escola Lorem Ipsum" onChange={formik.handleChange} value={formik.values.nome} />
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label htmlFor="nomeDiretor">Nome do Diretor:</Form.Label>
                                    <Form.Control type="text" id="nomeDiretor" name="diretor" placeholder="Ex: lorenzo ipsolium" onChange={formik.handleChange} value={formik.values.diretor} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label htmlFor="selectLocalizacao">Localização da Escola</Form.Label>
                                    <Form.Control id="selectLocalizacao" name="localizacao" as="select" onChange={formik.handleChange} value={formik.values.localizacao} >
                                        <option value="">Selecione uma opção:</option>
                                        <option value="1">Urbana</option>
                                        <option value="2">Rural</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label>Turnos da Escola (Selecione uma ou mais opções)</Form.Label>
                                    <br />
                                    <div className="pl-3">
                                        <input type="checkbox" id="turnoManha" name="turnos" value="M" onChange={formik.handleChange} />
                                        <label htmlFor="turnoManha">&nbsp;&nbsp;Manhã</label>
                                        <br />

                                        <input type="checkbox" id="turnoTarde" name="turnos" value="T" onChange={formik.handleChange} />
                                        <label htmlFor="turnoTarde">&nbsp;&nbsp;Tarde</label>
                                        <br />

                                        <input type="checkbox" id="turnoNoite" name="turnos" value="N" onChange={formik.handleChange} />
                                        <label htmlFor="turnoNoite">&nbsp;&nbsp;Noite</label>
                                        <br />

                                        <input type="checkbox" id="turnoIntegral" name="turnos" value="I" onChange={formik.handleChange} />
                                        <label htmlFor="turnoIntegral">&nbsp;&nbsp;Integral</label>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Button
                                className="btn-fill pull-right"
                                type="submit"
                                variant="primary"
                            >
                                Enviar Dados
                            </Button>
                        </Form>
                    </Card>
                </Row>

                <Row>
                    <Card className="w-100">
                        <Card.Body className="table-full-width table-responsive">
                            <Card.Title as="h3" className="mb-3 mt-2">Escolas Cadastradas</Card.Title>
                            <Table className="table-hover" responsive="sm">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Diretor</th>
                                        <th>Localização</th>
                                        <th>Turnos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listaEscolas && listaEscolas.map(escola => (
                                        <tr key={escola.id}>
                                            <td>{escola.nome}</td>
                                            <td>{escola.diretor}</td>
                                            <td>{escola.localizacao == 1 ? 'Urbana' : 'Rural'}</td>
                                            <td>{listarTurnos(escola.turnos).join(' / ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            {spinner && <Spinner animation="grow" style={{ position: 'absolute', left: '45%', top: '50%', width: '40px', height: '40px' }} />}
        </>
    )
}

export default CadastroEscolas;