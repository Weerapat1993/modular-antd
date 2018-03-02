import { Theme } from '../../../config'

const styles = {
  container: {
    margin: 20,
    textAlign: 'center'
  },
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
  loginIcon: { 
    fontSize: 128, 
    color: '#999',
  },
  loginHeader: {
    margin: '20px 20px',
    color: '#666',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#999',
    fontSize: 20,
    margin: 15,
  }
}

export default styles
