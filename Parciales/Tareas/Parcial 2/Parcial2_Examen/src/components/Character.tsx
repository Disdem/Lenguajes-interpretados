import { Characters } from '../types/type'

type props = {
    Character: Characters[]
}

const Character = ({Character}: props) => {
   return <div className='flex wrap'>
   {
     Character.map((characterItem) =>{
      const {id,name,status,species,,gender,image} = characterItem;

      return <div key={id} className='character-item'>
        <img src={img} alt="" />

        <div>
          <h3>{name}</h3>
          <h4>{status}</h4>
          <h4>{gender}</h4>
          <h4>{species}</h4>
          </div>

      </div>

     })
  } 
  </div>
  
}

export default Character