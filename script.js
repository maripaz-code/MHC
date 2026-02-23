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
// ===== SISTEMA DE OPINIONES =====

let ratingSeleccionado = 0;
const estrellas = document.querySelectorAll("#estrellas span");
const contenedor = document.getElementById("contenedorOpiniones");

// Seleccionar estrellas
estrellas.forEach(estrella => {
    estrella.addEventListener("click", function(){
        ratingSeleccionado = this.dataset.valor;

        estrellas.forEach(e => e.classList.remove("activa"));
        for(let i=0; i<ratingSeleccionado; i++){
            estrellas[i].classList.add("activa");
        }
    });
});

// Cargar opiniones guardadas
document.addEventListener("DOMContentLoaded", cargarOpiniones);

function cargarOpiniones(){
    const opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
    opiniones.forEach(op => mostrarOpinion(op.nombre, op.texto, op.rating));
}

document.getElementById("btnOpinion").addEventListener("click", function(){

    const nombre = document.getElementById("nombreOpinion").value;
    const texto = document.getElementById("textoOpinion").value;

    if(nombre === "" || texto === "" || ratingSeleccionado == 0){
        alert("Por favor completa todos los campos y selecciona estrellas ⭐");
        return;
    }

    const nuevaOpinion = {
        nombre: nombre,
        texto: texto,
        rating: ratingSeleccionado
    };

    let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];
    opiniones.push(nuevaOpinion);
    localStorage.setItem("opiniones", JSON.stringify(opiniones));

    mostrarOpinion(nombre, texto, ratingSeleccionado);

    document.getElementById("nombreOpinion").value = "";
    document.getElementById("textoOpinion").value = "";
    estrellas.forEach(e => e.classList.remove("activa"));
    ratingSeleccionado = 0;
});

function mostrarOpinion(nombre, texto, rating){
    const div = document.createElement("div");
    div.classList.add("opinion-card");

    let estrellasHTML = "★".repeat(rating);

    div.innerHTML = `
        <h4>${nombre}</h4>
        <div class="rating">${estrellasHTML}</div>
        <p>"${texto}"</p>
    `;

    contenedor.prepend(div);
}

});
