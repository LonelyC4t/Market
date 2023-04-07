import { useEffect } from "react";
import ReactDOM from "react-dom";


export function ModalContent({children, closeModal}){
    useEffect(() => {
        const listner = (event) => {
            if (event.key === "Escape"){
                closeModal()
            }
        }
    
        document.addEventListener("keydown", listner);

        return () => {
            document.removeEventListener("keydown", listner)
        }
    }, [closeModal])

    return (
        <div>
            {children}
        </div>
    )
}

export function Modal({closeModal, isOpen = false, children}){
    
    if (isOpen === false) return null;

    const handlClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal()
        }
    };

    return ReactDOM.createPortal(
    <div onClick={()=> handlClick} >
        <ModalContent closeModal = {closeModal}>
            {children}
        </ModalContent>
    </div>, 
    document.getElementById('modalRoot'))
    
}

