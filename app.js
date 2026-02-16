const tiempoInicio = new Date().toLocaleString();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('mainForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btnEnviar = e.target.querySelector('button');
        const textoOriginal = btnEnviar.innerText;
        
        btnEnviar.innerText = "PROCESANDO...";
        btnEnviar.disabled = true;

        const datos = {
            solicitante: document.getElementById('nombreSolicitante').value,
            correo: document.getElementById('correoSolicitante').value,
            tipoSolicitud: document.querySelector('input[name="tipoSolicitud"]:checked').value,
            descripcion: document.getElementById('desc').value,
            horaInicio: tiempoInicio,
            horaFinalizacion: new Date().toLocaleString()
        };

        try {
            const response = await fetch('https://n8n.comware.com.co/webhook/Solicitudes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (response.ok) {
                mostrarPantallaExito(); // Llamamos a la función de éxito
                form.reset();
            } else {
                alert('❌ Error en el servidor de n8n.');
                resetBoton(btnEnviar, textoOriginal);
            }
        } catch (error) {
            alert('❌ Error de conexión. Revisa la VPN o el estado de n8n.');
            resetBoton(btnEnviar, textoOriginal);
        }
    });
});

function resetBoton(btn, texto) {
    btn.innerText = texto;
    btn.disabled = false;
}

// Función que crea la pantalla de éxito gigante
function mostrarPantallaExito() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay-exito';
    
    overlay.innerHTML = `
        <div class="icono-check">✅</div>
        <h1 class="titulo-exito">¡ENVÍO EXITOSO!</h1>
        <p style="font-size: 1.2rem; color: #666; max-width: 500px;">
            Tu solicitud ha sido recibida y está siendo procesada por nuestro sistema.
        </p>
        <button onclick="window.location.reload()" class="btn-enviar" style="max-width: 300px; margin-top: 30px;">
            VOLVER AL FORMULARIO
        </button>
    `;
    
    document.body.appendChild(overlay);
    // Bloqueamos el scroll del body mientras está el éxito
    document.body.style.overflow = 'hidden';
}