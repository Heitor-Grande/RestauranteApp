

function ModalConfirmacao({ mensagem, funcao, mensagem_btn, parametro }) {

    return (
        <>
            <button type="button" id="ModalConfirmacaoBtn" className="btn btn-primary" data-toggle="modal" data-target="#ModalConfirmacao" hidden>
                Launch demo modal
            </button>

            <div className="modal fade" id="ModalConfirmacao" tabIndex={-1} role="dialog" aria-labelledby="ModalConfirmacaoLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalConfirmacaoLabel">Confirmação</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="text-center">{mensagem}</p>
                            <div className="text-center">
                                <i className="bi bi-question-circle" style={{ fontSize: '200%' }}></i>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm"
                                onClick={function () {
                                    funcao(parametro[0], parametro[1])
                                }}>{mensagem_btn}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalConfirmacao