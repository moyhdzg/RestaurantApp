import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useState,useEffect } from 'react';
import { db } from "../Firebase/firebase";
import { collection, getDocs, addDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import trash from './imgs/trash.svg';
import edit from './imgs/edit.svg';

const Reservaciones = () => {
  const [users,setUser]= useState([])
  const useCollectionRef= collection(db,'reservacionesMochomo')
  const [name, setName]= useState("")
  const [lastname, setLastname]= useState("")
  const [phone, setPhone]= useState("")
  const [correo, setCorreo]= useState("")
  const [mesa, setMesa]= useState(0)

  const createUser = async() => {
    await addDoc(useCollectionRef, { 
      Nombre: name, 
      Apellido: lastname, 
      Correo: correo, 
      Telefono: phone, 
      Mesa: mesa 
    });
    getUsers() 
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
    //const userDoc = doc(db,'reservacionesMochomo', id);
    //console.log(userDoc.docs)
    const docRef = doc(db, "reservacionesMochomo", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    } 
  }

  useEffect(()=>{
  getUsers();
  },[]);

  return (
    <>
      <Header />
        <h1>Reservaciones</h1>
        <input type="text" placeholder="Nombre" onChange={(e) =>{setName(e.target.value)}} />
        <input type="text" placeholder="Apellido" onChange={(e) =>{setLastname(e.target.value)}} />
        <input type="text" placeholder="Correo" onChange={(e) =>{setCorreo(e.target.value)}} />
        <input type="text" placeholder="Teléfono" onChange={(e) =>{setPhone(e.target.value)}} />
        <input type="number" placeholder="Mesa"onChange={(e) =>{setMesa(e.target.value)}} />
        <button onClick={createUser}>Crear Reservación</button>
        <button id='updateButton'>Actualizar Reservación</button>

        {users.map((item)=>{
            return(
                <div key={item.id}>
                    <h1>Nombre: {item.Nombre}</h1>
                    <h1>Apellido: {item.Apellido}</h1>
                    <h1>Correo: {item.Correo}</h1>
                    <h1>Telefono: {item.Telefono}</h1>
                    <h1>Mesa: {item.Mesa}</h1>
                    <button id='editButton' onClick={ () =>clickEdit(item.id)}>
                      <img src={edit} alt="Editar" id='editIcon' />
                    </button>
                    <button id='deleteButton' onClick={ () => deleteUser(item.id)}>
                      <img src={trash} alt="Eliminar" id='trashIcon' />
                    </button>
                </div>
            )
        })}
      <Footer />
    </>
  )
}

export default Reservaciones