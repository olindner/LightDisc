import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: 
  {
    flex: 1,
  },
  errorText: 
  {
    flex: 1,
    textAlign: 'left',
  },
  home: 
  {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  map: 
  {
    height: '95%',
    width: '100%',
  },
  mapButtonAdd: 
  {
    alignItems: 'center', //Horiz
    backgroundColor: 'yellow',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center', //Vertical
    width: 50
  },
  mapButtonSave: 
  {
    alignItems: 'center', //Horiz
    backgroundColor: 'yellow',
    borderRadius: 50,
    height: 50,
    justifyContent: 'center', //Vertical
    marginLeft: 10,
    width: 50
  },
  mapButtonText:
  {
    fontSize: 8,
  }
});

export default styles;