import {useEffect, useState} from "react";
import { FoodData } from "./types/types";
import ShowMenu from "./components/ShowMenu";
import Categorias from "./components/Categorias";

const url = 'https://profechino.github.io/data-repo/menu.json';

function App() {

  const [loading, setLoading] = useState(true);

  const [allFoods, setAllFoods] = useState<FoodData[]>([]);

  const [categorias, setCategorias] = useState<string[]>([]);

  const [filteredFoods, setFilteredFoods] = useState<FoodData[]>([]);


  const fetchMenu = async () => {

    setLoading(true);

    try {

      const peticion = await fetch(url);
      const menu = await peticion.json();

      const FoodDatos = menu.map((datos:FoodData) => {
        return datos as FoodData;
      })

      setAllFoods(FoodDatos);
      const categoriasNuevas = ["todos", ...new Set<string>(FoodDatos.map(({category}:FoodData)=> category ))]

      setCategorias(categoriasNuevas);

      console.log(menu);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }

  }

  const FilterFoodsFromCategory = (categoria:string) => {
    if( categoria === 'todos' ) {
      setFilteredFoods(allFoods);
      return;
    }
    const filteredFoods = allFoods.filter( (foodItem:FoodData) => foodItem.category === categoria);
    setFilteredFoods(filteredFoods);
  }

  useEffect(() => {
    //código de inicialización
    fetchMenu();
    //código de inicialización end
    return () => {
    //código de limpieza (on unmount)
    }
  }, [])
  //Si se dejam los corchetes solo se ejcuta una vez, *No quitar*
  //[Variable] es una dependencia, entonces cuando cambie, se vuelve una dependencia 
  
  if(loading){
    return <h1>LOADING...</h1>
  }



  return (
    <>
        <h1>Restaurante</h1>
       <section className="center">
        <Categorias categorias={categorias} filterItems ={FilterFoodsFromCategory}/>
        <ShowMenu foods={filteredFoods}/>


       </section>
    </>
  )
}

export default App
