import React, { useState } from 'react';
import Reserva from '../Reserva/Reserva';
import ActualizarReservas from '../ActualizarReservas/ActualizarReservas'; 
import "./ListaReserva.css";

const ListadoReservas = ({ reservas }) => {
    // Estado para almacenar las reservas seleccionadas
    const [reservasSeleccionadas, setReservasSeleccionadas] = useState([]);

    // Función para manejar la selección de una reserva
    const handleReservaSelect = (numReserva, seleccionada) => {
        // Si la reserva está seleccionada, la agregamos al arreglo de reservas seleccionadas
        if (seleccionada) {
            setReservasSeleccionadas([...reservasSeleccionadas, numReserva]);
        } else {
            // Si la reserva no está seleccionada, la eliminamos del arreglo de reservas seleccionadas
            setReservasSeleccionadas(reservasSeleccionadas.filter(reserva => reserva !== numReserva));
        }
    };

    // Función para manejar la actualización de las reservas seleccionadas
    const handleUpdateReservas = () => {
        // Aquí debes realizar la lógica para actualizar las reservas seleccionadas en la base de datos
    };

    return (
        <div className='reservas'>
            <div className="Listadoreservas">
                {reservas.map((reser) => (
                    <Reserva
                        key={reser._id} 
                        {...reser}
                        onReservaSelect={handleReservaSelect}
                        handleUpdateDocument={handleUpdateReservas} // Pasa la función handleUpdateReservas al componente Reserva
                    />
                ))}
            </div>
            
            <ActualizarReservas
                reservasSeleccionadas={reservasSeleccionadas}
                onUpdateReservas={handleUpdateReservas}
            />
        </div>
    );
}

export default ListadoReservas;








