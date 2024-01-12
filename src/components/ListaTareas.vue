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
               <input type="checkbox" @change="completarTarea(id)"/>
               <button @click="eliminarTarea">Eliminar</button>
            </li>
        </ul>
        <h5>Tareas completadas: </h5>
        <ul>
            <li v-for="(tareaC, id) in tareasCompletadas" :key="id">
              <p class="completada">{{ id + 1 }} . {{ tareaC }}</p>
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
      let nuevaTarea = this.nuevaTarea;
      nuevaTarea.text = this.tareaDefault;
      nuevaTarea.date = new Date().toLocaleString();

      this.tareas.push(nuevaTarea);
    },
    completarTarea(index) {
      this.tareasCompletadas.push(this.tareas[index]);
    },
    eliminarTarea() {
        this.tareas.splice(this.index, 1);
        // this.listarTareas;
    }
  },
  data() {
    return {
      tareas: [],
      tareasCompletadas: [],
      nuevaTarea : {
        text: "",
        fecha: ""
      }
    };
  },
};
</script>

<style scopped>

.completada {
  color: red;
  text-decoration: line-through;
}

</style>