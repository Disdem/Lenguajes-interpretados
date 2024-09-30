import "./estilos/titulo.css";
import "./estilos/texto.css";
import "./estilos/listapar.css"


const MyAppRecreada = () => {
  return (
    <div className="container">
    <h1 className="titulo">Tarea de CSS con React</h1>
    <hr />
    <p className="texto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eveniet dolorum corporis blanditiis, officia corrupti similique exercitationem vel porro at perferendis delectus quibusdam beatae sequi neque nostrum, iure cupiditate repellat
    sit amet consectetur adipisicing elit. Cumque eveniet dolorum corporis blanditiis, officia corrupti similique exercitationem vel porro at perferendis delectus quibusdam beatae sequi neque nostrum, iure cupiditate repellasit amet consectetur</p>
    <hr />
    <div className="listpar">
        <h1>Lista Pares</h1>
        <ul>
            <li>Elemento 01</li>
            <li>Elemento 02</li>
            <li>Elemento 03</li>
            <li>Elemento 04</li>
            <li>Elemento 05</li>
            <li>Elemento 06</li>
            <li>Elemento 07</li>
            <li>Elemento 08</li>
            <li>Elemento 09</li>
            <li>Elemento 10</li>
        </ul>
    </div>
    </div>
  )
}

export default MyAppRecreada