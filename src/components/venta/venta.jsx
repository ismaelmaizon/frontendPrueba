import { useContext, useEffect } from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardActions, Grid, Typography} from '@mui/material';
import { Link,  } from "react-router-dom"

export default function Venta() {
    const {
        ventainf, ventainfProds
    } = useContext(MiContexto)




    useEffect(()=>{
        console.log(ventainf);
    } ,[])

    return (
        <div>
            {ventainf.length == 0 ? <div></div> : <Card sx={{ width: '1000px', margin: 'auto', marginTop: '25px', boxShadow: '2px 2px 10px 2px'  }}>
                    <Grid container direction='column' margin={3}>
                        <Typography margin='auto' variant="h4" width={450} component="div">
                        Informacion de Venta 
                        </Typography>
                        <Typography  variant="h6" >
                            Fecha: {ventainf.fecha}
                        </Typography>
                        <Grid container item xs={10} direction='row' margin={2} >
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Nombre: {ventainf.nombre}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Apellido: {ventainf.apellido}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Telefono: {ventainf.cel}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Email: {ventainf.mail}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Direcion:  </Typography></Grid>
                                <Grid item xs={6}><Typography variant="body1" component='h3'>Id: {ventainf.id_venta} </Typography></Grid>
                                <Grid item xs={6}><Typography variant="h6" component='h3'>Total: {ventainf.total} </Typography></Grid>
                        </Grid>
                        <Grid container item xs={12} direction='row' gap={2} paddingBottom={2} >
                                <Grid item xs={2} ><Typography variant="body1" component='h3'>Tipo</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>ID</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>Cantidad</Typography></Grid>
                                <Grid item xs={2}><Typography variant="body1" component='h3'>SubTotal</Typography></Grid>
                                
                            </Grid>
                            <Grid container item xs={12} direction='row' gap={2}>
                                {
                                ventainfProds.map((el, index)=>{ 
                                    return <Grid item xs={12} key={index}
                                                container direction="row" color='grey.500' gap={2} > 
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.Tipo}</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.IdGenerate} </Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>{el.cantidad}</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>${el.subtotal}</Typography></Grid>
                                        </Grid>
                                })
                                }
                        </Grid>     
                    </Grid>
                    <CardActions  >
                        <Link to='/updateVenta'>
                            <Button size="small" color="info" variant="contained">modificar</Button>
                        </Link>
                        <Link to='/'>
                            <Button size="small" color="info" variant="contained">imprimir</Button>
                        </Link>
                    </CardActions>
                </Card>
             } 
    </div>)}