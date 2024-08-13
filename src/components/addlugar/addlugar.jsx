import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MiContexto } from "../context/context";
import { useNavigate } from "react-router-dom";




export default function AddLugar () {

    const {createLugar, getLugares ,alert} = useContext(MiContexto)

    const router = useNavigate()

    const [data, setData] = useState({
        fullname: ''
    });

    async function dataFrom(event) {
        event.preventDefault();
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
    }


    return(
        <Box sx={{ width: '60%', margin: 'auto', marginTop: '120px', padding: '15px', boxShadow: '2px 2px 10px 2px' }} >
            <Typography variant="h4" gutterBottom sx={{ width:'200px', margin: 'auto' }}>
                Nuevo Lugar
            </Typography>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} >
                    <Grid container direction="column" rowSpacing={1} spacing={5} marginBottom="20px" marginTop="20px" > 
                        <Grid item xs={8}>
                        <TextField fullWidth label='Ingrese nuevo lugar' name='fullname' type="text" onChange={dataFrom}></TextField>
                        </Grid>
                    </Grid>
            <Button type="submit" variant="contained" size="small" sx={{ width:'200px', margin: 'auto' }}  onClick={ async ()=>{
                console.log(data);
                let respon = await createLugar(data)
                console.log(respon.status);
                if (respon.status == 200) {
                    await getLugares()
                    await alert('success')
                    router('/')
                }
            }} >crear</Button>
            </Box>
        </Box>
    )
}