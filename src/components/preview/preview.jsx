import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';



export default function Preview () {

    const {productos ,cart, setCart, venta, setVenta,
        registrarVenta
    } = useContext(MiContexto)

    const router = useNavigate()

    
    const [total, setTotal] = useState(0)
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        mail: '',
        cel: ''
    });
    const dataFrom = async (event) => {
        event.preventDefault()
        setCliente( {...cliente, [event.target.name]: event.target.value  } )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
    }



    const deletePordCart = (id) => {
        const newCart = cart.filter(el => el.id !== id)
        let full = 0
        newCart.map((el)=>{
            full += el.subTotal
        })
        setTotal(full)
        setCart(newCart)
    }
    

    useEffect(()=>{        
        const data = {
            'cliente': cliente,
            'cart': cart,
            'total': total,
            'id_venta': ''
        }
        setVenta(data)
        
        let newCart = []
        let full = 0
        productos.map((prod)=>{
            cart.map((prodc)=>{
                if (prod.IdGenerate == prodc.id || prod.IdGenerate == prodc.idg) {
                    let newProd = {
                        id: prod.id,
                        idg: prod.IdGenerate,
                        Tipo: prod.Tipo,
                        lugar: prodc.lugar,
                        id_lugar: prodc.id_lugar,
                        cantidad: prodc.cantidad,
                        subTotal: prod.Precio_U * prodc.cantidad
                    }
                    full += newProd.subTotal
                    console.log(newProd);
                    newCart.push(newProd)
                }
            })  
        })
        setCart(newCart)
        setTotal(full)
        
    }, [])

    return(
        <div>
            {
                cart.length == 0 ? <Typography> El carrito se encuentra vacio </Typography> : 
            
                venta.id_venta == '' ? <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                                        <Grid margin='auto' >
                                            <Typography fontSize={30} >Vista Previa</Typography>
                                        </Grid>
                                        <Grid container direction='row' gap={5} >
                                            <Grid item xs={6} container direction='column' padding={2} >
                                                {
                                                cart.map((el, index)=>{ 
                                                    return <Grid item xs={2} key={index}
                                                                container direction="row" color='grey.300' gap={5} 
                                                                border='solid 0px' boxShadow='5px 0px 12px 2px' borderRadius={3} margin={1}
                                                                padding={2}>
                                                                
                                                                <Grid item xs={2} color='black' >
                                                                    <Typography paddingBottom={3} alignSelf='flex-start'>
                                                                        Producto: {el.idg} 
                                                                    </Typography>  
                                                                    <Typography >
                                                                        {el.lugar} 
                                                                    </Typography> 
                                                                    <Typography >
                                                                        Cant: {el.cantidad} 
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={2} color='black' alignSelf='flex-end' >
                                                                    <Typography >
                                                                        SubTotal: {el.subTotal}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={2} color='black' alignSelf='flex-end' >
                                                                    <Button startIcon={<DeleteIcon/>} onClick={()=>{deletePordCart(el.id)}} >
                                                                        Delete 
                                                                    </Button>
                                                                </Grid>
                                                        </Grid>
                                                })
                                                }
                                            </Grid>
                                            <Grid item xs={4} container direction="row" alignContent='flex-start'>
                                                    <Typography fontSize={15} marginBottom={2} >Datos Cliente</Typography>
                                                    <Grid container direction="column" spacing={2} onSubmit={handleSubmit} >
                                                        <Grid item xs={2}>
                                                        <TextField fullWidth label='nombre' name='nombre' type="text" onChange={dataFrom}></TextField>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                        <TextField fullWidth label='apellido' name='apellido' type="text" onChange={dataFrom}></TextField>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                        <TextField fullWidth label='mail' name='mail' type="email" onChange={dataFrom}></TextField>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                        <TextField fullWidth label='cel' name='cel' type="number" onChange={dataFrom}></TextField>
                                                        </Grid>
                                                    </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid container padding={2} direction='row' width='100%' >
                                            <Grid item xs={2}>
                                                <Typography fontSize={20} >
                                                    Total: ${total}
                                                </Typography>
                                                <Link to = '/' >
                                                    <Button>volver</Button>
                                                </Link>
                                            </Grid>
                                            <Box sx={{ flexGrow: 5 }} />
                                            <Grid item xs={2}  alignSelf='flex-end'>
                                                <Button startIcon={<SendIcon/>} onClick={ async ()=>{
                                                    const info = {
                                                        'cliente': cliente,
                                                        'cart': cart,
                                                        'total': total,
                                                        'id_venta': ''
                                                    }
                                                    const respons = await registrarVenta(info)
                                                    console.log(respons);
                                                    if (respons.status == 200) {
                                                        info.id_venta = respons.id
                                                        setVenta(info)
                                                        router('/dashboard')
                                                    }
                                                }} >
                                                    Vender 
                                                </Button>
                                            </Grid>
                                            
                                        </Grid>
                                        </Box> 
        : 
        <Box> ID:{venta.id_venta}  </Box>
                
                
            }
        </div>
    ) 
} 
