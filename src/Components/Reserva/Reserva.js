import React, { useState } from 'react';
import { actualizarEspacio } from '../../API/GetReservas';
import "./Reserva.css";
import Swal from 'sweetalert2';

const Reserva = ({ _id, Concat, seccion, reservado, reserVapor, onReservaSelect }) => {
    const [seleccionada, setSeleccionada] = useState(false);
    const [estadoReservado, setEstadoReservado] = useState(reservado);
    const [estadoSeccion, setEstadoSeccion] = useState(seccion);
    const [estadoReserVapor, setEstadoReserVapor] = useState(reserVapor);

    const handleCheckboxChange = () => {
        const nuevaSeleccion = !seleccionada;
        setSeleccionada(nuevaSeleccion);

        if (typeof onReservaSelect === 'function') {
            onReservaSelect(_id, nuevaSeleccion);
        }
    };

    const handleClick = async () => {
        Swal.fire({
            title: '⚠️¿Estás seguro?⚠️',
            text: '¿Quieres liberar esta reserva?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, liberar',
            background: 'transparent',
            color: '#ffffff',
            backdrop: 'rgba(0,0,0,0.8)',
            html: '<p style="color: #ffffff; font-size: 20px; font-family: Segoe UI;">¡Hey!, vas a liberar este espacio, podria ser de otro , revisa bien  </p>',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await actualizarEspacio(_id, {
                        reservado: false,
                        seccion: "",
                        reserVapor: ""
                    });
                    console.log("Documento actualizado en la base de datos");
                    // Actualizar el estado local después de la actualización exitosa
                    setEstadoReservado(false);
                    setEstadoSeccion("");
                    setEstadoReserVapor("");
                } catch (error) {
                    console.error("Error al actualizar el documento en la base de datos:", error);
                }
            }
        });
    };

    const claseReserva = estadoReservado ? "reservado" : "libre";

    return (
        <div className={`${claseReserva}`}>
            <div className='Hora'>{Concat}</div>
            <div>{estadoSeccion}</div>
            <div>{estadoReserVapor}</div>
            <div className='Check'>
                {!estadoReservado && (
                    <input
                        key={_id}
                        type="checkbox"
                        checked={seleccionada}
                        onChange={handleCheckboxChange}
                    />
                )}
            </div>
            <div>
                {estadoReservado && (
                    <span style={{ cursor: 'pointer', color: "#ff0202", fontSize: "30px", position: "absolute", top: "0", right: "0" }} onClick={handleClick}>
                        <i className="material-icons">event_busy</i>
                    </span>
                )}
            </div>

        </div>
    );
};

export default Reserva;











