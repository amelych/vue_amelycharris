<template>
  <div class="hello">
    <h2>{{ mensajeL }}</h2>
    <div>
      <input v-model="tarea" type="text" placeholder="Añadir tarea" />
      <button @click="agregarTarea">Añadir</button>
      <h5>Tareas:</h5>
      <h5>Total de tareas: {{ tareas.length }}</h5>
      <ul>
            <li v-for="(tarea, id) in tareas" :key="id">
               {{ id + 1 }} . {{ tarea }}
               <button @click="eliminarTarea">Eliminar</button>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListaTarea",
  props: {
    mensajeL: String,
  },
  methods: {
    agregarTarea() {
      this.tareas.push(this.tarea);
    },
    eliminarTarea() {
        this.tareas.splice(this.index, 1);
        // this.listarTareas;
    }
  },
  data() {
    return {
      tareas: [],
    };
  },
};
</script>

<style>
</style>