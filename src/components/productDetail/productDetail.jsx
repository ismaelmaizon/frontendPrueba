
import { useContext, useEffect, useState} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from '@mui/material';
//productos
import { Link, useNavigate } from "react-router-dom";


export default function PorductDetail() {
    const {
        alert,
        tipos,
        producto,
        deleteProducto, imgs
    } = useContext(MiContexto)    

    const router = useNavigate()

    const [ prod, setProd ] = useState({})

    useEffect(()=>{
        console.log(imgs[0].url);
        tipos.map((ti)=>{
            console.log(ti.id);
            console.log(producto.Tipo)
            if (producto.Tipo == ti.id) {
                console.log('dentro');
                let newProd = {
                    id: producto.id,
                    IdGenerate: producto.IdGenerate, 
                    Tipo: ti.Tipo, 
                    Descripcion: ti.Descripcion,
                    Alto: producto.Alto,
                    Ancho: producto.Ancho,
                    Derc: producto.Derc,
                    Izq: producto.Izq,
                    stock: producto.stock,
                    Precio_U: producto.Precio_U
                    }  
                    setProd(newProd)
            }  
        }
        )
    }, [])

    return (
        <div>
            {producto.length == 0 ? <div></div> : <Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '25px', boxShadow: '2px 2px 10px 2px'  }}>
                <Grid container direction='row' alignItems='center'>
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                        Informacion del Producto 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Id Producto: {prod.IdGenerate}
                        </Typography>
                        <Typography  variant="body2" color="text.secondary">
                        Descripcion: {prod.Descripcion}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Precio: {prod.Precio_U}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Stock: {prod.stock}
                        </Typography>
                    </CardContent>
                </Grid>
                <CardActions>
                    <Button size="small" color="info" variant="contained">
                    ingresar imagen
                    <input style={{ width: '100px', height: '20px' }} type="file" ></input>  
                    </Button>
                    <Link to='/' >
                        <Button size="small" color="info" variant="contained" >volver</Button>
                    </Link>   
                    <Button size="small" color="info" variant="contained" onClick={ async ()=>{
                            console.log(producto.id);
                            let res = await deleteProducto(producto.id)
                            console.log(res);
                            res.ok ? (alert('success'), router('/') ) : alert('error')
                            
                        }} >eliminar</Button>
                </CardActions>
                <CardMedia
                    sx={{ height: 500 }}
                    image={`http://localhost:8080/static/${imgs[0].url}`}
                    title="green iguana"
                />
                </Card>
             }
        </div>
    )} 