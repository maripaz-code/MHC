// Fecha y hora automática
const fechaInput = document.getElementById("fecha");
const horaInput = document.getElementById("hora");

const ahora = new Date();
fechaInput.value = ahora.toISOString().split("T")[0];
horaInput.value = ahora.toTimeString().slice(0,5);

// Evento del formulario
document.getElementById("formCita").addEventListener("submit", function(e){
    e.preventDefault();

    const nombre = this.nombre.value;
    const apellidos = this.apellidos.value;
    const celular = this.celular.value;
    const direccion = this.direccion.value;
    const servicio = this.servicio.value;
    const fecha = this.fecha.value;
    const hora = this.hora.value;

    // Crear mensaje personalizado
    const mensaje = `✨ NUEVA CITA MHC STUDIO ✨
    
👩 Nombre: ${nombre} ${apellidos}
📱 Celular: ${celular}
📍 Dirección: ${direccion}
💅 Servicio: ${servicio}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}

Gracias por elegir MHC Studio 💖`;

    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // ⚠️ CAMBIA ESTE NÚMERO POR EL TUYO
    const numeroWhatsApp = "51936835326";

    // Abrir WhatsApp automáticamente
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
// ===== SISTEMA DE OPINIONES GLOBAL =====

document.addEventListener("DOMContentLoaded", function(){

    const contenedor = document.getElementById("contenedorOpiniones");
    const listaPagina = document.getElementById("listaOpiniones");

    const opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

    opiniones.forEach(op => {
        crearOpinion(op.nombre, op.texto, op.rating, contenedor);
        crearOpinion(op.nombre, op.texto, op.rating, listaPagina);
    });

});

function guardarOpinion(nombre, texto, rating){
    let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
    opiniones.push({nombre, texto, rating});
    localStorage.setItem("opiniones", JSON.stringify(opiniones));
}

function crearOpinion(nombre, texto, rating, destino){

    if(!destino) return;

    const div = document.createElement("div");
    div.classList.add("opinion-card");

    let estrellasHTML = "★".repeat(rating);

    div.innerHTML = `
        <h4>${nombre}</h4>
        <div class="rating">${estrellasHTML}</div>
        <p>"${texto}"</p>
    `;

    destino.prepend(div);
}
});

