import axios from 'axios';

export async function obtenerEspaciosPorSeccion(seccion) {
    try {
        const respuesta = await axios.get('https://geeapi.azurewebsites.net/api/espacios');

        if (respuesta.status !== 200) {
            throw new Error('Error al obtener los espacios');
        }

        const datos = respuesta.data;

        if (seccion === "") { // Corregido: seccion === ""
            return datos; // Retorna todos los espacios si no se proporciona ninguna sección
        } else {
            const espaciosFiltrados = datos.filter(espacio => espacio.seccion === seccion);
            return espaciosFiltrados;
        }
    } catch (error) {
        console.error('Error al obtener los espacios:', error);
        throw error;
    }
}



export async function actualizarEspacio(id, datosActualizados) {
    try {
        const respuesta = await axios.put(`https://geeapi.azurewebsites.net/api/espacios/${id}`, datosActualizados, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (respuesta.status !== 200) {
            throw new Error(`Error al actualizar el espacio con ID ${id}`);
        }

        const datos = respuesta.data;
        console.log('Espacio actualizado:', datos);
        return datos;
    } catch (error) {
        console.error(`Error al actualizar el espacio con ID ${id}:`, error);
        throw error;
    }
}





