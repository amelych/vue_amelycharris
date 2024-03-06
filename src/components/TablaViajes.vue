<template>
  <NavBar />
  <div id="tabla-viajes" class="container">
    <br />
    <div class="row">
      <h3 class="text-center font-weight-bold">Gestión Viajes</h3>
    </div>
    <hr />
    <div class="container-fluid">
      <div class="row" id="map_section">
        <div class="col-12 col-m-6 col-lg-8 mx-auto">
          <form class="form-inline">
            <div class="input-group mb-3">
              <span class="input-group-text custom-span" id="basic-addon1"
                >Lugar:</span
              >
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="lugar"
                id="lugar"
                name="lugar"
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
            <div class="input-group mb-3 w-50">
              <label class="input-group-text custom-span" for="salaSelect"
                >Clase:
              </label>
              <select class="form-select" v-model="clase" id="salaSelect">
                <option value="Económica">Económica</option>
                <option value="Premium">Premium</option>
                <option value="Business">Business</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
            <div class="input-group mb-3">
              <span
                class="input-group-text custom-span"
                style="margin-right: 20px"
                >Aeropuerto</span
              >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="santiagoCompostela"
                  v-model="aeropuerto"
                  value="Santiago Compostela"
                />
                <label class="form-check-label" for="santiagoCompostela"
                  >Santiago Compostela</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="oporto"
                  v-model="aeropuerto"
                  value="Oporto"
                />
                <label class="form-check-label" for="oporto">Oporto</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="madrid"
                  v-model="aeropuerto"
                  value="Pizarra Digital"
                />
                <label class="form-check-label" for="madrid">Madrid</label>
              </div>
            </div>
            <div class="input-group-text mb-3">
              <span
                class="input-group-text custom-span"
                style="margin-right: 10px"
                >Dieta:</span
              >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="estandar"
                  value="estandar"
                  v-model="dieta"
                />
                <label class="form-check-label" for="estandar">Estándar</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="vegetariana"
                  value="vegetariana"
                  v-model="dieta"
                />
                <label class="form-check-label" for="vegetariana"
                  >Vegetariana</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="vegana"
                  value="vegana"
                  v-model="dieta"
                />
                <label class="form-check-label" for="vegana">Vegana</label>
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text custom-span">Observaciones: </span>
              <textarea
                v-model="observaciones"
                class="form-control"
                id="descripcion"
                placeholder="Observaciones sobre sus necesidades (max 256 caracteres)"
                maxlength="256"
              ></textarea>
            </div>
            <div class="mb-3 text-center">
              <button
                type="button"
                class="btn btn-primary mx-2"
                @click="guardarViaje"
              >
                Guardar
              </button>
              <button
                type="button"
                class="btn btn-primary mx-2"
                @click="modificarViaje"
              >
                Modificar
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="limpiarViaje"
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
        <h2 class="text-center">Listado de Viajes</h2>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-5">
      <thead>
        <tr class="table-info text-center">
          <th>ID</th>
          <th>Lugar</th>
          <th>Descripción</th>
          <th>Fecha Inicio</th>
          <th>Clase</th>
          <th>Aeropuerto</th>
          <th>Dietas</th>
          <th>Gestión</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="viaje in viajes" :key="viaje._id">
          <td class="text-center">{{ viaje._id }}</td>
          <td>{{ viaje.lugar }}</td>
          <td>{{ viaje.descripcion }}</td>
          <td class="text-center">{{ viaje.fecha }}</td>
          <td class="text-center">{{ viaje.clase }}</td>
          <td class="text">{{ viaje.aeropuerto.join(", ") }}</td>
          <td class="text-center">{{ viaje.dieta }}</td>
          <td class="text-center">
            <button
              type="button"
              class="m-2 btn btn-warning"
              @click="cargarViaje(viaje)"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>
            <!-- <button
              type="button"
              class="m-2 btn btn-info"
              @click="mostrarInfo(tarea._id)"
            >
              <i class="bi bi-eye-fill"></i>
            </button> -->
            <button
              type="button"
              class="btn btn-danger"
              @click="eliminarViaje(viaje._id)"
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
import { format } from "date-fns";

