import React, { Component } from 'react';
import { withSizes } from 'react-sizes'
import { func, shape, bool, array, string, oneOf } from 'prop-types';
import Markdown from 'react-remarkable';
import { Form, Input, Button, Icon } from 'antd';
import { withArticlePost } from '../redux'
import { UserHeader, modalError } from '../../../components'
import styles from './styles'

const FormItem = Form.Item;
const { TextArea } = Input
const formItemLayout = {
  wrapperCol: { span: 24 },
};

const text = {
  placeholderTitle: 'Please input your title',
  placeholderDescription: 'Please input your description'
}

class DynamicRule extends Component {
  static propTypes = {
    formCreateArticle: func.isRequired,
    formUpdateArticle: func.isRequired,
    article: shape({ byID: array }).isRequired,
    form: shape({ getFieldDecorator: func.isRequired }).isRequired,
    history: shape({ push: func }).isRequired,
    isMobile: bool.isRequired,
    dataForm: shape({
      title: string,
      description: string,
    }),
    method: oneOf(['PUT', 'POST']).isRequired
  }

  static defaultProps = {
    dataForm: {
      id: 0,
      title: '',
      description: '',
    }
  }

  constructor(props) {
    super(props)

    const { title, description } = props.dataForm
    this.state = {
      isPreview: false,
      title,
      description,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleDescription = this.handleDescription.bind(this)
    this.handlePreview = this.handlePreview.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const { article, history } = this.props
    const newByID = nextProps.article.byID
    if (article.byID < newByID) {
      history.push(`/article/${newByID.reverse()[0]}`)
    }
    if(article.error !== nextProps.article.error && nextProps.article.error) {
      modalError(nextProps.article.error)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, method, history, dataForm } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        if(method === 'PUT') {
          const newValue = {
            id: dataForm.id,
            ...values,
          }
          this.props.formUpdateArticle(newValue, method)
          history.push(`/article/${dataForm.id}`)
        } else {
          this.props.formCreateArticle(values, method)
        }
      }
    });
  }

  handleTitle(e) {
    this.setState({ title: e.target.value })
  }

  handleDescription(e) {
    this.setState({ description: e.target.value })
  }

  handlePreview() {
    const { isPreview } = this.state
    this.setState({ isPreview: !isPreview })
  }

  render() {
    const { isMobile } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { description, title, isPreview, } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <UserHeader>
          <Button.Group size='large'>
            <Button type='dashed primary' onClick={this.handlePreview}>
              <Icon type="eye" />{!isMobile ? 'Preview' : null}
            </Button>
            <Button type='primary' htmlType="submit" disabled={isPreview}>
              {!isMobile ? 'Publish' : null}<Icon type="upload" />
            </Button>
          </Button.Group>
        </UserHeader>
        {
          !isPreview ? (
            <div style={styles.formStyle}>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('title', {
                  initialValue: title,
                  rules: [{
                    required: true,
                    message: text.placeholderTitle,
                  }],
                })(
                  <Input
                    placeholder={text.placeholderTitle}
                    size="large"
                    onChange={this.handleTitle}
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout}>
                {getFieldDecorator('description', {
                  initialValue: description,
                  rules: [{
                    required: true,
                    message: text.placeholderDescription,
                  }],
                })(
                  <TextArea
                    size="large"
                    placeholder={text.placeholderDescription}
                    autosize={{ minRows: isMobile ? 8 : 24 }}
                    onChange={this.handleDescription}
                  />
                )}
              </FormItem>
            </div>
          ) : (
            <article className="markdown-body">
              <Markdown source={`## ${title || text.placeholderTitle}`} />
              <Markdown source={description} />
            </article>
          )
        }
      </Form>
    );
  }
}

const ArticleCreateForm = Form.create()(DynamicRule);
const mapSizeToProps = ({ width }) => ({
  isMobile: width < 480
})

export default withArticlePost(withSizes(mapSizeToProps)(ArticleCreateForm))
