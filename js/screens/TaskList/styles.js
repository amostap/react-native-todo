import globalStyles from '../../globalStyles';

const styles = {
  container: {
    backgroundColor: globalStyles.colors.gray,
    flex: 1,
    justifyContent: 'flex-start',
  },
  listView: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    position: 'absolute',
    width: 65,
    height: 65,
    bottom: 15,
    right: 15,
    backgroundColor: globalStyles.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 50,
    elevation: 4,
  },
  buttonText: {
    color: globalStyles.colors.transparentWhite,
  },
  drawerContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoutButton: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 260,
    backgroundColor: globalStyles.colors.yellow,
  },
  text: {
    color: globalStyles.colors.transparentWhite,
    fontSize: 18,
    textAlign: 'center',
  },
  infoText: {
    textAlign: 'center',
  },
  menuIcon: {
    marginRight: 15,
    color: globalStyles.colors.transparentWhite,
  },
};

export default styles;
