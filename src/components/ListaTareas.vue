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
          {{ id + 1 }} . {{ tarea.text }} - {{ tarea.fecha }}
          <input type="checkbox" @change="completarTarea(id)" />
          <button @click="eliminarTarea(id)">Eliminar</button>
        </li>
      </ul>
      <h5>Tareas completadas: </h5>
      <ul>
        <li v-for="(tareaC, id) in tareasCompletadas" :key="id">
          <p class="completada">{{ id + 1 }} . {{ tareaC.text }}</p>
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
      let nuevaTarea = { text: this.tarea, fecha: new Date().toLocaleString() };
      this.tareas.push(nuevaTarea);
      this.guardarTareasEnLocalStorage();
    },
    completarTarea(index) {
      this.tareasCompletadas.push(this.tareas[index]);
    },
    eliminarTarea(index) {
      this.tareas.splice(index, 1);
    },
    guardarTareasEnLocalStorage() {
      localStorage.setItem('tareas', JSON.stringify(this.tareas));
    },
    cargarTareasDesdeLocalStorage() {
      const tareasGuardadas = localStorage.getItem('tareas');
      if (tareasGuardadas) {
        this.tareas = JSON.parse(tareasGuardadas);
        console.log(this.tareas);
      }
    }
  },
  data() {
    return {
      tarea: "",
      tareas: [],
      tareasCompletadas: [],
    };
  },
  mounted() {
    this.cargarTareasDesdeLocalStorage();
  }
};
</script>

<style scoped>
.completada {
  color: red;
  text-decoration: line-through;
}
</style>
