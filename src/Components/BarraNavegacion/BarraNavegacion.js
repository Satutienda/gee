import { NavLink, Link } from "react-router-dom"

const BarraNavegacion = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', color: '#ff1654' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#ff1654' }}>
                <h3>Gee</h3>
            </Link>
            <div style={{ display: 'flex' }}>
                <NavLink to={"/seccion/Finanzas"} className="ActiveOption" style={{ textDecoration: 'none', color: '#ff1654', padding: '0 10px' }}>Finanzas</NavLink>
                <NavLink to={"/seccion/Directorio"} className="ActiveOption" style={{ textDecoration: 'none', color: '#ff1654', padding: '0 10px' }}>Directorio</NavLink>
                <NavLink to={"/seccion"} className="ActiveOption" style={{ textDecoration: 'none', color: '#ff1654', padding: '0 10px' }}>Todos</NavLink>
            </div>
         
        </nav>
    );
}

export default BarraNavegacion;

