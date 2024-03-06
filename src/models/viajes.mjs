import mongoose from "mongoose";
const { Schema } = mongoose;

const viajeSchema = new Schema ({
    lugar: String,
    descripcion: String,
    fecha: String,
    clase: String,
    aeropuerto: [String],
    dieta: String,
    observaciones: String
});

export default mongoose.model('viaje', viajeSchema);