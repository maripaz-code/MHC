// ==========================================
// TODO DENTRO DE UN SOLO LISTENER
// ==========================================
document.addEventListener("DOMContentLoaded", function() {

    // --- 1. LÓGICA DE FECHA Y HORA (Solo si existen los inputs) ---
    const fechaInput = document.getElementById("fecha");
    const horaInput = document.getElementById("hora");

    if (fechaInput && horaInput) {
        const ahora = new Date();
        fechaInput.value = ahora.toISOString().split("T")[0];
        horaInput.value = ahora.toTimeString().slice(0, 5);
    }

    // --- 2. FORMULARIO DE CITAS (WHATSAPP) ---
    const formCita = document.getElementById("formCita");
    if (formCita) {
        formCita.addEventListener("submit", function(e) {
            e.preventDefault();
            const nombre = this.nombre.value;
            const servicio = this.servicio.value;
            const mensaje = `✨ NUEVA CITA MHC STUDIO ✨\n👩 Nombre: ${nombre}\n💅 Servicio: ${servicio}`;
            window.open(`https://wa.me/51936835326?text=${encodeURIComponent(mensaje)}`, "_blank");
        });
    }

    // --- 3. SISTEMA DE ESTRELLAS (RATING) ---
    let ratingSeleccionado = 0;
    const estrellas = document.querySelectorAll("#estrellas span");

    if (estrellas.length > 0) {
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
    }

    // --- 4. PUBLICAR EN FIREBASE (Botón Opinión) ---
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
                alert("✨ ¡Opinión publicada! ✨");
                window.location.reload(); 
            })
            .catch(error => alert("Error: " + error.message));
        });
    }

   // --- MOSTRAR OPINIONES (LISTADO) ---
const contenedor = document.getElementById("listaOpiniones");

if (contenedor) {
    db.collection("opiniones")
    .orderBy("fecha", "desc") // Trae las más recientes primero
    .onSnapshot(snapshot => {
        contenedor.innerHTML = ""; // Limpia el contenedor antes de cargar

        snapshot.forEach(doc => {
            const data = doc.data();
            
            // Creamos las estrellas según el número guardado
            const estrellasHtml = "⭐".repeat(data.rating);

            // Insertamos el HTML con el nombre y el texto
            contenedor.innerHTML += `
                <div class="opinion-card">
                    <div class="opinion-header">
                        <strong>${data.nombre}</strong>
                        <span class="estrellas-rating">${estrellasHtml}</span>
                    </div>
                    <p class="opinion-texto">"${data.texto}"</p>
                </div>
            `;
        });
    });
}

