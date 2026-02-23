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

// ===== VARIABLES =====
let ratingSeleccionado = 0;

// ===== SISTEMA DE ESTRELLAS =====
document.addEventListener("DOMContentLoaded", function(){

    const estrellas = document.querySelectorAll("#estrellas span");

    estrellas.forEach(estrella => {
        estrella.addEventListener("click", function(){
            ratingSeleccionado = this.getAttribute("data-value");
            actualizarEstrellas(ratingSeleccionado);
        });
    });

    // BOTÓN PUBLICAR OPINIÓN
    const btn = document.getElementById("btnOpinion");
    if(btn){
        btn.addEventListener("click", function(){

            const nombre = document.getElementById("nombreOpinion").value;
            const texto = document.getElementById("textoOpinion").value;

            if(nombre === "" || texto === "" || ratingSeleccionado == 0){
                alert("Completa todos los campos ⭐");
                return;
            }

            guardarOpinion(nombre, texto, ratingSeleccionado);

            alert("✨ Opinión publicada con éxito ✨");

            window.location.href = "opiniones.html";
        });
    }

    // MOSTRAR OPINIONES EN opiniones.html
    mostrarOpiniones();
});


// ===== ACTUALIZAR COLOR DE ESTRELLAS =====
function actualizarEstrellas(valor){
    const estrellas = document.querySelectorAll("#estrellas span");
    estrellas.forEach(estrella => {
        estrella.classList.remove("activa");
        if(estrella.getAttribute("data-value") <= valor){
            estrella.classList.add("activa");
        }
    });
}


// ===== GUARDAR OPINIÓN =====
function guardarOpinion(nombre, texto, rating){
    let opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

    opiniones.push({
        nombre: nombre,
        texto: texto,
        rating: rating
    });

    localStorage.setItem("opiniones", JSON.stringify(opiniones));
}


// ===== MOSTRAR OPINIONES EN OTRA PÁGINA =====
function mostrarOpiniones(){
    const lista = document.getElementById("listaOpiniones");
    if(!lista) return;

    const opiniones = JSON.parse(localStorage.getItem("opiniones")) || [];

    opiniones.reverse().forEach(op => {

        const div = document.createElement("div");
        div.classList.add("opinion-card");

        let estrellas = "★".repeat(op.rating);

        div.innerHTML = `
            <h4>${op.nombre}</h4>
            <div class="rating">${estrellas}</div>
            <p>"${op.texto}"</p>
        `;

        lista.appendChild(div);
    });
}
});


