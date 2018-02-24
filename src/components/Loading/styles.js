import Theme from '../../config/theme'

const styles = {
  loadingIcon: {
    margin: 30,
    fontSize: 120, 
    color: Theme['@primary-color']
  },
  loadingText: {
    fontSize: 24, 
    color: Theme['@primary-color']
  },
  errorContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  errorIcon: { 
    fontSize: 128, 
    color: '#f36',
  },
  errorHeader: {
    margin: '20px 20px',
    color: '#f36',
    fontSize: 36,
  },
  errorText: {
    color: '#999',
    fontSize: 20,
    margin: 15,
  }
}

export default styles