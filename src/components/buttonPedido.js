import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

function BtnPedidos() {

    const navigate = useNavigate()

    return (
        <>
            <div className='position-fixed bottom-0 end-0 p-3'>
                <div className='bg-secondary d-inline-block rounded px-2 py-1' onClick={function(){

                    if(sessionStorage.getItem("id_mesa") != "" && sessionStorage.getItem("id_mesa") != " " && sessionStorage.getItem("id_mesa") != null && sessionStorage.getItem("id_mesa") != undefined){

                        navigate(`/meus/pedidos/${sessionStorage.getItem("id_mesa")}`)
                    }
                    else{

                        toast.error("Nenhuma mesa vinculada.")
                        navigate("/ler/novamente/qr/code")
                    }
                }}>
                    <i className="bi bi-stickies text-white fs-5"></i>
                </div>
            </div>
        </>
    )
}

export default BtnPedidos