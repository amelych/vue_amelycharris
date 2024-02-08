<template>
  <div>
    <NavBar />
  </div>
  <div id="tabla-tareas" class="container">
    <br />
    <div class="row">
      <h3 class="text-center font-weight-bold">Gestión Tareas</h3>
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
                class="form-control form-control-sm"
                v-model="nombre"
                id="nombre"
                name="nombre"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >Descripción:</span
              >
              <input
              ref="descripcion"
                type="text"
                class="form-control"
                v-model="descripcion"
                id="descripcion"
                name="descripcion"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >Fecha:</span
              >
              <input
                type="text"
                class="form-control"
                v-model="fecha"
                id="fecha"
                name="fecha"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >Prioridad:</span
              >
              <input
                type="text"
                class="form-control"
                v-model="prioridad"
                id="prioridad"
                name="prioridad"
              />
            </div>
            <div class="mb-3 text-center">
              <button
                type="button"
                class="btn btn-primary mx-2"
                @click="guardarTarea"
              >
                Guardar
              </button>
              <button
                type="button"
                class="btn btn-primary mx-2"
                @click="modificarTarea"
              >
                Modificar
              </button>
              <button type="button" class="btn btn-secondary" @click="limpiarTarea">
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
        <h2 class="text-center">Listado de Tareas</h2>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-5">
      <thead>
        <tr class="table-info text-center">
          <th>ID</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Fecha Alta</th>
          <th>Prioridad</th>
          <th>Gestión</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarea in tareas" :key="tarea._id">
          <td class="text-center">{{ tarea._id }}</td>
          <td>{{ tarea.nombre }}</td>
          <td>{{ tarea.descripcion }}</td>
          <td class="text-center">{{ tarea.fecha }}</td>
          <td class="text-center">{{ tarea.prioridad }}</td>
          <td class="text-center">
            <button
              type="button"
              class="m-2 btn btn-warning"
              @click="modificarTarea(tarea._id)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarTarea(tarea._id)"
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
import Swal from 'sweetalert2';
//   import Swal from "sweetalert2";
export default {
  name: "TablaTareas",
  components: {
    NavBar,
  },
  data() {
    return {
        nombre: '',
        descripcion: '',
        fecha: '',
        prioridad: '',
        tareas: [],
    };
  },
  created() {
    this.obtenerTareas();
  },

  methods: {
    async obtenerTareas() {
        try {
            const res = await fetch('http://localhost:5000/tareas');
            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }
            this.tareas = await res.json();
            console.log(this.tareas);
        } catch (error) {
            console.log(error);
        }
    },
    async guardarTarea() {
        try {
            const nuevaTarea = {
                nombre: this.nombre,
                descripcion: this.descripcion,
                fecha: this.fecha,
                prioridad: this.prioridad
            };

            const res = await fetch('http://localhost:5000/tareas', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(nuevaTarea)
            });

            await Swal.fire({
                icon: 'success',
                title: '¡Tarea guardada!',
                text: 'La nueva tarea se ha guardado correctamente.'
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }

            await this.obtenerTareas();

            // await this.limpiarTarea();
        } catch (error) {
            console.error(error);
            await Swal.fire ({
                icon: 'error',
                title: 'Error al guardar la tarea',
                text: 'Ha ocurrido un error al intentar guardar la tarea. Por favor, inténtalo de nuevo.'
            });
        }
    },
    async eliminarTarea(id) {
        try {
            const res = await fetch(`http://localhost:5000/tareas/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                const message = `An error has occured: ${res.status}`;
                throw new Error(message);
            }

            await Swal.fire({
                icon: 'success',
                title: '¡Tarea eliminada!',
                text: 'La nueva tarea se ha eliminado correctamente.'
            })

            await this.obtenerTareas();
        } catch (error) {
            console.error(error);
            await Swal.fire ({
                icon: 'error',
                title: 'Error al eliminar la tarea',
                text: 'Ha ocurrido un error al intentar eliminar la tarea. Por favor, inténtalo de nuevo.'
            });
        }
    }
  }
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