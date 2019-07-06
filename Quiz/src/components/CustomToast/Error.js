import {toast} from 'react-toastify';

function Error(msg){
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

export default Error;
