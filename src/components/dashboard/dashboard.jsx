import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SendIcon from '@mui/icons-material/Send';


import { Page, Text, View, Document, StyleSheet, Image, PDFDownloadLink } from '@react-pdf/renderer';


export default function Dashboard () {

    const {venta, alert, setCart, setVenta,
        registrarProdsVenta,updateproductolugar,updateStockProduct
    } = useContext(MiContexto)

    const router = useNavigate()


    const [cliente, setCliente ] = useState({})
    const [carro, setCarro ] = useState([])
    
    // Create Document Component
    function MyDocument () {
        return(
        <Document>
        <Page size="A4"  style={{width: 250, height: 475, padding: 10}}>
            <View style={{flex: 1, rowGap: 10, backgroundColor: 'blue'}}>
                <View style={{height: 60}}>
                    <Text> DecoBodereau </Text>
                </View>
                <View style={{flex: 1, marginInline: 10, backgroundColor: 'grey'}}   >
                    <Text style={{height: 5, width: '100%', backgroundColor: 'red'}}> Cliente </Text>
                    <View style={{ 
                        backgroundColor: 'white', 
                        margin: 5, height: 2,
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                        color: '#000', fontSize: '5px' }}  >
                            
                            <Text style={{height: 40, width: 40, backgroundColor: 'red'}}> Nombre: </Text>
                            <Text style={{height: 40, width: 40, backgroundColor: 'red'}}> Apellido: </Text>
                    </View>
                    <View style={{
                        backgroundColor: 'white', 
                        margin: 5, height: 2,
                        display: 'flex', flexDirection: "row", alignItems: "flex-start", justifyContent: "space-around",
                        color: '#000', fontSize: '5px' }}  >
                            
                            <Text style={{height: 40, width: 40, backgroundColor: 'red'}}> {cliente.nombre} </Text>
                            <Text style={{height: 40, width: 40, backgroundColor: 'red'}}> {cliente.apellido} </Text>
                    </View>
                    <Text style={{height: 200, width: '100%', backgroundColor: 'red'}}> Cliente </Text>
                    <View style={{flex: 1, marginInline: 10, 
                        backgroundColor: 'white', margin: 5, 
                        height: 80, color: '#000' }}  >
                        <Text> Cliente </Text>
                        <Text> Nombre: </Text>
                        <Text> {cliente.nombre} </Text>
                
                        <Text > Apellido: </Text>
                        <Text> {cliente.apellido} </Text>
                    </View> 
                </View>
                
                <View style={{
                        position: "absolute",
                        width: "100%",
                        bottom: 0,
                        height: 64,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        }}>
                    <Text style={{height: 40, width: 40, backgroundColor: 'red'}} >a</Text>
                    <Text style={{height: 40, width: 40, backgroundColor: 'red'}} >a</Text>
                    <Text style={{height: 40, width: 40, backgroundColor: 'red'}} >a</Text>
                    <Text style={{height: 40, width: 40, backgroundColor: 'red'}} >a</Text>
                </View>
            </View>
        </Page>
        </Document>
    )}

    useEffect(()=>{
        console.log(venta);
        console.log(venta.cliente);
        let v = {
            'nombre': venta.cliente.nombre,
            'apellido': venta.cliente.apellido,
            'mail': venta.cliente.mail,
            'cel': venta.cliente.cel
        }
        setCliente(v)
        setCarro(venta.cart)
    },[])
    


    return(
        <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '120px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                                        <Grid margin='auto' >
                                            <Typography fontSize={30} >Dashboard</Typography>
                                        </Grid>
                                        <Grid>
                                        <Typography >
                                            Nombre: {cliente.nombre}
                                        </Typography>  
                                        <Typography>
                                            Apellido: {cliente.apellido}
                                        </Typography>  
                                        <Typography>
                                            Mail: {cliente.mail}
                                        </Typography>  
                                        
                                        </Grid>
                                        <Grid container direction='column' alignItems='center' >
                                            <Grid item xs={4} paddingTop={5}>
                                                <Typography fontSize={20} marginBottom={2} fontFamily={"cursive"} >{venta.id_venta} </Typography>
                                            </Grid>
                                            <Grid item xs={6} container direction='row' padding={2} gap={8}
                                            border='solid 0px' boxShadow='1px' borderRadius={3}>
                                                {
                                                venta.cart.map((el, index)=>{ 
                                                    return <Grid item xs={2} key={index}
                                                                container direction="column" color='grey.500'>
                                                                
                                                                    <Typography paddingTop={3} alignSelf='flex-start'>
                                                                        Producto: {el.idg} 
                                                                    </Typography>  
                                                                    <Typography >
                                                                        {el.Tipo} 
                                                                    </Typography> 
                                                                    <Typography >
                                                                        Cantidad: {el.cantidad} 
                                                                    </Typography>
                                                                    <Typography >
                                                                        {el.lugar} 
                                                                    </Typography> 
                                                                    <Typography >
                                                                        SubTotal: {el.subTotal}
                                                                    </Typography>
                                                        </Grid>
                                                })
                                                }
                                            </Grid>    
                                        </Grid>
                                        <Grid container padding={2} direction='row' width='100%' >
                                            <Grid item xs={2}>
                                                <Typography fontSize={20} >
                                                    Total: ${venta.total}
                                                </Typography>
                                                <Link to = '/' >
                                                    <Button>volver</Button>
                                                </Link>
                                            </Grid>
                                            <Box sx={{ flexGrow: 5 }} />
                                            <Grid item xs={3} container alignSelf='flex-end' gap={4}>
                                                <Grid item xs={4}>
                                                    <PDFDownloadLink document={<MyDocument/>} fileName="mypdf.pdf" >
                                                        {
                                                            ({loading, url, error, blob}) => loading ? <Button>
                                                            cargando...</Button> : <Button startIcon={<LocalPrintshopIcon/>} onClick={ async ()=>{
                                                            }} >
                                                                Imprimir 
                                                            </Button>                                                         
                                                        }
                                                    </PDFDownloadLink>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Button startIcon={<SendIcon/>} onClick={ async ()=>{
                                                    carro.map( async (el)=>{
                                                        let infoProd = {
                                                            id_venta: venta.id_venta,
                                                            id_producto: el.id, 
                                                            IdGenerate: el.idg, 
                                                            Tipo: el.Tipo, 
                                                            cantidad: el.cantidad, 
                                                            subtotal: el.subTotal
                                                        }
                                                        
                                                        let regProdVenta = await registrarProdsVenta(infoProd)
                                                        console.log(regProdVenta.status);
                                                        if (regProdVenta.status == 200) {
                                                            let update = {
                                                                Idg: el.idg, 
                                                                stock: el.cantidad, 
                                                                Lugar: el.id_lugar, 
                                                                procedimiento: 'quitar'
                                                            }
                                                            let upprodlug = await updateproductolugar(update)
                                                            console.log(upprodlug);
                                                            if (upprodlug.status == 200) {
                                                                let upprod = await updateStockProduct(update.Idg)
                                                                console.log(upprod);
                                                            }
                                                        }else{
                                                            alert('error')
                                                        }
                                                    })
                                                    alert('success')
                                                    setCart([])
                                                    setVenta({})
                                                    router('/')
                                                    }} >
                                                        finalizar 
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid>
                                        </Box> 
    )
}
