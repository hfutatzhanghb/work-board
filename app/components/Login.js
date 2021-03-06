/*jshint esversion:6*/
import '../less/Login.less';
import React, { Component } from 'react';
import { Modal, Button, Form, Input, Checkbox } from 'antd';
import AlertMsg from './AlertMsg';
import { login } from '../actions/auth';
const createForm = Form.create;
const FormItem = Form.Item;

class Login extends Component{
  constructor(props){
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleOk(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFields((errs, values) => {
      if(!!errs){
        return;
      }
      dispatch(login(values));
    });
  }
  handleCancel(e) {
    const { hide } = this.props;
    hide();
  }
  render(){
    const { alert, btnStatus } = this.props;
    const { getFieldProps } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return(
      <Modal ref="modal"
        visible={true}
        title="登录"
        onOk={this.handleOk} onCancel={this.handleCancel}
        closable={false}
        footer={[
          <Button key="submit" type="primary" size="large" onClick={this.handleOk} disabled={!btnStatus}>登录</Button>,
          <Button key="back" type="ghost" size="large" onClick={this.handleCancel} disabled={!btnStatus}>取消</Button>
        ]}
      >
        <AlertMsg  alert={alert}/>
        <Form horizontal>
          <FormItem {...formItemLayout} label='姓名' required>
            <Input  {...getFieldProps('name')} />
          </FormItem>
          <FormItem {...formItemLayout} label='密码' required>
            <Input  {...getFieldProps('passwd')} type='password'/>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default createForm()(Login);
