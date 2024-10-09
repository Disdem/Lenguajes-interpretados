import React, { useState} from 'react'


const TituYForm = () => {

    interface Carta{
        nombre:string
        edad:string
        img:string 
    }

    const [ValorNombre, setValorNombre] = useState("")
    const [ValorEdad, setValorEdad] = useState("")
    const [ValorImg, setValorImg] = useState("")
    const [cartas, setCartas] = useState<Carta[]>([])

    const NombreHandler = (evento:React.ChangeEvent<HTMLInputElement>)=>{
    setValorNombre(evento.target.value)
    }

    const EdadHandler = (evento:React.ChangeEvent<HTMLInputElement>)=>{
    setValorEdad(evento.target.value)
    }

    const ImgHandler = (evento:React.ChangeEvent<HTMLInputElement>)=>{
    setValorImg(evento.target.value)
    }

    const CrearCarta = () => {
        const NewCarta = {
            nombre: ValorNombre,
            edad: ValorEdad,
            img: ValorImg,
        }

        setCartas([...cartas, NewCarta])

        setValorNombre('')
        setValorEdad('')
        setValorImg('')

    }

  return (
    <>
        <div>
            <h1 className='title'>Tarea 4</h1>
        </div>
        <fieldset className='Formulario'>
            Formulario <br />
            <fieldset>
                Nombre: <input type="text" onChange={NombreHandler} value={ValorNombre}className="espaciado"  />
               
                Edad: <input type="number" onChange={EdadHandler} value={ValorEdad} className="espaciado"  />
                Imagen: <input type="text" onChange={ImgHandler} value={ValorImg}className="espaciado"  />
            </fieldset>
            <br />
            <button className="margen" onClick={CrearCarta} >Añadir</button> <br />
        </fieldset>

        <div className='ContainerCart'>

        {cartas.map((carta, index) => (

          <div key={index} className='Carta'>

            <h3>El nombre es {carta.nombre}</h3>
            <h3>Su edad es de {carta.edad} años</h3>

            <div className='ContainerImg'>
              <img src={carta.img} alt="Imagen" />
            </div>

          </div>
        ))}
      </div>
        
    </>
)
}


export default TituYForm