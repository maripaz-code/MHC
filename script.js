// ===============================
// TODO DENTRO DE DOMCONTENTLOADED
// ===============================
document.addEventListener("DOMContentLoaded", function() {

    // 1. Manejo de Fecha y Hora automática
    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");

    if (fechaInput && horaInput) {
        const ahora = new Date();
        fechaInput.value = ahora.toISOString().split("T")[0];
        horaInput.value = ahora.toTimeString().slice(0, 5);
    }

    // 2. Formulario de Cita (WhatsApp)
    const formCita = document.getElementById("formCita");
    if (formCita) {
        formCita.addEventListener("submit", function(e) {
            e.preventDefault();
            const nombre = this.nombre.value;
            const apellidos = this.apellidos.value;
            const celular = this.celular.value;
            const direccion = this.direccion.value;
            const servicio = this.servicio.value;
            const fecha = this.fecha.value;
            const hora = this.hora.value;

            const mensaje = `✨ NUEVA CITA MHC STUDIO ✨\n👩 Nombre: ${nombre} ${apellidos}\n📱 Celular: ${celular}\n📍 Dirección: ${direccion}\n💅 Servicio: ${servicio}\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}`;
            const mensajeCodificado = encodeURIComponent(mensaje);
            const numeroWhatsApp = "51936835326";

            window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
        });
    }

    // 3. Sistema de Estrellas (Rating)
    let ratingSeleccionado = 0;
    const estrellas = document.querySelectorAll("#estrellas span");

    estrellas.forEach(estrella => {
        estrella.addEventListener("click", function() {
            ratingSeleccionado = this.getAttribute("data-value");
            // Pintar estrellas
            estrellas.forEach(e => e.classList.remove("activa"));
            for (let i = 0; i < ratingSeleccionado; i++) {
                estrellas[i].classList.add("activa");
            }
        });
    });

    // 4. Publicar Opinión en Firebase
    const btnOpinion = document.getElementById("btnOpinion");
    if (btnOpinion) {
        btnOpinion.addEventListener("click", () => {
            const nombre = document.getElementById("nombreOpinion").value.trim();
            const texto = document.getElementById("textoOpinion").value.trim();

            if (nombre === "" || texto === "" || ratingSeleccionado == 0) {
                alert("Completa todos los campos y selecciona las estrellas ⭐");
                return;
            }

            db.collection("opiniones").add({
                nombre: nombre,
                texto: texto,
                rating: Number(ratingSeleccionado),
                fecha: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                alert("✨ Opinión publicada con éxito ✨");
                // Resetear campos
                document.getElementById("nombreOpinion").value = "";
                document.getElementById("textoOpinion").value = "";
                ratingSeleccionado = 0;
                estrellas.forEach(e => e.classList.remove("activa"));
            })
            .catch(error => {
                alert("Error al guardar: " + error.message);
            });
        });
    }

    // 5. Cargar Opiniones de Firebase
    const contenedorOpiniones = document.getElementById("listaOpiniones");
    if (contenedorOpiniones) {
        db.collection("opiniones")
        .orderBy("fecha", "desc")
        .onSnapshot(snapshot => {
            contenedorOpiniones.innerHTML = "";
            snapshot.forEach(doc => {
                const data = doc.data();
                const iconosEstrellas = "⭐".repeat(data.rating);
                contenedorOpiniones.innerHTML += `
                    <div class="opinion-card">
                        <h3>${data.nombre}</h3>
                        <p class="estrellas">${iconosEstrellas}</p>
                        <p>${data.texto}</p>
                    </div>
                `;
            });
        });
    }
}); // Cierre correcto del DOMContentLoaded
