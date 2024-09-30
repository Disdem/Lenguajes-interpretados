import ShowPerson from "./ShowPerson";

const MyFirstApp = () => {



    const objeto1 = {
    name:'Luffy',
        age:19,
        status:true,
        extraData:"Es el rey de los piratas",
        imgSrc:"https://i.blogs.es/3194cd/one-piece/1366_2000.jpeg"
      }

      const objeto2 = {
        name:'Alan Turing',
            age:50,
            status:true,
            extraData:"Es el padre de la computacion",
          }

  const {name, age, imgSrc} = objeto1;

return(

    
    <>
    <h1>My first app</h1>
    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt quae vel, aliquam fugiat culpa optio similique placeat cupiditate aliquid id illo eos tempore veniam corporis quia itaque pariatur delectus dolores.</p>
    <h2>{name} y tiene {age} años</h2>
    <img src={imgSrc} alt="" />
    </>
)


}
export default MyFirstApp