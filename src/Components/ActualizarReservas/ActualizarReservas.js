import React, { useState } from 'react';
import { actualizarEspacio } from '../../API/GetReservas';
import Swal from 'sweetalert2';
import "./ActualizarReserva.css"

const ActualizarReservas = ({ reservasSeleccionadas, onUpdateReservas }) => {
    // Estado local para almacenar los valores del formulario
    const [datosFormulario, setDatosFormulario] = useState({
        seccion: '',
        reserVapor: '',
        reservado: true
    });

    // Función para manejar los cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!datosFormulario.seccion) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#ff002b',
                background: 'transparent',
                color: '#ffffff',
                backdrop: 'rgba(0,0,0,0.8)',
                html: '<p style="color: #ffffff; font-size: 20px; font-family: Segoe UI;">¡Hey!🧐🧐, te falto indicar la sección.</p>',
            });
            return;
        }

        // Validación 2: reserVapor no debe ser vacío
        if (!datosFormulario.reserVapor.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#ff002b',
                background: 'transparent',
                color: '#ffffff',
                backdrop: 'rgba(0,0,0,0.8)',
                html: '<p style="color: #ffffff; font-size: 20px; font-family: Segoe UI;">¡Hey!🧐🧐, ingresa tu nombre.</p>',
            });
            return;
        }

        // Validación 3: se debe seleccionar al menos una reserva
        if (reservasSeleccionadas.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: '#ff002b',
                background: 'transparent',
                color: '#ffffff',
                backdrop: 'rgba(0,0,0,0.8)',
                html: '<p style="color: #ffffff; font-size: 20px; font-family: Segoe UI;">¡Hey! 🤣🤣 no reservaste nada. seleciona algun horario</p>',
            });
            return;
        }

        try {
            // Actualizar cada reserva seleccionada con los datos del formulario
            for (const numReserva of reservasSeleccionadas) {
                await actualizarEspacio(numReserva, datosFormulario);
            }
            // Llamar a la función onUpdateReservas para actualizar las reservas en el componente padre
            onUpdateReservas();

            // Mostrar alerta de éxito y luego recargar la página
            Swal.fire({
                title: '¡Listo ya tienes tu lugar!',
                text: 'La reserva ha sido actualizada con éxito.',
                icon: 'success',
                background: 'transparent',
                color: '#ffffff',
                backdrop: 'rgba(0, 0, 0, 0.8)',
                html: '<p style="color: #ffffff; font-size: 20px; font-family: Segoe UI;">Recuerda agendarte la fecha en tu calendario 😎</p>',
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {
            console.error('Error al actualizar las reservas:', error);
            // Mostrar alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                background: 'transparent',
                backdrop: 'rgba(0, 0, 0, 0.8)',
                html: '<p style="color: #ffffff; font-size: 20px; font-family: Segoe UI;">Hubo un problema, proba actualizar la pagina o vuelve a intentarlo en unos minutos </p>',
            });
        }
    };


    return (
        <div className='formularioActulizar'>

            <h5>Sala: Centro de distribución</h5>
            <h2>Lugares disponibles:</h2>

            <li>
                <span style={{ color: '#ffffff' }} class="material-symbols-outlined">
                    counter_1
                </span>
                Elegí tu hora
            </li>
            <li>
                <span style={{ color: '#ffffff' }} class="material-symbols-outlined">
                    counter_2
                </span>
                Completa tus datos
            </li>
            <li>
                <span style={{ color: '#ffffff' }} class="material-symbols-outlined">
                    counter_3
                </span>
                Envía la reserva
            </li>

            
                <form onSubmit={handleSubmit} className='formuActualizarReserv'>

                    <select className="inputReservaSeccion"
                        name="seccion"
                        value={datosFormulario.seccion}
                        onChange={handleChange}
                    >   <option value="">Elije su seccion</option>
                        <option value="Aditivos">Aditivos</option>
                        <option value="Adm.-facturacion">Adm.-facturacion</option>
                        <option value="Administracion">Administracion</option>
                        <option value="Calidad">Calidad</option>
                        <option value="Choferes">Choferes</option>
                        <option value="Compras">Compras</option>
                        <option value="Deposito">Deposito</option>
                        <option value="Descongelado">Descongelado</option>
                        <option value="Despacho">Despacho</option>
                        <option value="Despacho-camara y preparacion">Despacho-camara y preparacion</option>
                        <option value="Despacho-entrega">Despacho-entrega</option>
                        <option value="Embutido">Embutido</option>
                        <option value="Facturacion-balanza">Facturacion-balanza</option>
                        <option value="Feteado">Feteado</option>
                        <option value="Hornos tarde">Hornos tarde</option>
                        <option value="I+d">I+d</option>
                        <option value="Jamoneria">Jamoneria</option>
                        <option value="Limpieza">Limpieza</option>
                        <option value="Limpieza tarde">Limpieza tarde</option>
                        <option value="Logistica">Logistica</option>
                        <option value="Mantenimiento">Mantenimiento</option>
                        <option value="Mensuales">Mensuales</option>
                        <option value="Produccion">Produccion</option>
                        <option value="Produccion noche">Produccion noche</option>
                        <option value="Produccion tarde">Produccion tarde</option>
                        <option value="Recursos humanos">Recursos humanos</option>
                        <option value="Secadero">Secadero</option>
                        <option value="Seguridad">Seguridad</option>
                        <option value="Serenos">Serenos</option>
                        <option value="Sistemas">Sistemas</option>
                        <option value="Vacio">Vacio</option>
                        <option value="Ventas">Ventas</option>
                    </select>

                    <input
                        type="text"
                        name="reserVapor"
                        value={datosFormulario.reserVapor}
                        onChange={handleChange}
                        placeholder="Ingresa quien reserva"
                        className="inputReservaNombre"
                    />

                    <button className='BotonReserva' type="submit"> <i className="material-icons" style={{ color: '#ccff33' }}>send</i></button>
                </form>

        </div>
    );
};

export default ActualizarReservas;

