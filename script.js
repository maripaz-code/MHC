document.addEventListener("DOMContentLoaded", function() {

    // --- 1. LÓGICA DE FECHA Y HORA ---
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
            const nombre = this.nombre ? this.nombre.value : "Cliente";
            const servicio = this.servicio ? this.servicio.value : "No especificado";
            const mensaje = `✨ NUEVA CITA MHC STUDIO ✨\n👩 Nombre: ${nombre}\n💅 Servicio: ${servicio}`;
            window.open(`https://wa.me/51936835326?text=${encodeURIComponent(mensaje)}`, "_blank");
        });
    }

    // --- 3. SISTEMA DE ESTRELLAS Y PUBLICACIÓN ---
    let ratingSeleccionado = 0;
    const estrellas = document.querySelectorAll("#estrellas span");
    const btnOpinion = document.getElementById("btnOpinion");

    if (estrellas.length > 0) {
        estrellas.forEach(estrella => {
            estrella.addEventListener("click", function() {
                ratingSeleccionado = this.getAttribute("data-value");
                estrellas.forEach(e => e.classList.remove("activa"));
                for (let i = 0; i < ratingSeleccionado; i++) {
                    estrellas[i].classList.add("activa");
                }
            });
        });
    }

    if (btnOpinion) {
        btnOpinion.addEventListener("click", () => {
            const nombreInput = document.getElementById("nombreOpinion");
            const textoInput = document.getElementById("textoOpinion");

            if (!nombreInput || !textoInput) return;

            const nombre = nombreInput.value.trim();
            const texto = textoInput.value.trim();

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

    // --- 4. MOSTRAR OPINIONES ---
    const contenedor = document.getElementById("listaOpiniones");

    if (contenedor) {
        // Reincorporamos el orderBy para que salgan en orden
        db.collection("opiniones").orderBy("fecha", "desc").onSnapshot(snapshot => {
            if (snapshot.empty) {
                contenedor.innerHTML = "<p style='color:white;'>No hay opiniones guardadas aún.</p>";
                return;
            }

            contenedor.innerHTML = ""; 
            snapshot.forEach(doc => {
                const data = doc.data();
                const estrellasHtml = "⭐".repeat(data.rating || 0);

                contenedor.innerHTML += `
                    <div class="opinion-card">
                        <div class="opinion-header">
                            <strong>${data.nombre || 'Anónimo'}</strong> 
                            <span class="estrellas-rating">${estrellasHtml}</span>
                        </div>
                        <p class="opinion-texto">"${data.texto || 'Sin comentario'}"</p>
                    </div>
                `;
            });
        }, error => {
            console.error("Error en Firebase:", error);
            // Si sale error de índice, se mostrará aquí el link para crearlo
            contenedor.innerHTML = "<p>Error al cargar opiniones. Revisa la consola.</p>";
        });
    }

}); // <--- ESTE ES EL CIERRE QUE FALTABA
