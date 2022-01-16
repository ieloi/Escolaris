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
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";

import CadastroEscolas from "components/CadastroEscolas";
import ListagemEscolas from "components/ListagemEscolas";
import Sobre from "components/Sobre";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
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
  },
  {
    path: "/sobre",
    name: "Sobre",
    icon: "nc-icon nc-quote",
    component: Sobre,
    layout: "/admin",
  }
];

export default dashboardRoutes;
