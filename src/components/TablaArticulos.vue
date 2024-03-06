<template>
    <div>
        <NavBar />
    </div>
    <div id="tabla-articulos" class="container">
    <br />
    <div class="row">
      <h3 class="text-center font-weight-bold">Gestión Artículos</h3>
    </div>
    <hr />
    <div class="container-fluid">
      <div class="row" id="map_section">
        <div class="col-12 col-m-6 col-lg-8 mx-auto">
          <form class="form-inline">
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >Nombre:</span
              >
              <input
                type="text"
                class="form-control"
                v-model="nombre"
                id="nombre"
                name="nombre"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >Precio euros:</span
              >
              <input
                type="text"
                class="form-control"
                v-model="precio_euros"
                id="precio_euros"
                name="precio_euros"
              />
            </div>
            <div class="mb-3 text-center">
              <button
                type="button"
                class="btn btn-primary mx-2"
                @click="guardarArticulo"
              >
                Guardar
              </button>
              <button type="button" class="btn btn-secondary" @click="limpiar">
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <hr />
    <div class="row mt-3">
      <div class="col-md-12">
        <h2 class="text-center">Listado de Artículos</h2>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-5">
      <thead>
        <tr class="table-info text-center">
          <th>Id</th>
          <th>Nombre</th>
          <th>Precio Euros</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="articulo in articulos" :key="articulo.id">
          <td class="text-center">{{ articulo.id }}</td>
          <td>{{ articulo.nombre }}</td>
          <td>{{ articulo.precio_euros }}</td>
          <td class="text-center">
            <button
              type="button"
              class="m-2 btn btn-warning"
              @click="modificarArticulo(articulo.id)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarArticulo(articulo.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Swal from "sweetalert2";
export default {
    name: "TablaArticulos",
    components: {
        NavBar,
    },
    data() {
        return {
            nombre: "",
            precio_euros: "",
            articulos: [],
            articuloSeleccionado: null,
        };
    },
    mounted() {
        this.obtenerArticulos();
    },
    methods: {
        getArticulos() {},
        async postArticulo(articulo) {
      try {
        const response = await fetch("http://localhost:3000/articulos", {
          method: "POST",
          body: JSON.stringify(articulo),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        const articuloCreado = await response.json();
        this.articulo = [...this.articulo, articuloCreado];
      } catch (error) {
        console.log(error);
      }
    },

    async obtenerArticulos() {
      try {
        const response = await fetch("http://localhost:3000/articulos");
        if (!response) {
          throw new Error("No se pudieron obtener los datos del servidor");
        }
        const data = await response.json();
        this.articulos = data;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los datos del servidor",
        });
      }
    },
    putArticulo() {},
    deleteArticulo() {},
    async guardarArticulo() {
      try {
        const articulo = {
          nombre: this.nombre.trim(),
          precio_euros: this.precio_euros,
        };
        let url = "http://localhost:3000/articulos";
        let metodo = "POST";

        if (this.articuloSeleccionado) {
          url += `/${this.articuloSeleccionado.id}`;
          metodo = "PUT";
        }

        const response = await fetch(url, {
          method: metodo,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(articulo),
        });
        if (!response.ok) {
          throw new Error("Error al guardar el articulo en el servidor.");
        }

        this.limpiar();
        this.obtenerArticulos();

        const mensaje = this.articuloSeleccionado
          ? "Articulo modificado correctamente."
          : "Articulo guardado correctamente.";
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: mensaje,
        });
      } catch (error) {
        console.log("Error al guardar el articulo", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al guardar el articulo en el servidor.",
        });
      }
    },
    limpiar() {
      this.nombre = "";
      this.precio_euros = "";
      this.mostrarAlerta("Campos limpiados", "info");
      return;
    },
    modificarArticulo(articuloId) {
      const articulo = this.articulos.find(
        (articulo) => articulo.id === articuloId
      );
      if (articulo) {
        this.articuloSeleccionado = articulo;
        this.nombre = articulo.nombre;
        this.precio_euros = articulo.precio_euros;

        this.mostrarAlerta("Datos del articulo listos para modificar", "info");
      } else {
        this.mostrarAlerta("Articulo no encontrado", "error");
      }
    },
    async eliminarArticulo(articuloId) {
      const confirmacion = await this.mostrarConfirmacionEliminar();
      if (confirmacion) {
        const index = this.articulos.findIndex(
          (articulo) => articulo.id === articuloId
        );
        if (index !== -1) {
          await fetch(`http://localhost:3000/articulos/${articuloId}`, {
            method: "DELETE",
          });
          // this.mostrarAlerta("Cliente eliminado correctamente", "success");
        } else {
          this.mostrarAlerta("Articulo no encontrado", "error");
        }
      }
    },
    async mostrarConfirmacionEliminar() {
      // Mostrar ventana de confirmación
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro de que deseas eliminar este cliente?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        customClass: {
          container: "custom-alert-container",
          popup: "custom-alert",
          confirmButton: "custom-alert-button",
          cancelButton: "custom-alert-button",
        },
      });

      return confirmacion.isConfirmed;
    },
    mostrarAlerta(mensaje, tipo) {
      Swal.fire({
        title: mensaje,
        icon: tipo,
        customClass: {
          container: "custom-alert-container",
          popup: "custom-alert",
          confirmButton: "custom-alert-button",
        },
      });
    },
    }
}
</script>

<style>
.btn-no-hover:hover {
  background-color: white !important;
  border-color: white !important;
}

.btn-no-hover i {
  color: #000 !important;
}

.custom-span {
  width: 120px;
  display: inline-block;
  text-align: left;
}
</style>