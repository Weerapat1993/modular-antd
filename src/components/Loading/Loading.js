import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button, Icon } from 'antd'
import { modalError } from '../ModalError'
import styles from './styles'

class Loading extends Component {
  componentWillReceiveProps(nextProps) {
    const { error } = this.props
    if(error !== nextProps.error && nextProps.error) {
      modalError(nextProps.error)
    }
  }

  render() {
    const { isLoading, error, children, onReload } = this.props
    return isLoading ? (
      <Row>
        <Col span={24} className='text-center'>
          <Icon type='loading' style={styles.loadingIcon} />
          <div style={styles.loadingText}>Loading . . .</div>
        </Col>
      </Row>
    ) : (
      !error ? children : (
        <div style={styles.errorContent}>
          <Icon type="close-circle" style={styles.errorIcon} />
          <div style={styles.errorHeader}>
            Oh Snap!
          </div> 
          <div style={styles.errorText}>
            <div>Something went wrong!</div>
            <div>Please try again.</div>
          </div>
          { onReload ? <Button type='primary' size='large' onClick={onReload}>Try Again!</Button> : null }
          {/* <div style={styles.errorHeader}>{error}</div> */}
        </div>
      )
    )
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onReload: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
  ])
}

Loading.defaultProps = {
  error: '',
}

export default Loading
