import React, { useState, useEffect } from "react";
import ListadoReservas from "../ListaReservas/ListaReserva";
import { obtenerEspaciosPorSeccion } from '../../API/GetReservas';
import { useParams } from "react-router-dom";
import SelectorFecha from '../SelectorFecha/SelectorFecha';
import "./ContenedorReservas.css";
import moment from 'moment'; 

const ContenedorReservas = ({ MensajeGuia }) => {
    const [reservas, setReservas] = useState([]);
    const { seccion } = useParams();
    const [fechaFiltrada, setFechaFiltrada] = useState(moment().format('YYYY-MM-DD'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const seccionParametro = seccion !== undefined ? seccion : "";
                const response = await obtenerEspaciosPorSeccion(seccionParametro);
                
                const reservasConFormatoDeseado = response.map(reserva => ({
                    ...reserva,
                    formattedDate: moment(reserva.formattedDate).format('YYYY-MM-DD')
                }));

                const reservasFiltradas = fechaFiltrada !== "" 
                    ? reservasConFormatoDeseado.filter(reserva => reserva.formattedDate === fechaFiltrada) 
                    : reservasConFormatoDeseado;

                setReservas(reservasFiltradas);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [seccion, fechaFiltrada]);

    const actualizarReservas = async () => {
        try {
            const nuevasReservas = await obtenerEspaciosPorSeccion(seccion);
            
            const reservasConFormatoDeseado = nuevasReservas.map(reserva => ({
                ...reserva,
                formattedDate: moment(reserva.formattedDate).format('YYYY-MM-DD')
            }));
            
            const reservasFiltradas = fechaFiltrada !== "" 
                ? reservasConFormatoDeseado.filter(reserva => reserva.formattedDate === fechaFiltrada) 
                : reservasConFormatoDeseado;

            setReservas(reservasFiltradas);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="contenedorReservas">
            <div className="Titulo">
                <h1 className="Principal">Gee :) </h1>
                <h4>Gestión de espacios empresariales</h4>
            </div>
            
            <SelectorFecha setFechaFiltrada={setFechaFiltrada} /> 
            <ListadoReservas reservas={reservas} onUpdateReservas={actualizarReservas} />
        </div>
    );
};

export default ContenedorReservas;


