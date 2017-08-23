import globalStyles from '../../globalStyles';

const styles = {
  container: {
    borderRadius: 5,
    backgroundColor: globalStyles.colors.lightGray,
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    elevation: 4,
  },
  doneContainer: {
    backgroundColor: globalStyles.colors.darkGray,
    elevation: 4,
  },
  text: {
    paddingLeft: 5,
    paddingRight: 5,
    textAlignVertical: 'center',
    flex: 1,
    fontSize: 16,
    fontWeight: '300',
    color: globalStyles.colors.transparentWhite,
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles;
