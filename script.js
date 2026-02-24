// ===============================
// CUANDO CARGA LA PÁGINA
// ===============================
document.addEventListener("DOMContentLoaded", function(){

    // ===== FECHA Y HORA AUTOMÁTICA =====
    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");

    if(fechaInput && horaInput){
        const ahora = new Date();
        fechaInput.value = ahora.toISOString().split("T")[0];
        horaInput.value = ahora.toTimeString().slice(0,5);
    }

    // ===== FORMULARIO WHATSAPP =====
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
⏰ Hora: ${hora}

Gracias por elegir MHC Studio 💖`;

            const mensajeCodificado = encodeURIComponent(mensaje);
            const numeroWhatsApp = "51936835326";

            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
        });
    }

    // ===============================
    // SISTEMA DE OPINIONES
    // ===============================

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

function actualizarEstrellas(valor){
    const estrellas = document.querySelectorAll("#estrellas span");
    estrellas.forEach(estrella => {
        estrella.classList.remove("activa");
        if(estrella.getAttribute("data-value") <= valor){
            estrella.classList.add("activa");
        }
    });
}


// 🔥 GUARDAR EN FIREBASE (NO localStorage)
function guardarOpinion(nombre, texto, rating){
    db.collection("opiniones").add({
        nombre: nombre,
        texto: texto,
        rating: Number(rating),
        fecha: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Opinión guardada en Firebase");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


// 🔥 MOSTRAR DESDE FIREBASE
function mostrarOpiniones(){
    const lista = document.getElementById("listaOpiniones");
    if(!lista) return;

    db.collection("opiniones")
      .orderBy("fecha", "desc")
      .onSnapshot((snapshot) => {

        lista.innerHTML = "";

        snapshot.forEach((doc) => {
            const op = doc.data();

            const div = document.createElement("div");
            div.classList.add("opinion-card");

            let estrellas = "★".repeat(op.rating || 0);

            div.innerHTML = `
                <h4>${op.nombre}</h4>
                <div class="rating">${estrellas}</div>
                <p>"${op.texto}"</p>
            `;

            lista.appendChild(div);
        });

    });
}
}


