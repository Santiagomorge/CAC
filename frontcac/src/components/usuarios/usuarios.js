import React from "react";
import '../../App.css';
import { TablaUsuarios } from "../tablausuarios/tablausuarios";

export const Usuarios = () => {
    return <div class= "usuario">
             <p class="Titulo-texto">Listar Usuarios</p>
             <TablaUsuarios />
    </div>
}