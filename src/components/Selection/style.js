import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  bigDiv: {
    background: 'white',
    padding: theme.spacing(2),
    width: "60%",
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
     
  },
  main_div: {
    textAlign:"center"
  }
}));
