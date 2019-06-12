import Default from './Default';
import Error from './Error';
import Info from './Info';
import Success from './Success';
import Warning from './Warning';

function CustomToast(type, msg){
  switch (type) {
    case 'error':
      return Error(msg)
    case 'info':
      return Info(msg)
    case 'success':
      return Success(msg)
    case 'warning':
      return Warning(msg)
    default:
      return Default(msg)
  }
}

export default CustomToast;
