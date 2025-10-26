
import Grid from "./Componant/Grid/Grid";
import Paint from "./Componant/Paint/paint"

function App() {
  const listElem = []
  for(let i = 0;i<36;i++){
    listElem.push(<Paint imageUrl="./assets/test.webp" imageAlt="test" name={`test-${i}`} id={`paint-${i}`}/>)
  }
  return (
    <>
      <div className='w-screen h-screen bg-darkBlue overflow-auto flex flex-col center text-[50px] text-white font-mt-bold'>
          <Grid elems={listElem} rowSize={4} colSize={4}/>
      </div>
    </>
  )
}``

export default App
