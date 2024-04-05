import './map.css'
import axios from 'axios';
import MapboxGLMap from './MapboxGlMap';
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Select, MenuItem, Button, Stack, useTheme } from '@mui/material';

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

function Map() {

  const theme = useTheme();
  // Estados para almacenar los datos
  const url = 'http://localhost:5000/calculate';
  const [tableData, setTableData] = useState([]);
  const [todosLosTrenes, setTodosLosTrenes] = useState([{id:0,latitude: 0,longitude: 0,estado: "ini"}]);
  const [estacionpar, setEstacionpar] = useState('');
  const [sentidoTren, setSentidotren] = useState('');

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
    {lat: 19.27953, long: -99.13316, stop: Tepep, nombre: "Tepepan"},
    {lat: 19.26792, long: -99.12555, stop: Lanor, nombre: "La Noria"},
    {lat: 19.26445, long: -99.11863, stop: Huicha, nombre: "Huichapan"},
    {lat: 19.26074, long: -99.11124, stop: Frago, nombre: "Francisco Goita"},
    {lat: 19.25946, long: -99.10804, stop: Xochi, nombre: "Xochimilco"}
  ]
  
  

  // Función para agregar una nueva fila a la tabla
  const agregarFila = () => {

    if((estacionpar!=="") && (sentidoTren!=="")){

      const data = {
        EstacionDePartida: estacionpar,
        Sentido: sentidoTren
      };

      // Realizar la solicitud POST al servidor utilizando Axios
      axios.post(url, data)
      .then(response => {
          // Manejar la respuesta del servidor aquí
          console.log('Respuesta del servidor:', response.data);
          
          const newTren = {
            id: tableData.length + 1,
            latitude: response.data.coor[0],
            longitude: response.data.coor[1],
            estado: "new"
          };
    
          // Agregar el nuevo tren al estado del trenes
          setTodosLosTrenes([newTren]);
    
          const nuevaFila = {
            id: tableData.length + 1,
            estpar: estacionpar,
            estdes: response.data.estNext,
            timest: response.data.timEst+"s",
          };
    
          setTableData([...tableData, nuevaFila]);
      })
      .catch(error => {
          // Manejar errores de la solicitud aquí
          console.error('Error al realizar la solicitud:', error);
      });
    }
  };

  function getStyles(name, stationStart, theme) {
    return {
      fontWeight:
        stationStart === name
          ? theme.typography.fontWeightMedium
          : theme.typography.fontWeightRegular,
    };
  }

  const handleChange = (event) => {
    if(event.target.name==="Estacion"){
      //console.log("Estacion")
      setEstacionpar(event.target.value);
    }else if(event.target.name==="Sentido"){
      //console.log("Sentido")
      setSentidotren(event.target.value);
    }
  };

  return (
    <div className='map-container'>
      <Grid container className='gridContainer' spacing={2}>
        {/* Primera columna */}
        <Grid item xs={3}>
          {/* Primera fila interna */}
          <Grid container spacing={2}>
            <Grid item xs={12} className='tableContainer'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID Tren</TableCell>
                    <TableCell>Estacion de partido</TableCell>
                    <TableCell>Estacion de Destino</TableCell>
                    <TableCell>Tiempo estimado</TableCell>
                    {/* Otras celdas de encabezado según tu necesidad */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((fila) => (
                    <TableRow key={fila.id}>
                      <TableCell>{fila.id}</TableCell>
                      <TableCell>{fila.estpar}</TableCell>
                      <TableCell>{fila.estdes}</TableCell>
                      <TableCell>{fila.timest}</TableCell>
                      {/* Otras celdas de datos según tu necesidad */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                  <FormControl sx={{ m: 1, minWidth: 180 }}>
                    <InputLabel id="demo-multiple-name-label">Estación de partida</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={estacionpar}
                      name="Estacion"
                      onChange={handleChange}
                      label="EstacionPartida"
                    >
                      {Paradas.map((parada) => (
                        <MenuItem
                          key={parada.nombre}
                          value={parada.nombre}
                          style={getStyles(parada.nombre, estacionpar, theme)}
                        >
                          {parada.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="demo-multiple-name-label">Sentido</InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={sentidoTren}
                      name="Sentido"
                      onChange={handleChange}
                      label="SentidoTren"
                    >
                      <MenuItem value={"IDA"} style={getStyles("IDA", sentidoTren, theme)} >
                        IDA
                      </MenuItem>
                      <MenuItem value={"VUELTA"} style={getStyles("VUELTA", sentidoTren, theme)} >
                        VUELTA
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Grid item>
                  <Button variant="contained" size="small" endIcon={<AlarmIcon />} onClick={agregarFila}>
                    Calcular tiempo
                  </Button>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Segunda columna */}
        <Grid item xs={9}>
          {/* Contenido de la segunda columna */}
          <MapboxGLMap tren={todosLosTrenes}/>
          {/* Aquí asumo que el componente MapboxGLMap es donde renderizas tu mapa de Mapbox */}
        </Grid>
      </Grid>
    </div>
  );
}

export default Map;
