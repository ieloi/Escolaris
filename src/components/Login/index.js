import React, { useState, useRef } from "react";
import { Card, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';

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

    const buscarUsuarioNaLista = values => {

        let usuarioEncontrado = null;

        usuariosCadastradosSistema.filter(usuario => {
            if (usuario.email == values.email && usuario.senha == values.senha) {
                usuarioEncontrado = usuario;
                return;
            }
        });

        return usuarioEncontrado;
    }

    const acessarSistema = values => {
        setspinner(true)

        setTimeout(() => {
            const userEncontrado = buscarUsuarioNaLista(values);

            if (userEncontrado == null) {
                notify("tr", "danger", "email e/ou senha inválidos ou não cadastrados");
                setspinner(false);
            } else {
                window.sessionStorage.setItem('credenciais-usuario', JSON.stringify({ nome: userEncontrado.nome, token: userEncontrado.token }));
                setspinner(false);
                history.push("/admin/sobre");
            }
        }, 1000);
    }

    //Validação de dados com o Formik
    const validate = values => {
        const errors = {}

        if (!values.email) {
            errors.email = 'Preenchimento de Email necessário';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Endereço de Email invalido';
        }

        if (!values.senha) {
            errors.senha = 'Preenchimento de Senha necessário';
        } else if (values.senha.length < 4) {
            errors.senha = 'Senha deve ter 4 ou mais caracteres';
        }

        return errors;
    }

    //Criação de Formulário com o Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            senha: ''
        },
        validate,
        onSubmit: values => {
            acessarSistema(values);
        },
    });


    return (
        <>
            <div className="rna-container">
                <NotificationAlert ref={notificationAlertRef} />
            </div>
            <Container>
                <Row style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className="p-3" style={{ width: '320px' }}>
                        <Card.Title as="h3" className="mb-3 mt-2">Login Escolaris</Card.Title>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className={"mb-3" + (formik.touched.email && formik.errors.email ? " has-error has-feedback" : " ")}>
                                <Form.Label htmlFor="emailUsuario">Email:</Form.Label>
                                <Form.Control type="email" id="emailUsuario" name="email" placeholder="ex: loremipsum@email.com" value={formik.values.email} onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email ? (
                                    <Form.Text className="text-muted text-danger">
                                        {formik.errors.email}
                                    </Form.Text>
                                ) : null }
                            </Form.Group>

                            <Form.Group className={"mb-3" + (formik.touched.senha && formik.errors.senha ? " has-error has-feedback" : " ")}>
                                <Form.Label htmlFor="senhaUsuario">Senha:</Form.Label>
                                <Form.Control type="password" id="senhaUsuario" name="senha" placeholder="Ex: 1234" value={formik.values.senha} onChange={formik.handleChange} />
                                {formik.touched.senha && formik.errors.senha ? (
                                    <Form.Text className="text-muted text-danger">
                                        {formik.errors.senha}
                                    </Form.Text>
                                ) : null}
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