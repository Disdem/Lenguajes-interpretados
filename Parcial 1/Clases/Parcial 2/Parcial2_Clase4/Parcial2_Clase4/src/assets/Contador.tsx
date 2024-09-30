import React from 'react'

type Props = {
    inicial?:number
}

const Contador = (props: Props) => {

    const {inicial} = props;

    const [numero, setNumero] = useState(inicial ? inicial:0);

  return (
    <div>Contador</div>
  )
}

export default Contador