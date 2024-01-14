import { useParams } from "react-router-dom"
import FormularioCategoria from "./formulario/formulario"
function EditarCategoria(){

    const params = useParams()

    return(
        <>
            <FormularioCategoria id_categoria={params.id_categoria}/>
        </>
    )
}

export default EditarCategoria