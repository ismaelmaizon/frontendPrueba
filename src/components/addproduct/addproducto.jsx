import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";




export default function AddProducto () {

    const {tipos, createProducto, alert} = useContext(MiContexto)

    const router = useNavigate()

    const [data, setData] = useState({
        Tipo: '',
        Alto: '',
        Ancho: '',
        Lado: '',
        Precio_U: 0,

    });

    const lado = [
        {
          name: 'Derc'
        },
        {
          name: 'Izq'
        }
    ];

    const dataFrom = async (event) => {
        event.preventDefault()
        setData( {...data, [event.target.name]: event.target.value  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }


    return(
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }}  >
            <Typography variant="h4" gutterBottom sx={{ width:'300px', margin: 'auto' }} >
                Nuevo producto
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
            <Grid container direction='row' marginBottom="40px" marginTop="10px">
                <Grid item xs={10} container direction='row' spacing={3} sx={{ margin:'auto' }} >
                        <Grid item xs={6}>
                        <TextField fullWidth select label='Tipo' name='Tipo' type="text" onChange={dataFrom}>
                        {tipos.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                {option.Tipo}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='Alto' name='Alto' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField fullWidth label='Ancho' name='Ancho' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                </Grid>
                <Grid item xs={10} container direction="row" spacing={3} sx={{ margin:'auto' }}>
                        <Grid item xs={6}>
                        <TextField fullWidth label='Precio_U' name='Precio_U' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                        <TextField
                            fullWidth
                            sx={{height: '0px'}}
                            id="outlined-select-currency"
                            select
                            label="Lado"
                            name="Lado"
                            helperText="Please select your lado"
                            onChange={dataFrom}
                            >
                            {lado.map((option, index) => (
                                <MenuItem key={index} value={option.name}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }} onClick={ async ()=>{
                console.log(data);
                let respon = await createProducto(data)
                console.log(respon.status);
                if (respon.status == 200) {
                    await alert('success')
                    router('/')
                }
            }}>crear</Button>
            </Box>
        </Box>
    )
}


/*
<Grid container direction="column" marginBottom="20px" marginTop="20px">
                    <Grid item xs={8}  direction="row" spacing={2}>
                        <Grid item xs={8}>
                        <TextField fullWidth select label='Tipo' name='Tipo' type="text" onChange={dataFrom}>
                        {tipos.map((option, index) => (
                                <MenuItem key={index} value={option.id}>
                                {option.Tipo}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField fullWidth label='Alto' name='Alto' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField fullWidth label='Ancho' name='Ancho' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}  direction="row" spacing={5}>
                        <Grid item xs={8}>
                        <TextField fullWidth label='Precio_U' name='Precio_U' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            fullWidth
                            sx={{height: '0px'}}
                            id="outlined-select-currency"
                            select
                            label="Lado"
                            name="Lado"
                            helperText="Please select your lado"
                            onChange={dataFrom}
                            >
                            {lado.map((option, index) => (
                                <MenuItem key={index} value={option.name}>
                                {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                    </Grid>
                </Grid>

*/ 