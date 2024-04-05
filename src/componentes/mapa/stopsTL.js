import Tasque from './TrenLigero/Tasquena.png'
import Torres from './TrenLigero/LasTorres.png'
import Cdjar from './TrenLigero/CiudadJardin.png'
import Lavir from './TrenLigero/LaVirgen.png'
import Xotep from './TrenLigero/Xotepingo.png'
import Nezahua from './TrenLigero/Nezahualpilli.png'
import Regfed from './TrenLigero/RegistroFederal.png'
import Texti from './TrenLigero/Textitlan.png'
import Elver from './TrenLigero/ElVergel.png'
import EstAzt from './TrenLigero/EstadioAzteca.png'
import Huipu from './TrenLigero/Huipulco.png'
import Xomal from './TrenLigero/Xolami.png'
import Perif from './TrenLigero/PerifericoParticipacionCiudadana.png'
import Tepep from './TrenLigero/Tepepan.png'
import Lanor from './TrenLigero/LaNoria.png'
import Huicha from './TrenLigero/Huichapan.png'
import Frago from './TrenLigero/FranciscoGoitia.png'
import Xochi from './TrenLigero/Xochimilco.png'

function Paradas(){

    const Stops = [
        [19.34368,-99.14048,Tasque],
        [19.34082,-99.14344,Torres],
        [19.33573,-99.14186,Cdjar],
        [19.33171,-99.14062,Lavir],
        [19.32749,-99.13931,Xotep],
        [19.32379,-99.13816,Nezahua],
        [19.31795,-99.13879,Regfed],
        [19.31257,-99.14058,Texti],
        [19.3072,-99.14307,Elver],
        [19.30183,-99.14706,EstAzt],
        [19.29749,-99.15069,Huipu],
        [19.28871,-99.14674,Xomal],
        [19.28273,-99.13969,Perif],
        [19.27953,-99.13316,Tepep],
        [19.26792,-99.12555,Lanor],
        [19.26445,-99.11863,Huicha],
        [19.26074,-99.11124,Frago],
        [19.25946,-99.10804,Xochi]
    ]

    console.log(Stops)

    return(
        Stops
    )

}

export default Paradas;