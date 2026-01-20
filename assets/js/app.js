console.log("JS cargado");

// ====================
// DATOS
// ====================

const catalogo = [
  { id: 1, nombre: "Labial Rouge", precio: 19990 },
  { id: 2, nombre: "Base Silk Skin", precio: 24990 },
  { id: 3, nombre: "Perfume Élixir", precio: 39990 },
  { id: 4, nombre: "Máscara Volume", precio: 14990 },
  { id: 5, nombre: "Iluminador Gold", precio: 17990 },
  { id: 6, nombre: "Paleta Nude", precio: 29990 },
  { id: 7, nombre: "Corrector Velvet", precio: 12990 },
  { id: 8, nombre: "Rubor Rosé", precio: 15990 },
  { id: 9, nombre: "Primer Glow", precio: 18990 },
  { id: 10, nombre: "Delineador Black", precio: 10990 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let descuentoAplicado = 0;

// ====================
// UTILIDADES
// ====================

const formatoCLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP"
});

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ====================
// CARGA GENERAL
// ====================

document.addEventListener("DOMContentLoaded", () => {

  // ===== CATÁLOGO (index.html) =====
  const contenedorCatalogo = document.getElementById("catalogo");

  if (contenedorCatalogo) {
    catalogo.forEach(prod => {
      contenedorCatalogo.innerHTML += `
        <div class="col-md-3">
          <div class="card shadow-sm h-100">
            <img src="assets/img/Producto.jpg" class="card-img-top" alt="producto">
            <div class="card-body text-center">
              <h6 class="fw-bold">${prod.nombre}</h6>
              <p>${formatoCLP.format(prod.precio)}</p>
              <button class="btn btn-dark btn-sm"
                      onclick="agregarProducto(${prod.id})">
                Agregar
              </button>
            </div>
          </div>
        </div>
      `;
    });
  }

  // ===== CARRITO (carrito.html) =====
  renderizarCarrito();

  // ===== ESTADO USUARIO =====
  const usuario = localStorage.getItem("usuarioLogueado");
  const estado = document.getElementById("estadoUsuario");

  if (usuario && estado) {
    estado.textContent = `Hola, ${usuario}`;
  }
});

// ====================
// CARRITO
// ====================

function agregarProducto(id) {
  const producto = catalogo.find(p => p.id === id);
  if (!producto) return;

  carrito.push(producto);
  guardarCarrito();
  alert("Producto agregado al carrito");
}

function quitarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderizarCarrito();
}

function aplicarDescuento() {
  const input = document.getElementById("codigoDescuento");
  if (!input) return;

  const codigo = input.value.trim().toUpperCase();

  if (codigo === "DESCUENTO10") {
    descuentoAplicado = 0.10;
    alert("🎉 Descuento del 10% aplicado");
  } 
  else if (codigo === "BEAUTY20") {
    descuentoAplicado = 0.20;
    alert("🎉 Descuento del 20% aplicado");
  } 
  else {
    descuentoAplicado = 0;
    alert("❌ Código inválido");
  }

  renderizarCarrito();
}

function renderizarCarrito() {
  const tabla = document.getElementById("tablaCarrito");
  if (!tabla) return;

  tabla.innerHTML = "";
  let subtotal = 0;

  carrito.forEach((producto, index) => {
    subtotal += producto.precio;

    tabla.innerHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${formatoCLP.format(producto.precio)}</td>
        <td>1</td>
        <td>${formatoCLP.format(producto.precio)}</td>
        <td>
          <button class="btn btn-sm btn-danger"
                  onclick="quitarProducto(${index})">
            ✕
          </button>
        </td>
      </tr>
    `;
  });

  const montoDescuento = subtotal * descuentoAplicado;
  const total = subtotal - montoDescuento;

  document.getElementById("subtotal").textContent =
    formatoCLP.format(subtotal);

  document.getElementById("descuento").textContent =
    formatoCLP.format(montoDescuento);

  document.getElementById("total").textContent =
    formatoCLP.format(total);
}

// ====================
// LOGIN
// ====================

const PASSWORD_MAESTRA = "1234";

function loginDesdePagina() {
  const usuario = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  if (password === PASSWORD_MAESTRA) {
    localStorage.setItem("usuarioLogueado", usuario);
    window.location.href = "index.html";
  } else {
    alert("Credenciales incorrectas");
  }
}

function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "index.html";
}
