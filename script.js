// ===============================
// CUANDO CARGA LA PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", function(){

    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");

    if(fechaInput && horaInput){
        const ahora = new Date();
        fechaInput.value = ahora.toISOString().split("T")[0];
        horaInput.value = ahora.toTimeString().slice(0,5);
    }

    const form = document.getElementById("formCita");
    if(form){
        form.addEventListener("submit", function(e){
            e.preventDefault();

            const nombre = this.nombre.value;
            const apellidos = this.apellidos.value;
            const celular = this.celular.value;
            const direccion = this.direccion.value;
            const servicio = this.servicio.value;
            const fecha = this.fecha.value;
            const hora = this.hora.value;

            const mensaje = `✨ NUEVA CITA MHC STUDIO ✨
👩 Nombre: ${nombre} ${apellidos}
📱 Celular: ${celular}
📍 Dirección: ${direccion}
💅 Servicio: ${servicio}
📅 Fecha: ${fecha}
⏰ Hora: ${hora}`;

            const mensajeCodificado = encodeURIComponent(mensaje);
            const numeroWhatsApp = "51936835326";

            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
        });
    }

    let ratingSeleccionado = 0;

    const estrellas = document.querySelectorAll("#estrellas span");

    estrellas.forEach(estrella => {
        estrella.addEventListener("click", function(){
            ratingSeleccionado = this.getAttribute("data-value");
            actualizarEstrellas(ratingSeleccionado);
        });
    });

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

    mostrarOpiniones();
});


// ===============================
// FUNCIONES
// ===============================

let ratingSeleccionado = 0;

// Manejo de estrellas
const estrellas = document.querySelectorAll("#estrellas span");

estrellas.forEach(estrella => {
    estrella.addEventListener("click", () => {
        ratingSeleccionado = estrella.getAttribute("data-value");

        estrellas.forEach(e => e.classList.remove("activa"));
        for (let i = 0; i < ratingSeleccionado; i++) {
            estrellas[i].classList.add("activa");
        }
    });
});

// Botón publicar
document.getElementById("btnOpinion").addEventListener("click", () => {

    const nombre = document.getElementById("nombreOpinion").value.trim();
    const texto = document.getElementById("textoOpinion").value.trim();

    if (nombre === "" || texto === "" || ratingSeleccionado === 0) {
        alert("Completa todos los campos y selecciona estrellas ⭐");
        return;
    }

    db.collection("opiniones").add({
        nombre: nombre,
        texto: texto,
        rating: Number(ratingSeleccionado),
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        alert("Opinión guardada en Firebase ✅");
        document.getElementById("nombreOpinion").value = "";
        document.getElementById("textoOpinion").value = "";
        ratingSeleccionado = 0;
        estrellas.forEach(e => e.classList.remove("activa"));
    })
    .catch(error => {
        alert("Error: " + error.message);
        console.error(error);
    });

});
}

