import { makeStyles } from '@material-ui/core';

const UseStyles = makeStyles({
  navBar: {
    backgroundColor: '#203040', // camelCase and , instead ; -> it's a object
    '& a': {
      // selectionne l'enfant  = & === tous les enfants a
      color: '#ffffff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: '1',
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    marginTop: '10',
    textAlign: 'center',
  },
  section: {
    marginTop: '10',
    marginBottom: '10',
  },
});

export default UseStyles;
