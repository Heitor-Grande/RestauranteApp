import { useNavigate } from "react-router-dom"

function BtnVoltar() {

    const navigate = useNavigate()

    return (
        <>
            <button className="btn btn-secondary d-block w-25 p-1"
                onClick={function () {
                    navigate(-1)
                }}>
                <i className="bi bi-arrow-90deg-left"></i>
            </button>

            <br />
        </>
    )
}

export default BtnVoltar