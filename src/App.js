import React, {Fragment, useState, useEffect} from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
//Citas en localStorage
let citasIniciales = JSON.parse(localStorage.getItem('citas'));
if(!citasIniciales){
  citasIniciales = [];
}


//Arreglo de citas
const [citas, guardarCitas] = useState(citasIniciales);

//UseEffect para realizar ciertas operaciones cuando el state cambia // funciona como el document ready
useEffect( () => {
  // console.log('Documento listo o algo paso con las citas');
  if(citasIniciales){
    localStorage.setItem('citas', JSON.stringify(citas))
  }else{
    localStorage.setItem('citas', JSON.stringify([]));
  }

}, [citas, citasIniciales]);

//Funcion que tome las citas actuales y tome la nuevas
const crearCita = cita => {
  // console.log(cita);
  guardarCitas([
    ...citas, cita
  ])
}
//Funcion que elimina una cita por su id
const eliminarCita = id => {
  // console.log(id);
  const nuevasCitas = citas.filter(cita => cita.id !== id );
  guardarCitas(nuevasCitas);
}

//Mensaje condicional
const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';
  return (
    <Fragment>
    <h1>Administrador de pacientes</h1>
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          />
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita => (
            <Cita
              key={cita.id}
              cita={cita}
              eliminarCita={eliminarCita}
            />
          ))}
        </div>
      </div>
    </div>
  </Fragment>
  )}

export default App;
