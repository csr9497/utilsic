import mongoose, { mongo } from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/clients', { useNewUrlParser: true })

mongoose.set( 'setFindAndModify' , false )

const clientsSchema = new mongoose.Schema({
    name: String,
    last_name: String,
    job: String,
    emails: Array,
    edad: Number,
    tipo: String,
    orders: Array
})
const clients = mongoose.model('clients', clientsSchema)

const productsSchema = new mongoose.Schema({
    name: String,
    model: String,
    brand: String,
    price: Number,
    stock: Number,
    delay: String,
})

const products = mongoose.model('products', productsSchema)
export { clients , products }