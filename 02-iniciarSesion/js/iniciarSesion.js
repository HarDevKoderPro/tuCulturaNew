"use strict";

setTimeout(()=>{
  // Referencias a elementos del DOM
  const getEl = (id) => document.getElementById(id);
  const inputEmail = getEl('inputEmail');
  const inputPass = getEl('inputPass');
  const btnIniciarSesion = getEl('btnIniciarSesion');
  
  // Programa Principal
  btnIniciarSesion.addEventListener('click', ()=>{
    window.location.href = '../00-enConstruccion/enConstruccion.html';
  })


},50);