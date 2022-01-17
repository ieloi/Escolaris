/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import CadastroEscolas from "components/CadastroEscolas";
import ListagemEscolas from "components/ListagemEscolas";
import Sobre from "components/Sobre";

const dashboardRoutes = [
  {
    path: "/sobre",
    name: "Sobre",
    icon: "nc-icon nc-quote",
    component: Sobre,
    layout: "/admin",
  },
  {
    path: "/listagem-escolas",
    name: "Listagem Escolas",
    icon: "nc-icon nc-backpack",
    component: ListagemEscolas,
    layout: "/admin",
  },
  {
    path: "/cadastro-escolas",
    name: "Cadastro Escolas",
    icon: "nc-icon nc-notes",
    component: CadastroEscolas,
    layout: "/admin",
  }
  
];

export default dashboardRoutes;
