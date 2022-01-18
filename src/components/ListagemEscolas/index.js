import React, { useState, useRef } from "react";
import { Card, Container, Row, Table, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import { useFormik } from 'formik';

const ListagemEscolas = () => {

    const url = `http://apiteste.felixsapp.com/educacao.php?request=`;

    const listaEstados = [
        { name: 'Acre', value: 'ac' },
        { name: 'Alagoas', value: 'al' },
        { name: 'Amapá', value: 'ap' },
        { name: 'Amazonas', value: 'am' },
        { name: 'Bahia', value: 'ba' },
        { name: 'Ceará', value: 'ce' },
        { name: 'Espírito Santo', value: 'es' },
        { name: 'Goiás', value: 'go' },
        { name: 'Maranhão', value: 'ma' },
        { name: 'Mato Grosso', value: 'mt' },
        { name: 'Mato Grosso do Sul', value: 'ms' },
        { name: 'Minas Gerais', value: 'mg' },
        { name: 'Pará', value: 'pa' },
        { name: 'Paraíba', value: 'pb' },
        { name: 'Paraná', value: 'pr' },
        { name: 'Pernambuco', value: 'pe' },
        { name: 'Piauí', value: 'pi' },
        { name: 'Rio de Janeiro', value: 'rj' },
        { name: 'Rio Grande do Norte', value: 'rn' },
        { name: 'Rio Grande do Sul', value: 'rs' },
        { name: 'Rondonia', value: 'ro' },
        { name: 'Roraima', value: 'rr' },
        { name: 'Santa Catarina', value: 'sc' },
        { name: 'São Paulo', value: 'sp' },
        { name: 'Sergipe', value: 'se' },
        { name: 'Tocantins', value: 'to' },
        { name: 'Distrito Federal', value: 'df' }
    ];

    const [listaMunicipios, setlistaMunicipios] = useState(null);
    const [resultadosEncontrados, setresultadosEncontrados] = useState(null);
    const [estadoSelecionado, setestadoSelecionado] = useState('');
    const [esconderInputMunicipio, setesconderInputMunicipio] = useState(true); //habilita ou desabilita o input
    const notificationAlertRef = useRef(null); //usado pelo template para gerar notificações
    const [spinner, setspinner] = useState(false);

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

    async function buscarMunicipios(endpoint) {
        setspinner(true);
        try {
            const { data } = await axios.get(`${url}${endpoint}`);
            const lista_municipios_modificada = data.map(municipio => municipio.split(':'));
            setlistaMunicipios(lista_municipios_modificada);
        } catch (error) {
            notify("tr", "danger", "Não foi possivel realizar a busca de Municipios");
        }
        setspinner(false);
    }

    async function buscarEscolasAPI(endpoint) {
        setspinner(true);
        try {
            const { data } = await axios.get(`${url}${endpoint}`);
            setresultadosEncontrados(data[1]);
        } catch (error) {
            notify("tr", "danger", "Não foi possivel realizar a busca de Escolas");
        }
        setspinner(false)
    }

    const handleChangeEstado = (e) => {
        const { value } = e.target;

        if (value != "") {
            setestadoSelecionado(value);
            let endopint_estado = `api/cidades/${value}`;
            buscarMunicipios(endopint_estado);
            setesconderInputMunicipio(false);
        } else {
            setestadoSelecionado(value);
            setesconderInputMunicipio(true);
        }

    }

    const pesquisarEscolas = values => {

        let busca = ``;

        if (values.nome.length >= 3 && values.municipio != "") {
            busca = `api/escolas/buscaavancada?cidade=${values.municipio}&nome=${values.nome}`;
            buscarEscolasAPI(busca);
        } else if (values.nome.length >= 3 && values.municipio == "") {
            busca = `api/escolas?nome=${values.nome}`;
            buscarEscolasAPI(busca);
        } else if ((values.nome.length < 3 || values.nome == "") && values.municipio != "") {
            busca = `api/escolas/buscaavancada?cidade=${values.municipio}`;
            buscarEscolasAPI(busca);
        }

        setestadoSelecionado('');
        setesconderInputMunicipio(true);
    }

    //Validação de dados com o Formik
    const validate = values => {
        const errors = {}

        if ((values.nome.length < 4 || !values.nome) && !values.municipio) {
            errors.ambos = "Para a busca ser realizada é necessario preencher o nome (4 ou mais letras) e/ou escolher um municipio"
        }

        return errors;
    }

    //Criação de Formulário com o Formik
    const formik = useFormik({
        initialValues: {
            nome: '',
            municipio: ''
        },
        validate,
        onSubmit: (values, { resetForm }) => {
            pesquisarEscolas(values);
            resetForm();
        }
    });

return (<>
    <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
    </div>
    <Container fluid>
        <Row>
            <Card className="w-100 p-3">
                <Card.Title as="h3" className="mb-3 mt-2">Pesquisar Escola</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">A pesquisa pode ser realizada de 3 formas: Pelo nome, Pelo nome e municipio e somente pelo municipio</Card.Subtitle>
                <Form onSubmit={formik.handleSubmit}>
                    {formik.errors.ambos ? (
                        <div className="text-muted text-danger">
                            {formik.errors.ambos}
                        </div>
                    ) : null}
                    <Row>
                        <Form.Group as={Col} md="6" className="mb-3">
                            <Form.Label htmlFor="nomeEscola">Nome da Escola:</Form.Label>
                            <Form.Control type="text" id="nomeEscola" name="nome" placeholder="Ex: Escola Lorem Ipsum" onChange={formik.handleChange} value={formik.values.nome} />
                        </Form.Group>

                        <Form.Group as={Col} md="3" className="mb-3">
                            <Form.Label htmlFor="selectEstado">Estado da Escola</Form.Label>
                            <Form.Control id="selectEstado" name="estado" as="select" onChange={handleChangeEstado} value={estadoSelecionado} >
                                <option value="">Selecione uma opção:</option>
                                {
                                    listaEstados.map(estado => (
                                        <option key={estado.value} value={estado.value}>{estado.name}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} md="3" className="mb-3" hidden={esconderInputMunicipio}>
                            <Form.Label htmlFor="selectMunicipio">municipio da Escola</Form.Label>
                            <Form.Control id="selectMunicipio" name="municipio" as="select" onChange={formik.handleChange} value={formik.values.municipio} >
                                <option value="">Selecione uma opção:</option>
                                {
                                    listaMunicipios && listaMunicipios.map(municipio => (
                                        <option key={municipio[0]} value={municipio[0]}>{municipio[1]}</option>
                                    ))
                                }
                            </Form.Control>
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
                    <Card.Title as="h3" className="mb-3 mt-2">Resultados Encontrados</Card.Title>
                    <Table className="table-hover" responsive="sm">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Estado</th>
                                <th>Cidade</th>
                                <th>Dependencia Administrativa</th>
                                <th>Situacao de Funcionamento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultadosEncontrados && resultadosEncontrados.map(escola => (
                                <tr key={escola.cod}>
                                    <td>{escola.nome}</td>
                                    <td>{escola.estado}</td>
                                    <td>{escola.cidade}</td>
                                    <td>{escola.dependenciaAdministrativaTxt}</td>
                                    <td>{escola.situacaoFuncionamentoTxt}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Row>
    </Container>
    {spinner && <Spinner animation="grow" style={{ position: 'absolute', left: '45%', top: '50%', width: '40px', height: '40px' }} />}
</>)
}

export default ListagemEscolas;