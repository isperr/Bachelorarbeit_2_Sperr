import {toast} from 'react-toastify';

function Warning(msg){
  return(
    toast.warn(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  );
}

export default Warning;
