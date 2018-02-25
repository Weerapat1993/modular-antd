import React, { Component } from 'react';
import { withSizes } from 'react-sizes'
import moment from 'moment';
// import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';
import { Form, Input, Button, List, Avatar, Icon } from 'antd';
import { withArticlePost } from '../redux'

const FormItem = Form.Item;
const { TextArea } = Input

const formItemLayout = {
  wrapperCol: { span: 24 },
};

const text = {
  placeholderTitle: 'Please input your title',
  placeholderDescription: 'Please input your description'
}

const userExample = [
  {
    name: 'Weerapat1993',
    avatar: '',
    created_at: new Date().getTime(),
    updated_at: new Date().getTime(),
  }
]

class DynamicRule extends Component {
  state = {
    isPreview: false,
    title: '',
    description: ''
  };

  componentWillReceiveProps(nextProps) {
    const { article, history } = this.props
    const newByID = nextProps.article.byID
    if(article.byID < newByID) {
      history.push(`/article/${newByID.reverse()[0]}`)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.props.createArticle(values)
      }
    });
  }

  handleTitle = (e) => {
    this.setState({ title: e.target.value })
  }

  handleDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  handlePreview = () => {
    const { isPreview } = this.state
    this.setState({ isPreview: !isPreview })
  }

  render() {
    const { isMobile } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { description, title, isPreview } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <List
          itemLayout="horizontal"
          dataSource={userExample}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
                description={moment(item.updated_at, "YYYYMMDD").fromNow()}
              />
              <Button.Group size='large'>
                <Button type='dashed primary' onClick={this.handlePreview}>
                  <Icon type="eye" />{!isMobile ? 'Preview' : null}
                </Button>
                <Button type='primary' htmlType="submit" disabled={isPreview}>
                  {!isMobile ? 'Publish' : null}<Icon type="upload" />
                </Button>
              </Button.Group>
            </List.Item>
          )}
        />
        {
          !isPreview ? (
            <div style={{ marginTop: 22 }}>
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
