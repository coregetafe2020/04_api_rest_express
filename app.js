const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

let proveedores = [
    {_id: 1, nombre: 'Gas Natural', cif: 'A123456', domicilio: 'Bilbao'},
    {_id: 2, nombre: 'Iberdrola', cif: 'A654321', domicilio: 'Madrid'},
    {_id: 3, nombre: 'Planeta', cif: 'A345126', domicilio: 'Barcelona'}
]

// app.get('/', (req, res) => {
//     res.status(200).json(proveedores);
// })



// get con queries-string en la url

app.get('/consulta', (req, res) => {
    console.log(req.query);
    let nombre = req.query.nombre;
    let cif = req.query.cif;
    // Código de consulta con los valores de nombre y cif
    res.status(200).json({mensaje: 'Test con queries-string'});
})

// get con parámetros en la url

app.get('/:p_id', (req, res) => {
    let proveedor = proveedores.find((prov) => {
        return prov._id == req.params.p_id;
    })
    if (proveedor === undefined) {
        res.status(200).json({mensaje: 'No se encontró el proveedor'});
    }
    res.status(200).json(proveedor);
}) 

// Post para crear registros

app.post('/', (req, res) => {
    let proveedor = req.body;
    proveedor._id = proveedores.length + 1;
    proveedores.push(proveedor);
    res.status(200).json({
        mensaje: 'El proveedor se ha creado correctamente',
        proveedores: proveedores
    });
})

// Put para actualizar registros

app.put('/:_id', (req, res) => {
    let posicion = proveedores.findIndex(proveedor => {
        return proveedor._id == req.params._id;
    })
    if (req.body.nombre !== undefined) {
        proveedores[posicion].nombre = req.body.nombre;
    }
    if (req.body.domicilio !== undefined) {
        proveedores[posicion].domicilio = req.body.domicilio;
    }
    if (req.body.cif !== undefined) {
        proveedores[posicion].cif = req.body.cif;
    }
    res.status(200).json({
        mensaje: 'El proveedor se actualizó correctamente',
        proveedores: proveedores
    })
})



app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
})