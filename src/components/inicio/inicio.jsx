
import { useContext, useEffect} from "react"
import { MiContexto } from "../context/context"

//lugares
import {Button} from '@mui/material';
//productos
import Productos from "../productos/productos";

//icons
import Ventas from "../ventas/ventas";
import Producto from "../producto/producto";
import Venta from "../venta/venta";

export default function Inicio() {
    const {
        getTipos,
        vprod, setVprod, vent, setVent,
        getProductos, getVentas, getLugares,
        productoUbi, lugares, setInfoprod
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
        console.log(vprod);
        console.log(vent);
        
    }, [])



    return (
        <div>
            {
               vprod || vent ? ( (vprod ? ( <div>
                <div>
                <Producto/>
                </div> 
                <div style={{ width: '100%', marginTop: '50px' }}><Productos/></div> 
               </div> 
               ) :  (
                <div>
                <div>
                <Venta/>
                </div>
                <div style={{ width: '100%', marginTop: '50px' }}><Ventas/></div> 
                </div>
                ) ) ) 
               : <div style={{ display: 'flex', marginTop: '45px' }} >
                   <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
                       await getProductos() 
                       await getLugares()
                       await getTipos()
                       setVprod(true)}} >Productos</Button>
                   <Button variant="contained" size="large" style={{ margin: 'auto', backgroundColor: '#ab47bc' }} onClick={ async ()=>{ 
                       await getVentas() 
                       await getLugares() 
                       await getTipos()
                       setVent(true)}} >Ventas</Button>
               </div>
            }
            </div>
    ) 
}
