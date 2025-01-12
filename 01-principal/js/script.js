// Consultar las personas desde la base de datos
function fetchPersons() {
  fetch("crud.php")
    .then((response) => response.json())
    .then((data) => {
      let tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";
      data.forEach((person) => {
        let row = document.createElement("tr");
        row.innerHTML = `
                    <td>${person.nombre}</td>
                    <td>${person.apellido}</td>
                    <td>${person.edad}</td>
                    <td>
                        <button onclick="editPerson(${person.id}, '${person.nombre}', '${person.apellido}', ${person.edad})">Editar</button>
                        <button onclick="deletePerson(${person.id})">Eliminar</button>
                    </td>
                `;
        tableBody.appendChild(row);
      });
    });
}

// Agregar persona
function addPerson() {
  let nombre = document.getElementById("nombre").value.trim();
  let apellido = document.getElementById("apellido").value.trim();
  let edad = document.getElementById("edad").value;

  // Validación básica
  if (!nombre || !apellido || !edad) {
    alert("Por favor, complete todos los campos");
    return;
  }

  fetch("crud.php", {
    method: "POST",
    body: new URLSearchParams({
      action: "add",
      nombre: nombre,
      apellido: apellido,
      edad: edad,
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        fetchPersons();
        document.getElementById("personForm").reset();
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Hubo un error al procesar la solicitud");
    });
}

// Editar persona
function editPerson(id, nombre, apellido, edad) {
  document.getElementById("personId").value = id;
  document.getElementById("nombre").value = nombre;
  document.getElementById("apellido").value = apellido;
  document.getElementById("edad").value = edad;
}

// Actualizar persona
function updatePerson() {
  let id = document.getElementById("personId").value;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let edad = document.getElementById("edad").value;

  fetch("crud.php", {
    method: "POST",
    body: new URLSearchParams({
      action: "edit",
      id: id,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  }).then((response) => {
    fetchPersons(); // Actualizar la tabla
    document.getElementById("personForm").reset(); // Limpiar el formulario
  });
}

// Eliminar persona
function deletePerson(id) {
  fetch("crud.php", {
    method: "POST",
    body: new URLSearchParams({
      action: "delete",
      id: id,
    }),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  }).then((response) => {
    fetchPersons(); // Actualizar la tabla
  });
}

// Cargar las personas al inicio
window.onload = function () {
  fetchPersons();
};
