import { toast } from 'react-toastify';

export function ToastSuccess(msg: string){
    toast.success(`Success! ${msg}`, {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function ToastError(msg: string){
    toast.error(`Error! ${msg}`,  {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

export function ToastWarning(msg: string){
    toast.warn(`Warning! ${msg}`,  {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}