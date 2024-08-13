import { useContext } from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
import { Link,  } from "react-router-dom"

export default function Venta() {
    const {
        ventainf
    } = useContext(MiContexto)

    return (
        <div>
            {ventainf.length == 0 ? <div></div> : <Card sx={{ maxWidth: 500, margin: 'auto', marginTop: '25px', boxShadow: '2px 2px 10px 2px'  }}>
                    <Grid container direction='row' alignItems='center'>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                            Informacion de Venta 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Id : {ventainf.id_venta}
                            </Typography>
                            <Typography  variant="body2" color="text.secondary">
                            {ventainf.fecha}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Email: {ventainf.mail}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Total: {ventainf.total}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <CardActions  >
                        <Link to='/detalle'>
                        <Button size="small" color="info" variant="contained">Detalle</Button>
                        </Link>
                    </CardActions>
                </Card>
             } 
    </div>)}