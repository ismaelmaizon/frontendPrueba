
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button, Card, CardContent, Grid} from '@mui/material';
import { Link } from "react-router-dom";
//alert
import Swal from 'sweetalert2'
//icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Ubiproducto() {
    const {
        producto,
        productoUbi, lugares, infoprod, setInfoprod, ubi,
        setIdg, alert,
        cart, setCart,
        refresh
    } = useContext(MiContexto)


    useEffect(()=>{
        let info = []
        lugares.map((lug)=>{
            productoUbi.map((pr)=>{
                if (lug.id == pr.id_lugar) {
                    let resul = { fullname : lug.fullname, stock: pr.stock, id_lugar: lug.id }
                    info.push(resul)
                }
            })
        })
        setInfoprod(info)

    }, [productoUbi])



    return (
        <div>
            {
             !ubi ? <div></div> : <div style={{ display: 'flex', margin: 'auto', padding: '15px' }} >{
                infoprod.map((prod, index)=>{
                            console.log(prod);
                            return ( <Card key={index} sx={{ maxWidth: 500, margin: 'auto', boxShadow: '1px 1px 5px 1px'  }}>
                                        <Grid container direction="row" justifyContent="center">
                                                        <CardContent sx={ { display: 'flex', flexDirection: 'column', alignItems: 'flex-end'  } } >
                                                            <p style={{ margin: '1px', fontSize: 15, fontWeight: 'bold' }}>
                                                            {prod.fullname}
                                                            </p>
                                                            <p style={{ fontSize: 14 }}>
                                                            Stock: {prod.stock}
                                                            </p>
                                                        </CardContent>
                                                        <Grid container direction="row" justifyContent='space-evenly' >
                                                            <Grid item xs={2} marginBottom={1}>
                                                                <Link to='/updateproductLug' >
                                                                    <Button size="small" sx={{width: '50px', height: '25px', padding: '20px' }} color="secondary" variant="contained"  onClick={()=>{
                                                                        setIdg(producto.IdGenerate)
                                                                        sessionStorage.setItem('id', producto.IdGenerate)
                                                                        sessionStorage.setItem('lugar', prod.fullname)
                                                                        sessionStorage.setItem('id_lugar', prod.id_lugar)
                                                                    }} ><AddCircleIcon/></Button>
                                                                </Link>
                                                            </Grid>
                                                            <Grid item xs={2} marginBottom={1}>
                                                                <Button size="small" sx={{width: '50px', height: '25px', padding: '20px' }} color="error" variant="contained" ><DeleteIcon/></Button>
                                                            </Grid>
                                                            <Grid item xs={2} marginBottom={1}>
                                                                <Button size="small" sx={{width: '50px', height: '25px', padding: '20px' }} color="success" variant="contained" onClick={async ()=>{
                                                                    let value = false
                                                                    cart.map((el)=>{  
                                                                        console.log(el.id);  
                                                                        console.log(producto.IdGenerate);
                                                                        if (el.id == producto.IdGenerate) {
                                                                            console.log('if');
                                                                            value = true
                                                                        }
                                                                    })
                                                                    console.log(value);
                                                                    !value ? Swal.fire({
                                                                        title: "Ingrese cantidad",
                                                                        input: "text",
                                                                        inputAttributes: {
                                                                        autocapitalize: "off"
                                                                        },
                                                                        showCancelButton: true,
                                                                        confirmButtonText: "aceptar",
                                                                        showLoaderOnConfirm: true,
                                                                    }).then( async (result) => {
                                                                        if (result.isConfirmed && result.value < prod.stock ) {
                                                                            alert('success')
                                                                            const carrito = []
                                                                            cart.map((el)=>{
                                                                                carrito.push(el)
                                                                            })
                                                                            const info = {
                                                                                id : producto.IdGenerate,
                                                                                lugar : prod.fullname,
                                                                                id_lugar : prod.id_lugar,
                                                                                cantidad : result.value
                                                                            }
                                                                            carrito.push(info)                    
                                                                            setCart(carrito) 
                                                                            refresh()  
                                                                            
                                                                        }else{ alert('error') }
                                                                    }) :  
                                                                    Swal.fire({
                                                                        icon: "error",
                                                                        title: "Producto ya existe en el carrito",
                                                                        text: "si quiere cambiar de lugar porfavor primero elimine el producto del carrito y vuelvalo a cargar",
                                                                    });
                                                                    
                                                                    
                                                                }} ><ShoppingCartIcon/></Button>
                                                            </Grid>
                                                        </Grid>
                                        </Grid>
                                    </Card>)
                        })
                } </div>   
            }</div>
)}