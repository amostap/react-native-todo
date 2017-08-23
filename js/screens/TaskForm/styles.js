import globalStyles from '../../globalStyles';

const styles = {
  container: {
    backgroundColor: globalStyles.colors.gray,
    flex: 1,
    justifyContent: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: globalStyles.colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    elevation: 4,
  },
  buttonText: {
    color: globalStyles.colors.transparentWhite,
  },
  input: {
    width: 260,
    alignSelf: 'center',
  },
};

export default styles;