export default {
  name: "TablaViajes",
  components: {
    NavBar,
  },
  data() {
    return {
      lugar: "",
      descripcion: "",
      fecha: "",
      clase: "",
      aeropuerto: [],
      dieta: "estandar",
      viajes: [],
      observaciones: "",
    };
  },
  created() {
    this.obtenerViajes();
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
    async obtenerViajes() {
      try {
        const res = await fetch("http://localhost:5000/viajes");
        if (!res.ok) {
          const message = `An error has occured: ${res.status}`;
          throw new Error(message);
        }
        this.viajes = await res.json();
      } catch (error) {
        console.log(error);
      }
    },
    async guardarViaje() {
      try {
        const nuevoViaje = {
          lugar: this.lugar,
          descripcion: this.descripcion,
          fecha: format(new Date(this.fecha), "dd-MM-yyyy"),
          clase: this.clase,
          aeropuerto: this.aeropuerto,
          dieta: this.dieta,
          observaciones: this.observaciones,
        };
        // const formData = new FormData();
        //   formData.append('nombre', this.nombre);
        //   formData.append('descripcion', this.descripcion);
        //   formData.append('fecha', this.fecha);
        //   formData.append('sala', this.sala);
        //   this.equipos.forEach(equipo => {
        //     formData.append('equipos', equipo);
        //   });
        //   formData.append('prioridad', this.prioridad);
        //   formData.append('observaciones', this.observaciones);
        //   formData.append('archivo', this.archivo);
        //   console.log(formData);

        if (["estandar", "vegetariana", "vegana"].includes(this.dieta)) {
          const res = await fetch("http://localhost:5000/viajes", {
            method: "POST",
             headers: {
               "Content-type": "application/json",
             },
             body: JSON.stringify(nuevoViaje),
            // body: formData
          });

          await Swal.fire({
            icon: "success",
            title: "Viaje guardada!",
            text: "El nuevo viaje se ha guardado correctamente.",
          });

          if (!res.ok) {
            const message = `An error has occured: ${res.status}`;
            throw new Error(message);
          }

          await this.obtenerViajes();
        }
        this.limpiarViaje();
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Error al guardar el viaje",
          text: "Ha ocurrido un error al intentar guardar el viaje. Por favor, inténtalo de nuevo.",
        });
      }
    },
    async eliminarViaje(id) {
      try {
        const res = await fetch(`http://localhost:5000/viaje/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const message = `An error has occured: ${res.status}`;
          throw new Error(message);
        }

        await Swal.fire({
          icon: "success",
          title: "¡Viaje eliminado!",
          text: "El viaje se ha eliminado correctamente.",
        });

        await this.obtenerViajes();
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Error al eliminar el viaje",
          text: "Ha ocurrido un error al intentar eliminar el viaje. Por favor, inténtalo de nuevo.",
        });
      }
    },
    cargarViaje(viaje) {
      this.lugar = viaje.lugar;
      this.descripcion = viaje.descripcion;
      this.fecha = viaje.fecha;
      this.clase = viaje.clase;
      this.aeropuerto = viaje.aeropuerto;
      this.dieta = viaje.dieta;
      this.observaciones = viaje.observaciones;
      this.viajeSeleccionado = viaje;
    },
    async modificarViaje() {
      try {
        const viaje = this.viajeSeleccionado;

        viaje.lugar = this.nombre;
        viaje.descripcion = this.descripcion;
        viaje.fecha = this.fecha;
        viaje.clase = this.clase;
        viaje.aeropuerto = this.aeropuerto;
        viaje.dieta = this.dieta;
        viaje.observaciones = this.observaciones;

        const res = await fetch(`http://localhost:5000/viajes/${viaje._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(viaje),
        });
        if (!res.ok) {
          throw new Error(`An error has occurred: ${res.status}`);
        }

        await this.obtenerViajes();

        this.limpiarCampos();

        await Swal.fire({
          icon: "success",
          title: "Viaje modificado",
          text: "El viaje se ha modificado correctamente",
        });

        this.viajeSeleccionado = null;
      } catch (error) {
        console.error(error);
        await Swal.fire({
          icon: "error",
          title: "Error al modificar el viaje",
          text: "Ha ocurrido un error al intentar modificar el viaje. Por favor, inténtalo de nuevo.",
        });
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
      this.lugar = "";
      this.descripcion = "";
      this.fecha = "";
      this.clase = null;
      this.aeropuerto = [];
      this.dieta = "alta";
      this.observaciones = "";

      Swal.fire({
        icon: "info",
        title: "Campos limpiados",
        text: "Los campos del formulario se han limpiado correctamente.",
      });
    },
    limpiarViaje() {
      this.lugar = "";
      this.descripcion = "";
      this.fecha = "";
      this.clase = null;
      this.aeropuerto = [];
      this.dieta = "alta";
      this.observaciones = "";
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
  width: 150px;
  display: inline-block;
  text-align: left;
}
</style>