class Carrito {
  constructor() {
    this.items = [];
  }

  agregar({ id, nombre, img }) {
    const existente = this.items.find(item => item.id === id);
    if (existente) {
      existente.cantidad++;
    } else {
      this.items.push({ id, nombre, img, cantidad: 1 });
    }
    this.actualizarVista();
  }

  actualizarVista() {
    const listaCarrito = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador-carrito");

    listaCarrito.innerHTML = "";
    let total = 0;

    this.items.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.img}" alt="${item.nombre}" style="width:40px; vertical-align:middle; margin-right:10px;">
        ${item.nombre} x${item.cantidad}
      `;
      listaCarrito.appendChild(li);
      total += item.cantidad;
    });

    contador.textContent = total;
  }

  vaciar() {
    this.items = [];
    this.actualizarVista();
  }
}

const carrito = new Carrito();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".agregar-carrito").forEach(boton => {
    boton.addEventListener("click", () => {
      carrito.agregar({
        id: boton.dataset.id,
        nombre: boton.dataset.nombre,
        img: boton.dataset.img
      });
    });
  });

  document.getElementById("carrito-icono").addEventListener("click", () => {
    const modal = document.getElementById("modal-carrito");
    modal.style.display = modal.style.display === "none" ? "block" : "none";
  });

  activarEventosExtra();
});

function cerrarCarrito() {
  document.getElementById("modal-carrito").style.display = "none";
}

function cuentaRegresiva(n) {
  if (n < 0) return;
  console.log("Cuenta:", n);
  setTimeout(() => cuentaRegresiva(n - 1), 1000);
}

function activarEventosExtra() {
  document.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("focus", () => {
      input.style.outline = "2px solid #00ffcc";
    });
    input.addEventListener("blur", () => {
      input.style.outline = "none";
    });
  });

  window.addEventListener("keydown", e => {
    if (e.key === "c") {
      alert("Encontraste un Easter Egg");
    }
  });

  window.addEventListener("scroll", () => {
    console.log("Scroll detectado:", window.scrollY);
  });

  setTimeout(() => {
    alert("¡Bienvenido a GameBlog! Explora nuestras reseñas y videojuegos.");
  }, 2000);

  cuentaRegresiva(3);
}
