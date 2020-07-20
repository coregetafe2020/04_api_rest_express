const express = require('express');

const app = express();

let proveedores = [
    {_id: 1, nombre: 'Gas Natural', cif: 'A123456', domicilio: 'Bilbao'},
    {_id: 2, nombre: 'Iberdrola', cif: 'A654321', domicilio: 'Madrid'},
    {_id: 3, nombre: 'Planeta', cif: 'A345126', domicilio: 'Barcelona'}
]

app.get('/', (req, res) => {
    res.status(200).json(proveedores);
})

app.get('/:p_id', (req, res) => {
    let proveedor = proveedores.find((prov) => {
        return prov._id == req.params.p_id;
    })
    if (proveedor === undefined) {
        res.status(200).json({mensaje: 'No se encontró el proveedor'});
    }
    res.status(200).json(proveedor);
}) 

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
})