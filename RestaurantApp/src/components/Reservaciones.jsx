import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { useState,useEffect } from 'react';
import { db } from "../Firebase/firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";

const Reservaciones = () => {
  const [users,setuser]= useState([])
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
    console.log(data)
    setuser(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
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
        <button onClick={createUser}>Enviar</button>

        {users.map((item)=>{
            return(
                <div key={item.id}>
                    <h1>Nombre: {item.Nombre}</h1>
                    <h1>Apellido: {item.Apellido}</h1>
                    <h1>Correo: {item.Correo}</h1>
                    <h1>Telefono: {item.Telefono}</h1>
                    <h1>Mesa: {item.Mesa}</h1>
                </div>
            )
        })}
      <Footer />
    </>
  )
}

export default Reservaciones