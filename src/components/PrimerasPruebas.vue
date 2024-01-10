<template>
    <div class="hello">
        <h3>{{ mensaje }}</h3>
        <h4>El resultado de la suma es {{ resultadoSuma }}</h4>
        <h5>Listado de Items:</h5>
        <ul>
            <li v-for="item in listaItems" :key="item.id">
              {{ item.id }} -- {{ item.nombre }} -- {{ item.apellido }}
            </li>
        </ul>
        <h5>Nombre del cliente: {{ nombreCliente }}</h5>
        <button @click='incrementar'>Incrementar</button>
        <h5>Contador: {{ contador }}</h5>
    </div>
</template>

<script>
export default {
    name: "PrimerasPruebas",
    props: {
        mensaje: String,
        numero1: {
            type: Number,
            default: 0
        },
        numero2: {
            type: Number,
            default: 0
        },
        nombre: {
            type: String,
            default: "Pepe"
        },
        apellidos: {
            type: String,
            default: "Perez"
        }
    },
    computed: {
        nombreCliente(){
            return this.nombre + ' ' + this.apellidos;
        }
    },
    methods: {
        incrementar(){
            this.contador++ 
        }
    },
    data() {
        return{
            resultadoSuma: this.numero1 + this.numero2,
            listaItems: [
                { id: 1, nombre: 'Juan', apellido: 'Perez' },
                { id: 2, nombre: 'Susana', apellido: 'Garcia' },
                { id: 3, nombre: 'Luis', apellido: 'Gomez' },
                { id: 4, nombre: 'Ana', apellido: 'Gonzalez' },
                { id: 5, nombre: 'Maria', apellido: 'Lopez' },
            ],
            contador: 0
        };
    }
}
</script>

<style>

</style>