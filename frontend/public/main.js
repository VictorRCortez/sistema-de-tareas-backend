//const socket = io("http://localhost:3000");
const socket = io("https://sistema-de-tareas-backend.onrender.com/")

const form = document.getElementById("formTarea");
const listaTareas = document.getElementById("listaTareas");

let tareaEditandoId = null;

let estadoFiltro = "todas";
let taresActuales = [];
let estadoOriginal = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const estado = document.getElementById("estado").value;

  if (!titulo) return alert("El título es obligatorio.");

  if (tareaEditandoId && estadoOriginal === "en progreso" && estado === "pendiente") {
    mostrarAlerta("⚠️ No se puede cambiar una tarea de 'en progreso' a 'pendiente'.","warning");
    // ✅ Limpiar campos y resetear estado
    form.reset();
    tareaEditandoId = null;
    estadoOriginal = null;
    document.querySelector("button[type='submit']").textContent = "Agregar";

    return;
  }
  

  const tarea = { title: titulo, description: descripcion, status: estado };

  if (tareaEditandoId) {
    //https://sistema-de-tareas-backend.onrender.com/
    //await fetch(`https://sistema-de-tareas-backend.onrender.com/api/tareas/${tareaEditandoId}`,
    await fetch(`https://sistema-de-tareas-backend.onrender.com/api/tareas/${tareaEditandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });
      //Mostrar alerta Bootstrap
    mostrarAlertaActualizar("✏️ Tarea actualizada correctamente", "info");

   //Limpiar formulario
    form.reset();

    tareaEditandoId = null;
    document.querySelector("button[type='submit']").textContent = "Agregar";
  } else {
    await fetch("https://sistema-de-tareas-backend.onrender.com/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });
    mostrarAlertaAgregar("✅ Tarea agregada exitosamente", "success");

    form.reset();

    //Asegurar que el botón vuelva a decir "Agregar"
    document.querySelector("button[type='submit']").textContent = "Agregar";

  }

  form.reset();
});

socket.on("task-created", (task) => {renderizarTareas();});

socket.on("task-updated", () => renderizarTareas());
socket.on("task-deleted", () => renderizarTareas());

async function renderizarTareas() {
  const res = await fetch("https://sistema-de-tareas-backend.onrender.com/api/tareas");
  const tareas = await res.json();

  tareasActuales = tareas; // guardamos para filtro sin re-fetch
  pintarTareasFiltradas();
  
}


function pintarTareasFiltradas() {
  listaTareas.innerHTML = "";

  const tareasFiltradas = estadoFiltro === "todas"
    ? tareasActuales
    : tareasActuales.filter((t) => t.status === estadoFiltro);

  if (tareasFiltradas.length === 0) {
    listaTareas.innerHTML = `
      <div class="col-12 text-center mt-4">
        <div class="alert alert-info">No hay tareas para mostrar.</div>
      </div>
    `;
    return;
  }

  tareasFiltradas.forEach((t) => {
    const div = document.createElement("div");
    div.className = "col-md-4 mb-3";

    div.innerHTML = `
    <div class="card shadow border-${getColor(t.status)}">
      <div class="card-body">
        <h5 class="card-title">${t.title}</h5>
        <p class="card-text">${t.description}</p>
        <p class="card-text">Estado: 
          <span class="badge bg-${getColor(t.status)}">${t.status}</span>
        </p>
        <p class="card-text text-muted">
          Creado: ${t.createdAt ? new Date(t.createdAt).toLocaleString('es-ES') : ''}
        </p>
        ${t.startedAt ? `<p class="card-text text-primary">En progreso: ${new Date(t.startedAt).toLocaleString('es-ES')}</p>` : ''}
        ${t.completedAt ? `<p class="card-text text-success">Completada: ${new Date(t.completedAt).toLocaleString('es-ES')}</p>` : ''}
  
        ${t.status !== 'completada' 
          ? `<button class="btn btn-sm btn-warning me-2" onclick="editarTarea('${t._id}', '${t.title}', '${t.description}', '${t.status}')">Editar</button>` 
          : `<button class="btn btn-sm btn-warning me-2" disabled>Editar</button>`}
        <button class="btn btn-sm btn-danger" onclick="eliminarTarea('${t._id}')">Eliminar</button>
      </div>
    </div>
  `;

    listaTareas.appendChild(div);
  });
}


function getColor(estado) {
  if (estado === "pendiente") return "secondary";
  if (estado === "en progreso") return "warning";
  if (estado === "completada") return "success";
}

function editarTarea(id, titulo, descripcion, estado) {
  document.getElementById("titulo").value = titulo;
  document.getElementById("descripcion").value = descripcion;
  document.getElementById("estado").value = estado;
  
  tareaEditandoId = id;
  estadoOriginal = estado; //guardamos el estado original
  document.querySelector("button[type='submit']").textContent = "Actualizar";

  //desplaza  al formulario -- id de formulario es formTarea
  document.getElementById("formTarea").scrollIntoView({ behavior: "smooth" });
}

function filtrarTareas(estado) {
  estadoFiltro = estado;

  // Remover clases activas de todos los botones
  document.querySelectorAll(".btn-group .btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Agregar clase activa al botón presionado
  const botonActivo = [...document.querySelectorAll(".btn-group .btn")]
    .find((btn) => btn.textContent.toLowerCase().includes(estado));
  if (botonActivo) botonActivo.classList.add("active");

  pintarTareasFiltradas();
}


let idTareaAEliminar = null;

function eliminarTarea(id) {
  idTareaAEliminar = id;
  const modal = new bootstrap.Modal(document.getElementById('modalEliminar'));
  modal.show();
}

document.getElementById("btnConfirmarEliminar").addEventListener("click", async () => {
  if (idTareaAEliminar) {
    await fetch(`https://sistema-de-tareas-backend.onrender.com/api/tareas/${idTareaAEliminar}`, { method: "DELETE" });
    idTareaAEliminar = null;

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalEliminar'));
    modal.hide();
  }
});


