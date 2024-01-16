import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'


function FormularioCategoria(params) {

    const navigate = useNavigate()

    const [Categoria, set_Categoria] = useState("")
    const [ativo, set_ativo] = useState(true)

    function InsertCategoria(e) {
        e.preventDefault()
        toast.success("Categoria criada com sucesso.")
    }

    function UpdateCategoria() {

    }

    return (
        <>
            <div className="col py-3">
                <button className="btn btn-secondary d-block w-25 p-1"
                    onClick={function () {
                        navigate(-1)
                    }}>
                    <span className="iconify" data-icon="icon-park-solid:back"></span>
                </button>

                <br />

                <form className="form-inline" onSubmit={params.id_categoria == "novo" ? InsertCategoria : UpdateCategoria}>

                    <div className="inputs">
                        <div>
                            <input type="text" disabled className="text-center d-inline form-control w-25" value={params.id_categoria} placeholder="ID categoria" required />

                            <input type="text" required className="text-center d-inline form-control w-75" value={Categoria} onChange={function(e){
                                set_Categoria(e.target.value)
                            }} placeholder="Categoria" />
                        </div>
                        <br />
                        <div class="form-check form-switch">
                            <label class="form-check-label" for="flexSwitchCheckChecked">Ativo</label>
                            <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={ativo} onChange={function(e){
                                set_ativo(e.target.checked)
                            }} />
                        </div>
                    </div>

                    <br />
                    <div className="salvarBtn">
                        <button type="submit" className="btn btn-secondary w-75 d-block m-auto">Salvar</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default FormularioCategoria