import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';
import { Form, Input, Button, Checkbox } from 'antd';
import './test.css'

const FormItem = Form.Item;
const { TextArea } = Input

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

class DynamicRule extends Component {
  state = {
    checkNick: false,
    isPreview: false,
    preview: ''
  };
  handleSubmit(e) {
    e.preventDefault();
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.setState({ preview: values.description })
      }
    });
  }

  handleChange = (e) => {
    this.setState({
      checkNick: e.target.checked,
    }, () => {
      this.props.form.validateFields(['description'], { force: true });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { preview } = this.state
    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem {...formItemLayout} label="Title">
            {getFieldDecorator('title', {
              rules: [{
                required: true,
                message: 'Please input your title',
              }],
            })(
              <Input placeholder="Please input your title" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Description">
            {getFieldDecorator('description', {
              rules: [{
                required: this.state.checkNick,
                message: 'Please input your description',
              }],
            })(
              <TextArea placeholder="Please input your description" autosize={{ minRows: 6 }} />
            )}
          </FormItem>
          <FormItem {...formTailLayout}>
            <Checkbox
              value={this.state.checkNick}
              onChange={this.handleChange}
            >
              Nickname is required
            </Checkbox>
          </FormItem>
          <FormItem {...formTailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
        <article className="markdown-body">
          <Markdown source={preview} />
        </article>
      </div>
     
    );
  }
}

const ArticleCreateForm = Form.create()(DynamicRule);

export default ArticleCreateForm;