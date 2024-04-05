import './map.css'
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

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
import IconoTren from './TrenLigero/IconTren.png'


function MapboxGLMap(props) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [lastIdTren,setLastId] = useState(0);

    const qefwv = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfoBAEWAAf9MLiLAAAElklEQVRIx3WVW2xUVRSGv7X3OdPOTC8zvWAvBBFpwRAqGAWiRMAYDUYeQMEY9YE3CcYYH3z1AY3RJy8hxkjwifCAvIiaqAlUJJLUCxDwAlQLcistbafTaedy5uzlw3TaaTusZOXss/9/rb32Of/aW6iwzS/urXw1wGrgWeAJoBtITmNpoB/4Efga+A0olgN7D++fSSJ3Sb4C2Kuq21W1Uyt4lSaAiNwWkW+AT4CzZezU0QMUC/lSYEVyAXaq6j6guynRQHtrM/Fo7YIlVGFyKsut4RHGxicAronIPuCL8m56D+9H5iXf41TfS9TXNWzdtJ7HH3mQ5mQjRUdV8wSGR8fo7TvLdyf7mJicyorIu8AHQABgl65eV+bvUtWPWpKNDa+9soNnNm0g2VBPPnAMjU0xmQ2YzJU8kwvI5ovUx2tpa07Qs/J+2lqbuHD5ip/L5x8VkWHg18oFVgAHPM/r2P3cVrZseAhBUVWMMUQjHnWxCPXzvDbiIYARuLejDWsN5/7u91RZC5wCbnjTatnrnOtauWwJGx/uwTnlQtpxZtyRD0Fk9gfUeBZrhJjvkcoWEA1ZkzD0NFo2r1vD8dO/03/1Rocx8gaw2wN6gO0KrOq+j8Z4jD/SRT6/UiQV6Jxv7ltDXUSIRTzyYchIJkCBX1KOV5dCT6KOB5bfy+Wr1wF5GnjMTOu804jQmkwgAn+mHalAscKMR6zQUOMR8y2gpKZymGksHSjn0w4p5yhJrgnYYYAt5X6w1gAwr3BEhHjEx7cWzxqGM1l0HqccY62plPRmM92hJW1XVyPxiIdvDVHfMjSRJXRVmNWDlxlm23/GImZ2HIt4RKwhHvG4M5kjH4ZVM1XGVFjUTKtojvU0WDprhahvqfUsdRGfiVyBbKGIlZIsZxxoqxXWJkzV88QDJoBoecIhLKszvL7cZ7ggKIJnHdmCovgLEhigvVZorzW4hUvkPGAAWASCFAMkn0VCRwfQGamgxqqUp7MPzYMYA8WgkjHgASeB9QjY08eJ9p8kdICvuFaHOEGGBdy86oyirQ4MyJCBomAN2NsBzDbmSQ/4CtjtoOXOnVHITmAVdJViugyEwIhDBmRWfgra5aDLlubSDvmrhI9MNqDUAKSAowboA74V4FzRJ4MHxiAtPhLzkXofafbBmDkuTRGkzkfiPtJawtN4XAj8ch0/AD8ZoAB8bODGxYKlN19Tgi8qXFO4ovBvFZH/M41dU7hUwk/kaugPDAaGgA+BXPk0vQVMhfDk5aLndfrK4lyIXHUwoDDJ3AtHgCzwn8KA4tLwc1DDZ5koGScFgbeBI2WZlu2gQGowlCUHM7GwOxm2tzi3zRnTbReqEyj9HuPcpVHl2MFM7Nbt0FgPbgJHK2uZcx8XnbJzZQetG7fUJ0duftrky0uLk/VzjmwoXZnXx9KMBnoo1dS2Z+jUiYkjFwfxzCyv9/D+uZ3x5bHvy8M2VX0/kWh8uaNtkbHWVt9BGHJzcMilUuOHROQtYBDg+W1PzXC8KnGNqvpOPBZ9Ye2qFUFzU+JuZyAA9zQnpe/M+V2TU9lARN4Exivx/wH6OLT1xNreGwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wNC0wMVQyMTo1OTo1OCswMDowMN2IsyIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDQtMDFUMjE6NTk6NTgrMDA6MDCs1QueAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDI0LTA0LTAxVDIyOjAwOjA3KzAwOjAwdeC/igAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="

    const Paradas = [
        {lat: 19.34368, long: -99.14048, stop: Tasque, nombre: "Tasqueña"},
        {lat: 19.34082, long: -99.14344, stop: Torres , nombre: "Las Torres"},
        {lat: 19.33573, long: -99.14186, stop: Cdjar, nombre: "Ciudad Jardín"},
        {lat: 19.33171, long: -99.14062, stop: Lavir, nombre: "La Virgen"},
        {lat: 19.32749, long: -99.13931, stop: Xotep, nombre: "Xotepingo"},
        {lat: 19.32379, long: -99.13816, stop: Nezahua, nombre: "Nezahualpili"},
        {lat: 19.31795, long: -99.13879, stop: Regfed, nombre: "Registro Federal"},
        {lat: 19.31257, long: -99.14058, stop: Texti, nombre: "Textiplan"},
        {lat: 19.30720, long: -99.14307, stop: Elver, nombre: "El Vergel"},
        {lat: 19.30183, long: -99.14706, stop: EstAzt, nombre: "Estadio Azteca"},
        {lat: 19.29749, long: -99.15069, stop: Huipu, nombre: "Huipulco"},
        {lat: 19.28871, long: -99.14674, stop: Xomal, nombre: "Xomali"},
        {lat: 19.28273, long: -99.13969, stop: Perif, nombre: "Periférico"},
        {lat: 19.27953, long: -99.13316, stop: Tepep, nombre: "Tepepepan"},
        {lat: 19.26792, long: -99.12555, stop: Lanor, nombre: "La Noria"},
        {lat: 19.26445, long: -99.11863, stop: Huicha, nombre: "Huichapan"},
        {lat: 19.26074, long: -99.11124, stop: Frago, nombre: "Francisco Goita"},
        {lat: 19.25946, long: -99.10804, stop: Xochi, nombre: "Xochimilco"}
    ]

    const dataOne = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
              [-99.10776694053483, 19.259364112251077],
              [-99.1094440546372, 19.259846996783736],
              [-99.11030236150543, 19.26024200266687],
              [-99.11124141895094, 19.26072085537547],
              [-99.11822263726778, 19.26426664764249],
              [-99.12555520339154, 19.267895582028054],
              [-99.12664703097113, 19.268411627103745],
              [-99.12746359467783, 19.268833169999247],
              [-99.12805049984783, 19.26919148061128],
              [-99.12871395786156, 19.26985691253031],
              [-99.12917481629795, 19.270663200517127],
              [-99.1305542026002, 19.274022976745947],
              [-99.13131444065861, 19.275958386060175],
              [-99.13245753357904, 19.278803895765897],
              [-99.13288918003411, 19.27930892187621],
              [-99.13315476761225, 19.27949615915988],
              [-99.13394596483262, 19.280199810759882],   
              [-99.13449867241776, 19.28045643309148],
              [-99.13774915723548, 19.281247235551284],
              [-99.13845031929489, 19.28165007726226],
              [-99.1396653257774, 19.282736704003298],
              [-99.14676815882366, 19.288722954281063],
              [-99.1496947741718, 19.29126895060511],
              [-99.15043970288791, 19.292174434416815],
              [-99.15069682532055, 19.29289822721359],
              [-99.150682016125, 19.297479161727427],
              [-99.15070330292734, 19.29841738477346],
              [-99.15053432376135, 19.29883001808788],
              [-99.15019100101719, 19.299164174357166],
              [-99.14765615714923, 19.30101973035444],
              [-99.14705105177131, 19.30184109620847],
              [-99.14298598411189, 19.307304461968364],
              [-99.14179995123342, 19.30908393323887],
              [-99.14056861404525, 19.312586295411425],
              [-99.13878205907274, 19.317935073220347],
              [-99.13776314931188, 19.321231679347374],
              [-99.13779021481608, 19.32255129993486],
              [-99.13817430455528, 19.323837247352134],
              [-99.1392909120838, 19.327489356798047],
              [-99.14060927724796, 19.331686458367006],
              [-99.1418561546479, 19.335720019635986],
              [-99.1434425581767, 19.34082588785985],
              [-99.14376576327292, 19.341953229287657],
              [-99.14401456002534, 19.343090880968518],
              [-99.14395714537088, 19.34344300967056],
              [-99.14380523874814, 19.343646124360383],
              [-99.14363498547135, 19.343819214681403],
              [-99.1432362727063, 19.343894455578592],
              [-99.14107606307402, 19.343768355968223],
              [-99.14048612811148, 19.34362191862602]        
          ]
        }
    };
    
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibGFiaW5kdXN0cmlhIiwiYSI6ImNsaTIzdDQ3aTFzY2czZ3A5OXo1dGE3cG4ifQ.JvLIoG1vxSqQNKO0YJ4oEw';
        mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v12', // Puedes cambiar el estilo según tus necesidades
        center: [-99.1305796, 19.3030035], // Coordenadas de centro inicial
        zoom: 12 // Nivel de zoom inicial
        });

        // Agrega los marcadores al mapa
        Paradas.forEach(parada => {

            // Construye el HTML del popup
            const popupHTML = `
            <div>
              <h1>Estación:</h1>
              <h2>${parada.nombre}</h2>
            </div>
            `;

            // Crea un marcador con la imagen de la parada
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url(${parada.stop})`;
            el.style.width = '37.5px';
            el.style.height = '38px';
    
            // Crea el marcador en el mapa
            new mapboxgl.Marker(el)
            .setLngLat([parada.long, parada.lat])
            .setPopup(new mapboxgl.Popup().setHTML(popupHTML)) // add popup
            .addTo(mapRef.current);
        });

        // Agrega la línea al mapa
        mapRef.current.on('load', () => {
            mapRef.current.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: dataOne // Usa la constante dataOne aquí
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#003B87',
                    'line-width': 10
                }
            });
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    useEffect(() => {
        if((props.tren[0].estado==="new") && (props.tren[0].id!==lastIdTren)){
            
            // Construye el HTML del popup
            const popupHTML = `
            <div>
              <h1>Id del Tren:</h1>
              <h2>${props.tren[0].id}</h2>
            </div>
            `;            

            //console.log(props)
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = `url(${IconoTren})`; // URL de la imagen predeterminada
            el.style.width = '24px';
            el.style.height = '24px';
    
            // Crea el marcador en el mapa
            new mapboxgl.Marker(el)
            .setLngLat([props.tren[0].longitude,props.tren[0].latitude])
            .setPopup(new mapboxgl.Popup().setHTML(popupHTML))
            .addTo(mapRef.current);
            
            setLastId(props.tren[0].id)
        }

    },[props])

    return(
        <div ref={mapContainerRef} style={{ width: '99.6%', height: '84.5vh', position: 'relative' }}>
        </div>
    );
}

export default MapboxGLMap;