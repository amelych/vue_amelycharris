<template>
    <div>
        <NavBar/>
    </div>
    <div>
        <h1 class="text-center">Página de inicio del {{ alumno_a }}</h1>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
    name: 'PaginaInicio',
    components: {
        NavBar
    },
    data() {
        return {
            alumno_a: 'Amely'
        }
    },
    mounted() {
        console.log('Componente PaginaInicio.vue cargado');
    }
}
</script>

<style>

</style>