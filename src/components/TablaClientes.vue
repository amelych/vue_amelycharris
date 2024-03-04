<template>
  <div>
    <NavBar />
  </div>
  <div id="tabla-clientes" class="container">
    <br />
    <div class="row">
      <h3 class="text-center font-weight-bold">Gestión Clientes</h3>
    </div>
    <hr />
    <div class="container-fluid">
      <div class="row" id="map_section">
        <div class="col-12 col-m-6 col-lg-8 mx-auto">
          <form class="form-inline">
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >DNI/NIE:</span
              >
              <input
                type="text"
                class="form-control"
                v-model="dni"
                id="dni"
                name="dni"
                @blur="validarDniNie"
              />
            </div>
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
                >Apellidos:</span
              >
              <input
                type="text"
                class="form-control"
                v-model="apellido"
                id="apellido"
                name="apellido"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >Email:</span
              >
              <input
                type="text"
                class="form-control"
                v-model="email"
                id="email"
                name="email"
              />
            </div>
            <div class="mb-3 text-center">
              <button
                type="button"
                class="btn btn-primary mx-2"
                @click="guardarCliente"
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
        <h2 class="text-center">Listado de Clientes</h2>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-5">
      <thead>
        <tr class="table-info text-center">
          <th>DNI</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo Electrónico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td class="text-center">{{ cliente.dni }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.email }}</td>
          <td class="text-center">
            <button
              type="button"
              class="m-2 btn btn-warning"
              @click="modificarCliente(cliente.id)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarCliente(cliente.id)"
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
import NavBar from "@/components/NavBar.vue";
import Swal from "sweetalert2";
export default {
  name: "TablaClientes",
  components: {
    NavBar,
  },
  data() {
    return {
      nombre: "",
      apellido: "",
      dni: "",
      email: "",
      clientes: [],
      clienteSeleccionado: null,
    };
  },
  mounted() {
    this.obtenerClientes();
  },
  methods: {
    getUsuarios() {},
    async postUsuario(usuario) {
      try {
        const response = await fetch('http://localhost:3000/usuarios', {
          method: 'POST',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json; charset=UTF-8'},
        });
        const usuarioCreado = await response.json();
        this.usuarios = [...this.usuarios, usuarioCreado];
      } catch (error) {
        console.error(error);
      }
    },
    putUsuario() {},
    deleteUsuario() {},
    // async metodoAsincrono() {
    //   try {
    //     const response = await fetch('url');
    //     const data = await response.json();
    //   } catch (error) {
    //     // ejecución en caso de error
    //   }
    // },
    async obtenerClientes() {
      try {
        const response = await fetch("http://localhost:3000/clientes");
        if (!response) {
          throw new Error("No se pudieron obtener los datos del servidor");
        }

        const data = await response.json();
        this.clientes = data;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los datos del servidor",
        });
      }
    },
    // guardar() {
    //   if (
    //     this.nombre.trim() === "" ||
    //     this.apellido.trim() === "" ||
    //     this.dni.trim() === "" ||
    //     this.email.trim() === ""
    //   ) {
    //     this.mostrarAlerta("Debe completar los campos", "warning");
    //   } else {
    //     const nuevoCliente = {
    //       id: this.clientes.length + 1,
    //       nombre: this.nombre.trim().toUpperCase(),
    //       apellido: this.apellido.trim().toUpperCase(),
    //       dni: this.dni.trim().toUpperCase(),
    //       email: this.email.trim(),
    //     };

    //     this.clientes.push(nuevoCliente);

    //     this.limpiar();
    //     this.mostrarAlerta("Cliente guardado correctamente", "success");
    //   }
    // },
    async guardarCliente() {
      try {
        const validarDniNie = this.validarDniNie();
        if (validarDniNie) {
          const cliente = {
            dni: this.dni.trim().toUpperCase(),
            nombre: this.nombre.trim(),
            apellido: this.apellido.trim(),
            email: this.email.trim(),
          };
          let url = 'http://localhost:3000/clientes';
          let metodo = 'POST';

          if (this.clienteSeleccionado) {
            url += `/${this.clienteSeleccionado.id}`;
            metodo = 'PUT';
          }

          const response = await fetch(url, {
            method: metodo,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
          });
          if (!response.ok) {
            throw new Error('Error al guardar el cliente en el servidor.');
          }

          this.limpiar();
          this.obtenerClientes();

          const mensaje = this.clienteSeleccionado ? 'Cliente modificado correctamente.' : 'Cliente guardado correctamente.';
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: mensaje,
          });
        } else {
          this.mostrarAlerta('DNI o NIE no válido', 'error');
        }
      } catch (error) {
        console.log('Error al guardar el cliente', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar el cliente en el servidor.',
        });
      }
    },
    limpiar() {
      this.nombre = "";
      this.apellido = "";
      this.dni = "";
      this.email = "";
      this.mostrarAlerta("Campos limpiados", "info");
      return;
    },
    validarDniNie() {
      let dniNie = this.dni.trim().toUpperCase();
      this.dni = dniNie;
      const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
      if (!regexDniNie.test(dniNie)) {
        this.mostrarAlerta("DNI/NIE no válido", "error");
        this.dni = "";
        return;
      }
      const valor = dniNie.replace(/^[XYZ]/, (letra) => {
        return letra === "X"
          ? "0"
          : letra === "Y"
          ? "1"
          : letra === "Z"
          ? "2"
          : letra;
      });
      const numero = parseInt(valor.slice(0, 9), 10);
      const letraCalculada = "TRWAGMYFPDXBNJZSQVHLCKE".charAt(numero % 23);
      if (letraCalculada !== dniNie.charAt(8) || !regexDniNie.test(dniNie)) {
        this.mostrarAlerta("DNI/NIE no válido", "error");
        return false;
      } else {
        return true;
      }
    },
    modificarCliente(clienteId) {
      const cliente = this.clientes.find((cliente) => cliente.id === clienteId);
      if (cliente) {
        this.clienteSeleccionado = cliente;
        this.nombre = cliente.nombre;
        this.apellido = cliente.apellido;
        this.dni = cliente.dni;
        this.email = cliente.email;

        this.mostrarAlerta("Datos del cliente listos para modificar", "info");
      } else {
        this.mostrarAlerta("Cliente no encontrado", "error");
      }
    },
    async eliminarCliente(clienteId) {
      const confirmacion = await this.mostrarConfirmacionEliminar();
      if (confirmacion) {
        const index = this.clientes.findIndex(
          (cliente) => cliente.id === clienteId
        );
        if (index !== -1) {
          await fetch(`http://localhost:3000/clientes/${clienteId}`, {
            method: "DELETE",
          });
          // this.mostrarAlerta("Cliente eliminado correctamente", "success");
        } else {
          this.mostrarAlerta("Cliente no encontrado", "error");
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
  },
};
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