import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MiContexto } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import SendIcon from '@mui/icons-material/Send';


import { Page, Text, View, Document, PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';
import NavBar from "../navbar/navBar";


export default function Dashboard () {

    const {
        tipos,
        venta, alert, setCart, setVenta,
        registrarProdsVenta,updateproductolugar,updateStockProduct
    } = useContext(MiContexto)

    const router = useNavigate()


    const [cliente, setCliente ] = useState({})
    const [carro, setCarro ] = useState([])
        // Create styles
    const styles = StyleSheet.create({
        page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        },
        section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        },
    });
    /*
    // Create Document Component
    const MyDocument = () => (
        <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
            <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
            <Text>Section #2</Text>
            </View>
        </Page>
        </Document>
    );*/
    
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
        let v = {
            'nombre': venta.cliente.nombre,
            'apellido': venta.cliente.apellido,
            'mail': venta.cliente.mail,
            'cel': venta.cliente.cel
        }
        setCliente(v)
        setCarro(venta.cart)
        tipos.map((ti)=>{
            venta.cart.map((prod)=>{
                if(ti.id == prod.Tipo){
                    prod.Tipo = ti.Tipo
                }
            })
        })
    },[])
    


    return(
        <div>
        <NavBar/>
        <Card sx={{ width: '70%', display: 'flex', flexDirection: 'column', margin: 'auto', marginTop: '20px', marginBottom: '20px', padding: '15px' }} border='solid 0px' boxShadow='5px 2px 15px' >
                                        <Grid container direction='column' margin='auto' >
                                                <Typography margin='auto' variant="h3" component='h3' fontFamily={'fantasy'} >
                                                    Venta
                                                </Typography>
                                                <Typography variant="h5" component='h3' fontFamily={'fantasy'} >
                                                    Cliente:
                                                </Typography>
                                            <Grid container item xs={2} direction='row' margin={2} >
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Nombre: {cliente.nombre}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Apellido: {cliente.apellido}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Telefono: {cliente.cel}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>Mail: {cliente.mail}</Typography></Grid>
                                                    <Grid item xs={6}><Typography variant="body1" component='h3'>direcion:  </Typography></Grid>
                                            </Grid>
                                            <Grid item xs={2} container direction='row' alignItems='center' >
                                                <Grid item xs={8} paddingTop={5} paddingBottom={5}>
                                                    <Typography variant="h5" component='h3' marginBottom={2}>Identificador de Venta:</Typography>
                                                    <Typography variant="h5" component='h3' marginBottom={2} fontFamily={'fantasy'} >{venta.id_venta}</Typography>
                                                </Grid>
                                                <Grid container item xs={12} direction='row' gap={2} paddingBottom={2} >
                                                    <Grid item xs={2} ><Typography variant="body1" component='h3'>Tipo</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>ID</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>Cantidad</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>Lugar</Typography></Grid>
                                                    <Grid item xs={2}><Typography variant="body1" component='h3'>SubTotal</Typography></Grid>
                                                    
                                                </Grid>
                                                <Grid container item xs={12} direction='row' gap={2}>
                                                    {
                                                    venta.cart.map((el, index)=>{ 
                                                        return <Grid item xs={12} key={index}
                                                                    container direction="row" color='grey.500' gap={2} > 
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.Tipo}</Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.idg} </Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.cantidad}</Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.lugar}</Typography></Grid>
                                                                        <Grid item xs={2}><Typography variant="body1" component='h3'>{el.subTotal}</Typography></Grid>
                                                            </Grid>
                                                    })
                                                    }
                                                </Grid>    
                                            </Grid>
                                        </Grid>
                                        <Grid container padding={2} direction='row' width='100%' marginTop={5} >
                                            <Grid item xs={4}>
                                                <Typography variant="h5" component='h3' >
                                                    Total: ${venta.total}
                                                </Typography>
                                                <Link to = '/inicio' >
                                                    <Button>cancelar</Button>
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
                                                    router('/inicio')
                                                    }} >
                                                        finalizar 
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid>
        </Card> 
        </div>
    )
}
