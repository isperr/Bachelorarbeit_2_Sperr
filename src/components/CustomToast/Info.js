import {toast} from 'react-toastify';

function Info(msg){
  return(
    toast.info(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  );
}

export default Info;
