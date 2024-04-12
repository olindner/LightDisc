import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    height: '105%',
  },
  mapButtonTopContainer:
  {
    flexDirection:'row',
    marginTop: -80,
  },
  mapDistanceText:
  {
    color: 'cornflowerblue',
    fontFamily: 'Courier-Oblique',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 100,
    marginTop: -100
  },
  mapButtonCurrent: 
  {
    alignItems: 'center',
    backgroundColor: 'rosybrown',
    borderRadius: 50,
    flex:1,
    flexDirection:'row',
    height: 50,
    justifyContent: 'center',
  },
  mapButtonThrow: 
  {
    alignItems: 'center',
    backgroundColor: 'peachpuff',
    borderRadius: 50,
    flex:1,
    height: 50,
    justifyContent: 'center',
  },
  mapButtonText:
  {
    fontFamily: 'Courier-BoldOblique',
    fontSize: 20,
  }
});

export default styles;