import {toast} from 'react-toastify';

function Success(msg){
  return(
    toast.error(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  );
}

export default Success;
