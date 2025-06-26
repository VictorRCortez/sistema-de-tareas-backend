const socket = io("http://localhost:3000");

const form = document.getElementById("formTarea");
const listaTareas = document.getElementById("listaTareas");

let tareaEditandoId = null;

let estadoFiltro = "Todas";
let taresActuales = [];

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const estado = document.getElementById("estado").value;

  if (!titulo) return alert("El título es obligatorio.");

  const tarea = { title: titulo, description: descripcion, status: estado };

  if (tareaEditandoId) {
    await fetch(`http://localhost:3000/api/tareas/${tareaEditandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });

    tareaEditandoId = null;
    document.querySelector("button[type='submit']").textContent = "Agregar";
  } else {
    await fetch("http://localhost:3000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tarea),
    });
  }

  form.reset();
});

socket.on("task-created", (task) => {
  renderizarTareas();
});

socket.on("task-updated", () => renderizarTareas());
socket.on("task-deleted", () => renderizarTareas());

async function renderizarTareas() {
  const res = await fetch("http://localhost:3000/api/tareas");
  const tareas = await res.json();

  tareasActuales = tareas; // guardamos para filtro sin re-fetch
  pintarTareasFiltradas();
  
}


function pintarTareasFiltradas() {
  listaTareas.innerHTML = "";

  const tareasFiltradas = estadoFiltro === "todas"
    ? tareasActuales
    : tareasActuales.filter((t) => t.status === estadoFiltro);

  tareasFiltradas.forEach((t) => {
    const div = document.createElement("div");
    div.className = "col-md-4 mb-3";

    if (tareasFiltradas.length === 0) {
      listaTareas.innerHTML = `
        <div class="col-12 text-center mt-4">
          <div class="alert alert-info">No hay tareas para mostrar.</div>
        </div>
      `;
      return;
    }    

    div.innerHTML = `
      <div class="card shadow border-${getColor(t.status)}">
        <div class="card-body">
          <h5 class="card-title">${t.title}</h5>
          <p class="card-text">${t.description}</p>
          <p class="card-text">Estado: <span class="badge bg-${getColor(t.status)}">${t.status}</span></p>
          <button class="btn btn-sm btn-warning me-2" onclick="editarTarea('${t._id}', '${t.title}', '${t.description}', '${t.status}')">Editar</button>
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
  document.querySelector("button[type='submit']").textContent = "Actualizar";
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


async function eliminarTarea(id) {
  await fetch(`http://localhost:3000/api/tareas/${id}`, { method: "DELETE" });
}

renderizarTareas();
