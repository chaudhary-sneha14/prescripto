import Banner from "../Banner"
import { Header } from "../Header"
import SpecialityMenu from "../SpecialityMenu"
import TopDoctor from "../TopDoctor"

export const Home=()=>{
    return(
        <>
       <Header/>
       <SpecialityMenu/>
       <TopDoctor/>
       <Banner/>
        </>
    )
}