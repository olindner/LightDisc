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
    height: '110%',
    width: '100%',
  },
  mapButtonBottomContainer:
  {
    flexDirection:'row',
    marginTop: 10,
  },
  mapButtonTopContainer:
  {
    flexDirection:'row',
    marginTop: -120,
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
    fontSize: 20,
    fontFamily: "Courier-BoldOblique"
  }
});

export default styles;