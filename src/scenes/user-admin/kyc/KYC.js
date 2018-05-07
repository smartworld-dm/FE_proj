import React, {Component} from 'react';
import { Upload, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, Menu, Dropdown, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const options = [
    {title: 'Passport', key: '1'},
    {title: 'Government ID', key: '2'},
    {title: 'Driving License', key: '3'}
];

class KYC extends Component {

	constructor() {
		super();

		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
			imageUrl: ''
		};
	}

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

	validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleButtonClick = (e) => {
	  message.info('Click on left button.');
	  console.log('click left button', e);
	}

	handleMenuClick = (e) => {
	  message.info('Click on menu item.');
	  console.log('click', e);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
	}

  render() {
  	const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const menu = (
		  <Menu onClick={this.handleMenuClick}>
		    <Menu.Item key="1">Passport</Menu.Item>
		    <Menu.Item key="2">Government ID</Menu.Item>
		    <Menu.Item key="3">Driving License</Menu.Item>
		  </Menu>
		);

    const props = {
		  name: 'file',
		  action: 'https://api.cloudinary.com/v1_1/sheilafox/image/upload?upload_preset=nmypifsc',
		  onChange: (info) => {
		    if (info.file.status !== 'uploading') {
		      console.log(info.file, info.fileList);
		    }
		    if (info.file.status === 'done') {
					message.success(`${info.file.name} file uploaded successfully`);
					this.setState({ imageUrl: info.file.response.secure_url });
		    } else if (info.file.status === 'error') {
		      message.error(`${info.file.name} file upload failed.`);
		    }
		  },
		};

    return (
      <div className="user-admin-kyc">
        <h2>Contact details</h2>
        <Row>
        	<Col span={12}>
	          <Form onSubmit={this.handleSubmit}>
	            <FormItem
				          {...formItemLayout}
				          label="First name"
				        >
			          {getFieldDecorator('firstname', {
			            rules: [{
			              required: true, message: 'Please input your firstname!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="Last name"
				        >
			          {getFieldDecorator('lastname', {
			            rules: [{
			              required: true, message: 'Please input your lastname!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="E-mail"
			        >
			          {getFieldDecorator('email', {
			            rules: [{
			              type: 'email', message: 'The input is not valid E-mail!',
			            }, {
			              required: true, message: 'Please input your E-mail!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="Password"
			        >
			          {getFieldDecorator('password', {
			            rules: [{
			              required: true, message: 'Please input your password!',
			            }, {
			              validator: this.validateToNextPassword,
			            }],
			          })(
			            <Input type="password" />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="Confirm Password"
			        >
			          {getFieldDecorator('confirm', {
			            rules: [{
			              required: true, message: 'Please confirm your password!',
			            }, {
			              validator: this.compareToFirstPassword,
			            }],
			          })(
			            <Input type="password" onBlur={this.handleConfirmBlur} />
			          )}
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="Address"
				        >
			          {getFieldDecorator('address', {
			            rules: [{
			              required: true, message: 'Please input your address!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="City"
				        >
			          {getFieldDecorator('city', {
			            rules: [{
			              required: true, message: 'Please input your city!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="Country"
				        >
			          {getFieldDecorator('country', {
			            rules: [{
			              required: true, message: 'Please input your country!',
			            }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="Phone Number"
			        >
			          {getFieldDecorator('phone', {
			            rules: [{ required: true, message: 'Please input your phone number!' }],
			          })(
			            <Input style={{ width: '100%' }} />
			          )}
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="ID Type"
				        >
			            <Select>
                      {options.map((item, index) =>
                          <Option key={index} value={item.key}>{item.title}</Option>
                      )}
                  </Select>
			        </FormItem>
			        <FormItem
				          {...formItemLayout}
				          label="Upload your ID"
				        >
			            <Upload {...props}>
								    <Button>
								      <Icon type="upload" /> Click to Upload
								    </Button>
								  </Upload>
			        </FormItem>
			        <FormItem {...tailFormItemLayout}>
			          <Button type="primary" htmlType="submit">Submit</Button>
			        </FormItem>
			      </Form>
			    </Col>
			  </Row>
      </div>
    );
  }
}

const WrappedKYCForm = Form.create()(KYC);
export default WrappedKYCForm;