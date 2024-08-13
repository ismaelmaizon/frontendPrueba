import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";




export default function UpdateProductLug () {

    const {idg, refresh,
        updateproductolugar,updateStockProduct, alert
    } = useContext(MiContexto)


    const router = useNavigate()

    const [data, setData] = useState({
        Idg: idg,
        stock: '',
        Lugar: '',
        procedimiento: ''
    });
    //set lugares
    const [lugar, setLugar] = useState([])
    
    const procedimiento = [
        {name: 'agregar'}, { name: 'quitar'}
    ]
    
    const dataFrom = async (event) => {
        event.preventDefault()
        setData( {...data, [event.target.name]: event.target.value  } )
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }
    
    
    useEffect(()=>{
        let id = sessionStorage.getItem('id')
        let lugar = sessionStorage.getItem('lugar')
        let id_lugar = sessionStorage.getItem('id_lugar')
        const data = {
            Idg: id,
            stock: '',
            Lugar: id_lugar,
            procedimiento: ''
        }
        setData(data)
        setLugar(lugar)
    },[])


    return(
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px' }} >
            <Typography variant="h5" gutterBottom>
                Producto:
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                <Typography margin='auto' variant="h5"  > {data.Idg}  </Typography>
                <Typography margin='auto' variant="h6" > ubicacion: {lugar}  </Typography>
                <Grid container direction="column" rowSpacing={2} marginTop={2} >
                    <Grid item xs={6}>
                    <TextField 
                        required
                        fullWidth 
                        label='Ingrese cantidad de unidades' 
                        name='stock' 
                        type="number" 
                        onChange={dataFrom}/>
                    </Grid>
                   
                    <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        sx={{height: '10px' , marginBottom: '100px' }}
                        id="outlined-select-currency"
                        select
                        label="Agregar / Quitar"
                        name="procedimiento"
                        helperText="quiere agregar o quitar?"
                        onChange={dataFrom}
                        >
                        {procedimiento.map((option, index) => (
                            <MenuItem key={index} value={option.name}>
                            {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    </Grid>
                    <Grid item xs={6} container direction='row' width='100%' >
                        <Grid item xs={6} >
                            <Button type="submit" onClick={ async ()=>{
                                console.log(data);
                                let res = await updateproductolugar(data)
                                let resStock = await updateStockProduct(data.Idg)
                                res && resStock ? (alert('success'), refresh(), router('/') ) : alert('error')
                            }} sx={{ width: '45%', height: '50px', backgroundColor: 'Black', margin: 'auto'}} >crear</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button type="submit" onClick={()=>{
                                refresh()
                                router('/')
                            }} sx={{ width: '45%', height: '50px', backgroundColor: 'Black', margin: 'auto'}} >volver</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}