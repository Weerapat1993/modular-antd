import Theme from '../../config/theme'

const MENU_HEIGHT = 64

const styles = {
  contentStyle: {
    padding: 0, 
    marginTop: MENU_HEIGHT, 
    // zIndex: 0,
  },
  breedcrumbStyle: {
    margin: 16
  },
  menuStyle: {
    lineHeight: `${MENU_HEIGHT}px`,
    zIndex: 501,
  },
  headerStyle: {
    position: 'fixed', 
    width: '100%',
    zIndex: 500,
  },
  backToTop: {
    height: 60,
    width: 60,
    lineHeight: '60px',
    borderRadius: 30,
    backgroundColor: Theme['@primary-color'],
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  }
}

export default styles