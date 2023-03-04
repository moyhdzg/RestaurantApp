import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useState,useEffect } from 'react';
import { db } from "../Firebase/firebase";
import { collection, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import trash from './imgs/trash.svg';
import edit from './imgs/edit.svg';
import Alert from 'react-bootstrap/Alert'
import Styles from './styles.module.css'

const Reservaciones = () => {
  const [users,setUser]= useState([])
  const useCollectionRef= collection(db,'reservacionesMochomo')
  const [name, setName]= useState("")
  const [invalName,setinvalName] = useState("")
  const [lastname, setLastname]= useState("")
  const [phone, setPhone]= useState("")
  const [correo, setCorreo]= useState("")
  const [mesa, setMesa]= useState(0)
  const [userId,setUserid] = useState("")

  const createUser = async() => {
    if(name==''|| lastname=='' || correo=='' || phone=='' || mesa=='') {
        alert('Asegura llenar todos los campos')
      }
      else {
        await addDoc(useCollectionRef, { 
          Nombre: name, 
          Apellido: lastname, 
          Correo: correo, 
          Telefono: phone, 
          Mesa: mesa 
        })
      }
    getUsers();
    clearInputs();     
  }

  const getUsers = async() =>{
    const data = await getDocs(useCollectionRef)
    //console.log(data)
    setUser(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
  }

  const deleteUser = async(id) =>{
    const userDoc = doc(db,'reservacionesMochomo', id);
    await deleteDoc(userDoc)
    getUsers()
  }

  const clickEdit = async (id)=> {
    const docRef = doc(db, "reservacionesMochomo", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        fillInputs(docSnap.data(),id)
        
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        clearInputs();
    } 
  }
  const fillInputs = (data,id) => {
    document.querySelector('input[id="inputUserId"]').value = id; 
    setUserid(id)
    document.querySelector('input[id="inputNombre"]').value = data.Nombre; 
    setName(data.Nombre);
    document.querySelector('input[id="inputApellido"]').value = data.Apellido; 
    setLastname(data.Apellido); 
    document.querySelector('input[id="inputCorreo"]').value = data.Correo; 
    setCorreo(data.Correo);
    document.querySelector('input[id="inputTelefono"]').value = data.Telefono; 
    setPhone(data.Telefono);
    document.querySelector('input[id="inputMesa"]').value = data.Mesa; 
    setMesa(data.Mesa);
  }

  const clearInputs = () => {
    document.querySelector('input[id="inputUserId"]').value = ""; 
    setUserid("")
    document.querySelector('input[id="inputNombre"]').value = ""; 
    setName("");
    document.querySelector('input[id="inputApellido"]').value = ""; 
    setLastname(""); 
    document.querySelector('input[id="inputCorreo"]').value = ""; 
    setCorreo("");
    document.querySelector('input[id="inputTelefono"]').value =""; 
    setPhone("");
    document.querySelector('input[id="inputMesa"]').value = ""; 
    setMesa("");
  }

  const updateUser =async () =>{
    if(userId=='') {
        alert('Datos para actualizar no validos')
      } 
      else{
        const userDoc = doc(db,'reservacionesMochomo', userId);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          await updateDoc(userDoc,{
            Nombre: name, 
            Apellido: lastname, 
            Correo: correo, 
            Telefono: phone, 
            Mesa: mesa 
        });
        } 
      getUsers();
      clearInputs(); 
    }
  }
  
  useEffect(()=>{
  getUsers();
  },[]);

  return (
    <>
      <Header />
        <h1>Reservaciones</h1>
        <input id="inputUserId" type="hidden" value={userId} />
        <input id="inputNombre" type="text" placeholder="Nombre" onChange={(e) =>{setName(e.target.value)}} />
        <input id="inputApellido" type="text" placeholder="Apellido" onChange={(e) =>{setLastname(e.target.value)}} />
        <input id="inputCorreo" type="text" placeholder="Correo" onChange={(e) =>{setCorreo(e.target.value)}} />
        <input id="inputTelefono" type="text" placeholder="Teléfono" onChange={(e) =>{setPhone(e.target.value)}} />
        <input id="inputMesa" type="number" placeholder="Mesa"onChange={(e) =>{setMesa(e.target.value)}} />
        <button id="createButton" onClick={createUser}>Crear Reservación</button>
        <button id="updateButton" onClick={updateUser}>Actualizar Reservación</button>

        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Mesa</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
              {users&&users.map((item)=>{
                  return(
                      <tr key={item.id}>
                          <td>{item.Nombre}</td>
                          <td>{item.Apellido}</td>
                          <td>{item.Correo}</td>
                          <td>{item.Telefono}</td>
                          <td>{item.Mesa}</td>
                          <td>
                            <button id='editButton' onClick={ () =>clickEdit(item.id)}>
                              <img src={edit} alt="Editar" id='editIcon' />
                            </button>
                          </td>
                          <td>
                            <button id='deleteButton' onClick={ () => deleteUser(item.id)}>
                              <img src={trash} alt="Eliminar" id='trashIcon' />
                            </button>
                          </td>
                      </tr>
                  )
              })}
            </tbody>
        </table>
      <Footer />
    </>
  )
}

export default Reservaciones