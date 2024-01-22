<template>
  <div id="tabla-clientes" class="container">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Inicio</a>
        <a class="navbar-brand" href="#">Clientes</a>
        <a class="navbar-brand" href="#">Articulos</a>
        <a class="navbar-brand" href="#">Ventas</a>
        <a class="navbar-brand" href="#">Contacto</a>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search">
            <button class="btn btn-light" type="submit">
              <i class="bi bi-search"></i>
            </button>
        </form>
      </div>
    </nav>
    <div class="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
      <div class="bg-light p-4">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link" href="#">Articulos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Ventas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Contacto</a>
            </li>
          </ul>
      </div>
    </div>
    <br/>
    <div class="row">
      <h3 class="text-center font-weight-bold">Gestión Clientes</h3>
    </div>
    <hr>
    <div class="container-fluid">
      <div class="row" id="map_section">
        <div class="col-12 col-m-6 col-lg-8 mx-auto">
          <form class="form-inline">
            <div class="input-group mb-3">
            <span class="input-group-text custom-span" id="basic-addon1">DNI/NIE:</span>
            <input type="text" class="form-control" v-model="dni" id="dni" name="dni" @blur="validarDniNie">
            </div> 
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1">Nombre:</span>
            <input type="text" class="form-control" v-model="nombre" id="nombre" name="nombre">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1">Apellidos:</span>
            <input type="text" class="form-control" v-model="apellido" id="apellido" name="apellido">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1">Email:</span>
            <input type="text" class="form-control" v-model="email" id="email" name="email">
            </div>
            <div class="mb-3 text-center">
          <button type="button" class="btn btn-primary mx-2" @click="guardar">Guardar</button>
          <button type="button" class="btn btn-secondary" @click="limpiar">Limpiar</button>
        </div>
          </form>
        </div>
      </div>
    </div>
    <hr>
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
            <button type="button" class="m-2 btn btn-warning" @click="modificarCliente(cliente.id)">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button type="button" class="btn btn-danger" @click="eliminarCliente(cliente.id)">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
export default {
  name: "TablaClientes",
  methods: {
    guardar() {
      if(this.nombre.trim() === '' || this.apellido.trim() === '' || this.dni.trim() === '' || this.email.trim() === '') {
        this.mostrarAlerta('Debe completar los campos', 'warning');
      } else {
        const nuevoCliente = {
          id: this.clientes.length + 1,
          nombre: this.nombre.trim().toUpperCase(),
          apellido: this.apellido.trim().toUpperCase(),
          dni: this.dni.trim().toUpperCase(),
          email: this.email.trim(),
        };

        this.clientes.push(nuevoCliente);
        
        this.limpiar();
        this.mostrarAlerta('Cliente guardado correctamente', 'success');
      }
    },
    limpiar() {
      this.nombre = '';
      this.apellido = '';
      this.dni = '';
      this.email = '';
      this.mostrarAlerta('Campos limpiados', 'info');
      return 
    },
    validarDniNie() {
      let dniNie = this.dni.trim().toUpperCase();
      this.dni =dniNie;
      const regexDniNie = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]/;
      if(!regexDniNie.test(dniNie)) {
        this.mostrarAlerta('DNI o NIE no válido', 'error');
        this.dni = '';
        return;
      }

      const numero = parseInt(dniNie.slice(0,8), 10);
      let letraCalculada = '';

      if(dniNie.charAt(0) === 'X' || dniNie.charAt(0) === 'Y' || dniNie.charAt(0) === 'Z') {
        switch(dniNie.charAt(0)) {
          case 'X':
            // valor 0
            dniNie = '0' + dniNie.slice(1);
          break;
          case 'Y':
            // valor 1
            dniNie = '1' + dniNie.slice(1);
          break;
          case 'Z':
            // valor 2
            dniNie = '2' + dniNie.slice(1);
          break;
        }
      } else {
        letraCalculada = 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numero % 23);
      }

      if (letraCalculada !== dniNie.charAt(8)) {
        this.mostrarAlerta('DNI o NIE no válido', 'error');
        this.dni = '';
      }
    },
    modificarCliente(clienteId) {
      const cliente = this.clientes.find(cliente => cliente.id === clienteId);
      if (cliente) {
        this.nombre = cliente.nombre;
        this.apellido = cliente.apellido;
        this.dni = cliente.dni;
        this.email = cliente.email;

        this.mostrarAlerta('Datos del cliente listos para modificar', 'info');
      } else {
        this.mostrarAlerta('Cliente no encontrado', 'error');
      }
    },
    eliminarCliente(clienteId) {
      const index = this.clientes.findIndex(cliente => cliente.id === clienteId);
      if(index !== -1) {
        this.clientes.splice(index, 1);
        this.mostrarAlerta('Cliente eliminado correctamente', 'success');
      } else {
        this.mostrarAlerta('Cliente no encontrado', 'error');
      }
    },
    mostrarAlerta(mensaje, tipo) {
      Swal.fire({
        title: mensaje,
        icon: tipo,
        customClass: {
          container: 'custom-alert-container',
          popup: 'custom-alert',
          confirmButton: 'custom-alert-button',
        },
      });
    }
  },
  data() {
    return {
      nombre: '',
      apellido: '',
      dni: '',
      email: '',
      clientes: [
        {
          id: 1,
          nombre: "Juan",
          apellido: "Perez",
          dni: "55368308V",
          email: "micorreo@correo.com",
        },
        {
          id: 2,
          nombre: "María",
          apellido: "Abal",
          dni: "92417342F",
          email: "sucorreo@correo.com",
        },
        {
          id: 3,
          nombre: "Pedro",
          apellido: "García",
          dni: "34242073H",
          email: "elcorreo@correo.com",
        },
        {
          id: 4,
          nombre: "Lucía",
          apellido: "González",
          dni: "Y0532559P",
          email: "otrocorreo@correo.com",
        },
        {
          id: 5,
          nombre: "Ana",
          apellido: "Rodríguez",
          dni: "57249576T",
          email: "ana@correo.com",
        }
      ],
    };
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