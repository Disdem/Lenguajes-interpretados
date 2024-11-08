import { FoodData } from '../types/types'

type Props = {
    foods: FoodData[]
}

const ShowMenu = ({foods}: Props) => {
  return <div className='flex wrap'>
     {
        foods.map((menuItem) =>{
            const {id,title,desc,price,img} = menuItem;

            return <div key={id} className='menu-item'>
                <img src={img} alt =""/>
                
                <div>
                    <h4>{title}</h4>
                    <h4>{price}$</h4>
                    <p>{desc}</p>
                </div>
            
            </div>
        })

    }
    </div>
}

export default ShowMenu