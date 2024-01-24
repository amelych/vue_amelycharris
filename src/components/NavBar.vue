<template>
  <div>
    <nav class="navbar navbar-dark bg-primary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/" class="navbar-brand">Inicio</router-link>
        <router-link to="/clientes" class="navbar-brand">Clientes</router-link>
        <router-link v-if="articulosExists" to="/articulos" class="navbar-brand"
          >Articulos</router-link
        >
        <router-link v-if="ventasExists" to="/ventas" class="navbar-brand"
          >Ventas</router-link
        >
        <router-link v-if="contactoExists" to="/contacto" class="navbar-brand"
          >Contacto</router-link
        >
        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Búsqueda"
            aria-label="Search"
          />
          <button class="btn btn-light btn-no-hover" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
        <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/clientes" class="nav-link">Clientes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/articulos" class="nav-link">Artículos</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ventas" class="nav-link">Ventas</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contacto" class="nav-link">Contacto</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
    computed: {
        clientesExists() {
            return this.$router.hasRoute('clientes');
        },
        ventasExists() {
            return this.$router.hasRoute('ventas');
        },
        contactoExists() {
            return this.$router.hasRoute('contacto');
        },
        articulosExists() {
            return this.$router.hasRoute('articulos');
        }
    }
}
</script>

<style>
</style>