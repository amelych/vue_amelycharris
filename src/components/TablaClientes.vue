<template>
  <div id="tabla-clientes" class="container">
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Inicio</a>
        <a class="navbar-brand" href="#">Clientes</a>
        <a class="navbar-brand" href="#">Productos</a>
        <a class="navbar-brand" href="#">Ventas</a>
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Búsqueda" aria-label="Search">
            <button class="btn btn-dark" type="submit">Buscar</button>
        </form>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
      </div>
    </nav>
    <div class="row mt-3">
      <div class="col-md-12">
        <h2 class="text-center">Listado de Clientes</h2>
      </div>
    </div>
    <table class="table table-striped mt-5">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>DNI</th>
          <th>e-mail</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.id">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.apellido }}</td>
          <td>{{ cliente.dni }}</td>
          <td>{{ cliente.email }}</td>
          <td>
            <button type="button" class="m-2 btn btn-warning">Editar</button>
            <button type="button" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TablaClientes",
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
</style>