<template>
  <div>
    <NavBar />
  </div>
  <div>
    <h1 class="text-center">Página de inicio de {{ alumno_a }}</h1>
  </div>
  <div class="container text-center mt-5">
    <div class="row mx-auto">
      <div class="col">
        <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">
          Gestión Cliente
        </button>
        <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">
          Gestión Articulos
        </button>
      </div>
    </div>
    <div class="row mx-auto">
      <div class="col">
        <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">
          Gestión Ventas
        </button>
        <button type="button" class="btn btn-primary btn-lg m-3 p-5 w-25">Contacto</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "PaginaInicio",
  components: {
    NavBar,
  },
  data() {
    return {
      alumno_a: "Amely",
    };
  },
  mounted() {
    console.log("Componente PaginaInicio.vue cargado");
  },
};
</script>

<style>
</style>