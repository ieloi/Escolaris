import React from "react";

import { Container, Row, Col, Card, ListGroup, Button } from "react-bootstrap";

const Sobre = () => {
    return (<>
        <Container fluid>
            <Row className="justify-content-around">
                <Card className="p-3 card-user" as={Col} md="5">
                    <Card.Title className="mb-5" as="h4">Sobre Mim</Card.Title>
                    <Card.Body className="mt-3">
                        <div className="author">
                            <img className="avatar border-gray" src="https://avatars.githubusercontent.com/u/42556420?v=4" />
                            <h5 className="title">Ícaro Matheus Eloi do Nascimento</h5>
                            <p className="description">Bacharel em Ciência da Computação - UESPI</p>
                        </div>
                        <div className="text-center">
                            <p className="description">Gosto de Desenvolvimento Front-End/Web e Experiência do Usuário. E no tempo livre gosto de Assistir Séries</p>
                        </div>
                    </Card.Body>
                    <hr />
                    <div className="button-container mr-auto ml-auto">
                        <Button
                            className="btn-simple btn-icon"
                            href="https://github.com/ieloi"
                            variant="link"
                            target="_blank"
                        >
                            <i className="fab fa-github"></i>
                        </Button>
                        <Button
                            className="btn-simple btn-icon"
                            href="https://www.linkedin.com/in/icaro-eloi/"
                            variant="link"
                            target="_blank"
                        >
                            <i className="fab fa-linkedin"></i>
                        </Button>
                    </div>
                </Card>
                <Card className="p-3" as={Col} md="5">
                    <Card.Title as="h4">Tecnologias Utilizadas</Card.Title>
                    <ListGroup className="m-3">
                        <ListGroup.Item action href="https://pt-br.reactjs.org/" target="_blank">
                            <i className="fab fa-react mr-2"></i>React.Js
                        </ListGroup.Item>
                        <ListGroup.Item action href="https://react-bootstrap.github.io/" target="_blank">
                            <i className="fab fa-bootstrap mr-2"></i>React Bootstrap
                        </ListGroup.Item>
                        <ListGroup.Item action href="https://axios-http.com/" target="_blank">
                            <i className="fab fa-safari mr-2"></i>Axios
                        </ListGroup.Item>
                        <ListGroup.Item action href="https://formik.org/" target="_blank">
                            <i className="fab fa-wpforms mr-2"></i>Formik
                        </ListGroup.Item>
                        <ListGroup.Item action href="https://www.creative-tim.com/product/light-bootstrap-dashboard-react" target="_blank">
                            <i className="far fa-window-maximize mr-2"></i>Light Bootstrap Dashboard React Template
                        </ListGroup.Item>
                        <ListGroup.Item action href="https://fontawesome.com/" target="_blank">
                            <i className="fab fa-font-awesome mr-2"></i>Font Awesome Icons
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <Card className="p-3" as={Col} md="5">
                    <Card.Title as="h4">Dificuldades Encontradas</Card.Title>
                    <Card.Text className="m-3 description">
                        Algumas das principais dificuldades que tive foram relacionadas principalmente a parte de autenticação, pois era uma parte que pouco havia estudado sobre, e os conhecimentos que tinha sobre manipulação de rotas com o react-router-dom eram muito limitados.<br />
                        Além disso lidar com o template também foi um problema, pois quase todos os templates que encontrava eram muito complexos para que eu pudesse entender o funcionamento deles (considerando o tempo que tinha disponível e as outras atividades a serem feitas).
                    </Card.Text>
                </Card>
                <Card className="p-3" as={Col} md="5">
                    <Card.Title as="h4">Sugestões</Card.Title>
                    <div className="mt-3 mb-3 pr-3 description">
                        <ul>
                            <li>Na tela de Cadastro de Escolas poderia ser implementado as funções de edição e deleção de informações.</li>
                            <li>Na tela de pesquisa de escolas, quando os itens fossem retornados poderia ser adicionado um botão com mais informações, que levaria a uma outra tela que poderia detalhar mais informações sobre a escola selecionada.</li>
                            <li>Poderia ser criado uma tela de Cadastro de novos usuários para se adicionar ao sistema.</li>
                            <li>E uma tela de dashboard que buscasse os dados de estatisticas das escolas buscando os dados da API</li>
                        </ul>
                    </div>
                </Card>
            </Row>
        </Container>
    </>)
}

export default Sobre;