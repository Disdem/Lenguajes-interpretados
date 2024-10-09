import { Characters } from '../types/type'

type props = {
    Character: Characters[]
}

const Character = ({Character}: props) => {
    
  return (
    <div>{Character[0].name}</div>
  )
}

export default Character