import {toast} from 'react-toastify';

function Default(msg){
  return(
    toast(msg, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  );
}

export default Default;
