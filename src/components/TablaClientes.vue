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
        <form class="d-flex" role="search">
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
              <a class="nav-link active" aria-current="page" href="#">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Clientes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Articulos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Ventas</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Contacto</a>
            </li>
          </ul>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <h2 class="text-center">Gestión Clientes</h2>
        <hr>
      <form class="row gx-3 gy-2 align-items-center">
        <div class="input-group row mb-2">
          <span class="input-group-text col-sm-2 col-form-label" id="basic-addon1">Nombre:</span>
          <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group row mb-2">
          <span class="input-group-text col-sm-2 col-form-label" id="basic-addon1">Apellido:</span>
          <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group row mb-2">
          <span class="input-group-text col-sm-2 col-form-label" id="basic-addon1">DNI:</span>
          <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="input-group row mb-2">
          <span class="input-group-text col-sm-2 col-form-label" id="basic-addon1">Email:</span>
          <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        <div class="mb-3 text-center">
          <button type="button" class="btn btn-primary mx-2">Guardar</button>
          <button type="button" class="btn btn-secondary">Limpiar</button>
        </div>
      </form>
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
      <tbody class="table-sriped">
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td class="text-center">{{ cliente.dni }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.email }}</td>
          <td class="text-center">
            <button type="button" class="m-2 btn btn-warning">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button type="button" class="btn btn-danger">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>
// import VueSweetalert2 from 'vue-sweetalert2';
export default {
  name: "TablaClientes",
  methods: {
    guardar() {

    },
    limpiar() {
      this.nombre = '',
      this.apellido = '',
      this.dni = '',
      this.email = ''
    }
  },
  data() {
    return {
      clientes: [
        {
          id: 1,
          nombre: "Juan",
          apellido: "Perez",
          dni: "12345678",
          email: "micorreo@correo.com",
        },
        {
          id: 2,
          nombre: "María",
          apellido: "Abal",
          dni: "12345678",
          email: "sucorreo@correo.com",
        },
        {
          id: 3,
          nombre: "Pedro",
          apellido: "García",
          dni: "12345678",
          email: "elcorreo@correo.com",
        },
        {
          id: 4,
          nombre: "Lucía",
          apellido: "González",
          dni: "12345678",
          email: "otrocorreo@correo.com",
        },
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