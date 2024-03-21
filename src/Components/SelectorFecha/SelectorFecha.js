import React from 'react';
import "./SelectorFecha.css";

const SelectorFecha = ({ setFechaFiltrada }) => {
    // Obtener la fecha local actual en el formato YYYY-MM-DD
    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0];

    const handleChange = (event) => {
        setFechaFiltrada(event.target.value);
    };

    return (
        <div className='selectorFecha'>
            <input className='jaja' type="date" id="fecha" onChange={handleChange} defaultValue={today} />
        </div>
    );
};

export default SelectorFecha;


