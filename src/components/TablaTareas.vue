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
              <span class="input-group-text custom-span">Fecha:</span>
              <input
                ref="fechaAlta"
                v-model="fecha"
                type="text"
                class="form-control"
                placeholder="Seleccionar fecha"
              />
              <button
                @click="abrirCalendario"
                class="btn btn-outline-secondary"
                type="button"
              >
                <i class="bi bi-calendar"></i>
              </button>
            </div>
            <div class="input-group mb-3 w-25">
              <label class="input-group-text custom-span" for="salaSelect"
                >Sala:
              </label>
              <select class="form-select" v-model="sala" id="salaSelect">
                <option value="Sala 1">Sala 1</option>
                <option value="Sala 2">Sala 2</option>
                <option value="Sala 3">Sala 3</option>
              </select>
            </div>
            <div class="input-group mb-3">
              <span
                class="input-group-text custom-span"
                style="margin-right: 20px"
                >Equipamiento</span
              >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="equipoVideoconferencia"
                  v-model="equipos"
                  value="Equipo Videoconferencia"
                />
                <label class="form-check-label" for="equipoVideoconferencia"
                  >Equipo Videoconferencia</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="televisor"
                  v-model="equipos"
                  value="Televisor"
                />
                <label class="form-check-label" for="televisor"
                  >Televisor</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="pizarraDigital"
                  v-model="equipos"
                  value="Pizarra Digital"
                />
                <label class="form-check-label" for="pizarraDigital"
                  >Pizarra Digital</label
                >
              </div>
            </div>
            <div class="input-group-text mb-3">
              <span
                class="input-group-text custom-span"
                style="margin-right: 10px"
                >Prioridad:</span
              >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="prioridadAlta"
                  value="alta"
                  v-model="prioridad"
                />
                <label class="form-check-label" for="prioridadAlta">Alta</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="prioridadMedia"
                  value="media"
                  v-model="prioridad"
                />
                <label class="form-check-label" for="prioridadMedia"
                  >Media</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="prioridadBaja"
                  value="baja"
                  v-model="prioridad"
                />
                <label class="form-check-label" for="prioridadBaja">Baja</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span">Observaciones: </span>
              <textarea
                v-model="observaciones"
                class="form-control"
                id="descripcion"
                placeholder="Descripción Tarea (max 256 caracteres)"
                maxlength="256"
              ></textarea>
            </div>
            <div class="custom-file">
              <div class="input-group mb-3 w-50">
                <input type="file" placeholder="Selecciona un archivo" class="custom-file-input form-control" id="archivo" name="archivo" accept=".pdf, .jpg, .jpeg" @change="handleFileChange" ref="fileInput">
              </div>
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
              <button
                type="button"
                class="btn btn-secondary"
                @click="limpiarTarea"
              >
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
          <th>Sala Reunión</th>
          <th>Equipamiento</th>
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
          <td class="text-center">{{ tarea.sala }}</td>
          <td class="text">{{ tarea.equipos.join(", ") }}</td>
          <td class="text-center">{{ tarea.prioridad }}</td>
          <td class="text-center">
            <button
              type="button"
              class="m-2 btn btn-warning"
              @click="cargarTarea(tarea)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button
              type="button"
              class="m-2 btn btn-info"
              @click="mostrarInfo(tarea._id)"
            >
              <i class="bi bi-eye-fill"></i>
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
import Swal from "sweetalert2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import { format } from "date-fns";
export default {
  name: "TablaTareas",
  components: {
    NavBar,
  },
  data() {
    return {
      nombre: "",
      descripcion: "",
      fecha: "",
      sala: "",
      equipos: [],
      prioridad: "alta",
      tareas: [],
      observaciones: "",
      archivo: null,
      show: false,
    };
  },
  created() {
    this.obtenerTareas();
  },

  mounted() {
    const fechaAlta = this.$refs.fechaAlta;
    flatpickr(fechaAlta, {});
  },

  methods: {
    abrirCalendario() {
      const fechaAlta = this.$refs.fechaAlta;
      if (fechaAlta._flatpickr) {
        fechaAlta._flatpickr.open();
      }
    },
    async obtenerTareas() {
      try {
        const res = await fetch("http://localhost:5000/tareas");
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
        console.log(
          this.nombre,
          this.descripcion,
          this.fecha,
          this.sala,
          this.prioridad
        );
        // const nuevaTarea = {
        //   nombre: this.nombre,
        //   descripcion: this.descripcion,
        //   fecha: format(new Date(this.fecha), "dd-MM-yyyy"),
        //   sala: this.sala,
        //   equipos: this.equipos,
        //   prioridad: this.prioridad,
        //   observaciones: this.observaciones,
        // };
        const formData = new FormData();
          formData.append('nombre', this.nombre);
          formData.append('descripcion', this.descripcion);
          formData.append('fecha', this.fecha);
          formData.append('sala', this.sala);
          this.equipos.forEach(equipo => {
            formData.append('equipos', equipo);
          });
          formData.append('prioridad', this.prioridad);
          formData.append('observaciones', this.observaciones);
          formData.append('archivo', this.archivo);

        if (["alta", "media", "baja"].includes(this.prioridad)) {
          const res = await fetch("http://localhost:5000/tareas", {
            method: "POST",
            /*
            // headers: {
            //   "Content-type": "application/json",
            // },
            // body: JSON.stringify(nuevaTarea),*/
            body: formData
          });

          await Swal.fire({
            icon: "success",
            title: "¡Tarea guardada!",
            text: "La nueva tarea se ha guardado correctamente.",
          });

          if (!res.ok) {
            const message = `An error has occured: ${res.status}`;
            throw new Error(message);
          }

          await this.obtenerTareas();
        }
        this.limpiarTarea();
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Error al guardar la tarea",
          text: "Ha ocurrido un error al intentar guardar la tarea. Por favor, inténtalo de nuevo.",
        });
      }
    },
    async eliminarTarea(id) {
      try {
        const res = await fetch(`http://localhost:5000/tareas/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status}`;
          throw new Error(message);
        }

        await Swal.fire({
          icon: "success",
          title: "¡Tarea eliminada!",
          text: "La nueva tarea se ha eliminado correctamente.",
        });

        await this.obtenerTareas();
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Error al eliminar la tarea",
          text: "Ha ocurrido un error al intentar eliminar la tarea. Por favor, inténtalo de nuevo.",
        });
      }
    },
    cargarTarea(tarea) {
      this.nombre = tarea.nombre;
      this.descripcion = tarea.descripcion;
      this.fecha = tarea.fecha;
      this.sala = tarea.sala;
      this.prioridad = tarea.prioridad;
      this.observaciones = tarea.observaciones;
      this.tareaSeleccionada = tarea;
    },
    async modificarTarea() {
      try {
        const tarea = this.tareaSeleccionada;

        tarea.nombre = this.nombre;
        tarea.descripcion = this.descripcion;
        tarea.fecha = this.fecha;
        tarea.sala = this.sala;
        tarea.equipos = this.equipos;
        tarea.prioridad = this.prioridad;
        tarea.observaciones = this.observaciones;

        const res = await fetch(`http://localhost:5000/tareas/${tarea._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarea),
        });
        if (!res.ok) {
          throw new Error(`An error has occurred: ${res.status}`);
        }

        await this.obtenerTareas();

        this.limpiarCampos();

        await Swal.fire({
          icon: "success",
          title: "Tarea modificada",
          text: "La tarea se ha modificado correctamente",
        });

        this.tareaSeleccionada = null;
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Error al modificar la tarea",
          text: "Ha ocurrido un error al intentar modificar la tarea. Por favor, inténtalo de nuevo.",
        });
      }
    },
    mostrarInfo(id) {
      const tarea = this.tareas.find((t) => t._id === id);

      if (tarea) {
        if (tarea.observaciones && tarea.observaciones.trim() !== "") {
          this.mostrarAlerta(
            `Información de la tarea: ${tarea.observaciones}`,
            "info"
          );
        } else {
          this.mostrarAlerta("No tiene observaciones", "error");
        }
      } else {
        this.mostrarAlerta("No se encontró la tarea", "error");
      }
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
    limpiarCampos() {
      this.nombre = "";
      this.descripcion = "";
      this.fecha = "";
      this.sala = null;
      this.equipos = [];
      this.prioridad = "alta";
      this.observaciones = "";
      this.archivo = null;
      this.$refs.fileInput.value = null;

      Swal.fire({
        icon: "info",
        title: "Campos limpiados",
        text: "Los campos del formulario se han limpiado correctamente.",
      });
    },
    limpiarTarea() {
      this.nombre = "";
      this.descripcion = "";
      this.fecha = "";
      this.sala = null;
      this.equipos = [];
      this.prioridad = "alta";
      this.observaciones = "";
      this.$refs.fileInput.value = null;
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