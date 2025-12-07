import { Helmet } from "react-helmet-async";
import Expo from "./Expo";

const Home = ()=>{
    return <div className="w-full h-full flex flex-col ">
        <Helmet>
            <title>Guillaume Barnabé – Artiste peintre contemporain</title>
            <meta
                name="description"
                content="Découvrez les œuvres de Guillaume Barnabé, artiste peintre contemporain. Expositions, peintures, techniques mixtes et créations uniques."
            />
            <meta name="keywords" content="Guillaume Barnabé, peintre, artiste, art contemporain, exposition, peinture" />
        </Helmet>
        <Expo title='6907c4962a1551fa7f9a3313' />
    </div>
} 

export default Home;