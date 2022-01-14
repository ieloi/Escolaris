import React, { useState, useRef } from "react";
import { Card, Container, Row, Table, Col, Form, Button, Spinner, Alert } from "react-bootstrap";

import NotificationAlert from "react-notification-alert";

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

    let escola_cadastrar = {
        id: 0,
        nome: '',
        diretor: '',
        localizacao: '',
        turnos: null
    }

    const [listaEscolas, setlistaEscolas] = useState(escolas_cadastradas);
    const [novaEscola, setNovaEscola] = useState(escola_cadastrar);
    const [checkboxTurnos, setcheckboxTurnos] = useState([]); //Array que guarda a lista de turnos
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

    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if ((name === 'turnosM' || name === 'turnosT' || name === 'turnosN' || name === 'turnosI') && checked === true) {
            checkboxTurnos.push(value);
            setcheckboxTurnos(checkboxTurnos);
            setNovaEscola({ ...novaEscola, turnos: checkboxTurnos });
        } else if ((name === 'turnosM' || name === 'turnosT' || name === 'turnosN' || name === 'turnosI') && checked === false) {
            checkboxTurnos.splice(checkboxTurnos.indexOf(value), 1);
            setcheckboxTurnos(checkboxTurnos);
            setNovaEscola({ ...novaEscola, turnos: checkboxTurnos });
        } else {
            setNovaEscola({ ...novaEscola, [name]: value });
        }
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

    const cadastrarEscola = (e) => {
        e.preventDefault();

        setspinner(true);

        if (novaEscola.nome == '' || novaEscola.localizacao == '' || novaEscola.turnos == null) {
            setTimeout(() => {
                notify("tr", "danger", "todos os campos (com exceção do diretor) são de preenchimento obrigatório");
                setspinner(false);
            }, 1000)
        } else {
            setTimeout(() => {
                let novoId = parseInt(listaEscolas.length);

                setNovaEscola({ ...novaEscola, id: novoId + 1 });

                const listaEscolasNovo = [...listaEscolas, {
                    id: novoId,
                    ...novaEscola
                }];

                setlistaEscolas(listaEscolasNovo);

                //limpeza dos campos pertencentes ao formulario 
                setNovaEscola({ nome: '', diretor: '', localizacao: '', turnos: null });
                setcheckboxTurnos([]);
                e.target.turnosM.checked = false;
                e.target.turnosT.checked = false;
                e.target.turnosN.checked = false;
                e.target.turnosI.checked = false;

                setspinner(false);

                notify("tr", "success", "Escola gravada com sucesso");
            }, 1000);
        }
    }

    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container fluid>
                <Row>
                    <Card className="w-100 p-3">
                        <Card.Title as="h3" className="mb-3 mt-2">Cadastrar Escola</Card.Title>
                        <Form onSubmit={cadastrarEscola}>
                            <Row>
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label htmlFor="nomeEscola">Nome da Escola:</Form.Label>
                                    <Form.Control type="text" id="nomeEscola" name="nome" placeholder="Ex: Escola Lorem Ipsum" onChange={handleChange} value={novaEscola.nome} />
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label htmlFor="nomeDiretor">Nome do Diretor:</Form.Label>
                                    <Form.Control type="text" id="nomeDiretor" name="diretor" placeholder="Ex: lorenzo ipsolium" onChange={handleChange} value={novaEscola.diretor} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label htmlFor="selectLocalizacao">Localização da Escola</Form.Label>
                                    <Form.Control id="selectLocalizacao" name="localizacao" as="select" onChange={handleChange} value={novaEscola.localizacao} >
                                        <option value="">Selecione uma opção:</option>
                                        <option value="1">Urbana</option>
                                        <option value="2">Rural</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} md="6" className="mb-3">
                                    <Form.Label>Turnos da Escola (Selecione uma ou mais opções)</Form.Label>
                                    <br />
                                    <div className="pl-3">
                                        <input type="checkbox" id="turnoManha" name="turnosM" value="M" onChange={handleChange} />
                                        <label htmlFor="turnoManha">&nbsp;&nbsp;Manhã</label>
                                        <br />

                                        <input type="checkbox" id="turnoTarde" name="turnosT" value="T" onChange={handleChange} />
                                        <label htmlFor="turnoTarde">&nbsp;&nbsp;Tarde</label>
                                        <br />

                                        <input type="checkbox" id="turnoNoite" name="turnosN" value="N" onChange={handleChange} />
                                        <label htmlFor="turnoNoite">&nbsp;&nbsp;Noite</label>
                                        <br />

                                        <input type="checkbox" id="turnoIntegral" name="turnosI" value="I" onChange={handleChange} />
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