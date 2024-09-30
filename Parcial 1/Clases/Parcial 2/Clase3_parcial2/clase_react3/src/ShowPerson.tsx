import React from "react";

type props = {
    nombre : string
}

function ShowPerson( mainobj:props){
    return(
        <>
        <div className="card">
            el personaje es {nombre}
        </div>
        </>
    )
}

export default ShowPerson