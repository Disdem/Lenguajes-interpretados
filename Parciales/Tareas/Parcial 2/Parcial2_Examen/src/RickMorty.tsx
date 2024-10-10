import { useEffect, useState } from "react"
import { Characters } from "./types/type"
import Character from "./components/Character"

const url = "https://rickandmortyapi.com/api/character"
const RickMorty = () => {


    useEffect(() => {
      fetchcharactes()
    
      return () => {
        second
      }
    }, [third])
    

  return (
    <>
    <h1>Rick And Morty</h1>
    </>
  )
}

export default RickMorty