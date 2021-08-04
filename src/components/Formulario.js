import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    //Crear state citas
    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });

    const[error, actualizarError] = useState(false);


    //Funcion que se ejecuta cada que el usuario escribe  en input
    const actualizarState = e => {
        // console.log(e.target.value);
        actualizarCita({
            ...cita, 
            [e.target.name] : e.target.value
        })
    }

    //Extraer lo valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando envia el formulario
    const submitCita = (e) =>{
        // alert('enviando')
        // console.log('enviando form');
        e.preventDefault();
        //Validar
        if(mascota.trim() === '' || propietario.trim() === "" || fecha.trim() === "" || hora.trim() === "" || sintomas.trim() === ''){
            // console.log('error campos vacios');
            actualizarError(true)
            return
        }
        //eliminar mensaje previo
        actualizarError(false)

        //Asignar un id
        cita.id = uuid();
        console.log(cita);
        //Crear cita
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return (
        <Fragment>
            <h2>Crear cita</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form
            onSubmit={submitCita}
            >
                <label>Nombre mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                    />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño mascota"
                    onChange={actualizarState}
                    value={propietario}
                    />
                <label>Fecha alta</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                    />
                <label>Hora alta</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                    />
                <label>Sintomas</label>
                    <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                    value={sintomas}
                     ></textarea>

                     <button
                     type="submit"
                     className="u-full-width button-primary"
                     >Agregar cita</button>
            </form>
        </Fragment>
    );
}
// DOCUMENTACION
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
};

export default Formulario;