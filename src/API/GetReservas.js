import axios from 'axios';

export async function obtenerEspaciosPorSeccion(seccion) {
    try {
        const respuesta = await axios.get('https://geeapi.azurewebsites.net/api/espacios');

        if (respuesta.status !== 200) {
            throw new Error('Error al obtener los espacios');
        }

        let datos = respuesta.data;

        if (seccion !== "") { 
            datos = datos.filter(espacio => espacio.seccion === seccion);
        }

        
        datos.sort((a, b) => a.NumReser - b.NumReser);

        return datos;
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