function mostrarAlerta(mensaje, tipo = 'warning') {
  const idUnico = `alerta-${Date.now()}`;
  const alertaDiv = document.getElementById("mensajeAlerta");

  alertaDiv.innerHTML = `
    <div id="${idUnico}" class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;

  // Cierre automático después de 2 segundos
  setTimeout(() => {
    const alerta = document.getElementById(idUnico);
    if (alerta) {
      alerta.classList.remove("show"); // esto activa el fade-out
      alerta.classList.add("fade");    // asegura animación
      setTimeout(() => alerta.remove(), 200); // tiempo para animación
    }
  }, 2000);
}

function mostrarAlertaAgregar(mensaje, tipo = 'success') {
  const idUnico = `alerta-${Date.now()}`;
  const alertaDiv = document.getElementById("mensajeAlerta");

  alertaDiv.innerHTML = `
    <div id="${idUnico}" class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;

  // Cierre automático después de 2 segundos
  setTimeout(() => {
    const alerta = document.getElementById(idUnico);
    if (alerta) {
      alerta.classList.remove("show");
      alerta.classList.add("fade");
      setTimeout(() => alerta.remove(), 200);
    }
  }, 2000);
}

function mostrarAlertaActualizar(mensaje = "", tipo = 'info') {
  const idUnico = `alerta-${Date.now()}`;
  const alertaDiv = document.getElementById("mensajeAlerta");

  alertaDiv.innerHTML = `
    <div id="${idUnico}" class="alert alert-${tipo} alert-dismissible fade show" role="alert">
      ${mensaje}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>
  `;

  setTimeout(() => {
    const alerta = document.getElementById(idUnico);
    if (alerta) {
      alerta.classList.remove("show");
      alerta.classList.add("fade");
      setTimeout(() => alerta.remove(), 200);
    }
  }, 2000);
}




renderizarTareas();
