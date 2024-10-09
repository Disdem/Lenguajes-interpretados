
type Props = {
    categorias: string[],
    filterItems: (categoriaAFiltrar:string) => void
}

const categorias = ({categorias, filterItems}: Props) => {
  return <div className="flex">
    {
        categorias.map ( (categoria, indice)=>{

            return <button key={indice + "_" + categoria} onClick={ () => {filterItems(categoria);}}>
                {categoria}
            </button>
        })
    }
  </div>
  
}

export default categorias