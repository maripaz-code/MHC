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

});