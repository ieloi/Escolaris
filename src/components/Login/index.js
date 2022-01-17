import React, { useState, useRef } from "react";
import { Card, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import { useHistory } from "react-router-dom";

const Login = () => {

    const history = useHistory();
    const [spinner, setspinner] = useState(false);
    const notificationAlertRef = useRef(null); //usado pelo template para gerar notificações

    const usuariosCadastradosSistema = [
        {
            id: 1,
            nome: 'teste',
            email: 'teste@email.com',
            senha: '1234',
            token: '81dc9bdb52d04dc20036dbd8313ed055'
        },
        {
            id: 2,
            nome: 'admin',
            email: 'admin@hotmail.com',
            senha: 'admin',
            token: '21232f297a57a5a743894a0e4a801fc3'
        }
    ]

    let dadosUsuario = {
        nome: '',
        email: '',
        senha: ''
    }

    const [dadosLogin, setdadosLogin] = useState(dadosUsuario);

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

    const handleChange = (e) => {
        let { name, value } = e.target;

        setdadosLogin({ ...dadosLogin, [name]: value });
    }

    const buscarUsuarioNaLista = () => {

        let usuarioEncontrado = null;

        usuariosCadastradosSistema.filter(usuario => {
            if (usuario.email == dadosLogin.email && usuario.senha == dadosLogin.senha) {
                usuarioEncontrado = usuario;
                return;
            }
        });

        return usuarioEncontrado;
    }

    const verificarDados = (e) => {
        e.preventDefault();

        setspinner(true)

        setTimeout(() => {
            if (dadosLogin.email == "" || dadosLogin.senha == "") {
                notify("tr", "danger", "os campos de email e senha devem ser preenchidos");
                setspinner(false);
            } else {
                const userEncontrado = buscarUsuarioNaLista();

                if (userEncontrado == null) {
                    notify("tr", "danger", "email e/ou senha inválidos ou não cadastrados");
                    setspinner(false);
                } else {
                    setdadosLogin({ ...dadosLogin, nome: userEncontrado.nome });
                    window.sessionStorage.setItem('credenciais-usuario', JSON.stringify({ nome: userEncontrado.nome, token: userEncontrado.token }));
                    setspinner(false);
                    history.push("/admin/sobre");
                }
            }
        }, 1000);
    }


    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container>
                <Row style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className="p-3" style={{ width: '320px' }}>
                        <Card.Title as="h3" className="mb-3 mt-2">Login Escolaris</Card.Title>
                        <Form onSubmit={verificarDados}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="emailUsuario">Email:</Form.Label>
                                <Form.Control type="email" id="emailUsuario" name="email" placeholder="ex: loremipsum@email.com" value={dadosLogin.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="senhaUsuario">Senha:</Form.Label>
                                <Form.Control type="password" id="senhaUsuario" name="senha" placeholder="Ex: 1234" value={dadosLogin.senha} onChange={handleChange} />
                            </Form.Group>


                            <Button className="mt-1 mb-2" variant="primary btn-fill" type="submit" style={{ width: '100%' }}>
                                Acessar sistema
                            </Button>
                        </Form>
                    </Card>
                </Row>
            </Container>
            {spinner && <Spinner animation="grow" style={{ position: 'absolute', left: '50%', top: '50%', width: '40px', height: '40px', marginLeft: '-40px', marginTop: '-40px' }} />}
        </>
    )
}

export default Login;