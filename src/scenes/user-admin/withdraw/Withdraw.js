import React, {Component} from 'react';
import {Layout, Menu, Dropdown, Button, Icon, message, Select, Input, Form, Spin} from 'antd';
import {formValidationDecorator,validateResponseError} from '../../../utils/miscUtils';
import {getRegistrationPath, getRestorePath} from "../../../utils/urlBuilder";
import { getWallets, postTransactions, getWithdrawPaymentMethods } from '../../../services/session/authorization';

import {showSuccess, showWarning} from '../../../services/notifyService';

const Option = Select.Option;

const FormItem = Form.Item;

const walletsTitle = ['Main wallet','Transfer wallet','Referral wallet','External wallet'];

class Withdraw extends Component {

    state = {
        loading: false,
        email:'',
        amount:0,
        sender:0,
        receiver:-1,
        payment_method:0,
        payment_methods:[],
        wallets: []

    };

     handleSubmit(){
        console.log('handleSubmit');
        console.log(document.getElementById('email').value);
        console.log(document.getElementById('amount').value);
        
        console.log(this.state.payment_method);
        var data =  {
                        "action": 3,
                        "amount": parseInt(document.getElementById('amount').value),
                        "sender": this.state.sender,
                        "receiver": this.state.receiver,
                        "status": 0,
                        "payment_method": this.state.payment_method,
                        "payment_email": document.getElementById('email').value,
                    };

        this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    this.setState({loading: true});
                    console.log(values);
                    const error = await postTransactions(data);
                    this.setState({loading: false});

                    console.log('------ERROR-------');
                    console.log(error);
                    if (error && error.error.data) {
                        validateResponseError.call(this, error.error.data.detail);
                        showWarning("Withdrawl Error!", error.error.data.detail);
                    }
                }
        });
    }
    
    handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
        this.setState({
            selectValue: e.key,
        });
    };

    async loadWithdrawPaymentMethods(){
        const response = await getWithdrawPaymentMethods();
        console.log('payment_methods');
        console.log(response);

        var paymentMethods = [];
        try {
            var results = response.data.results;
            for(var i=0; i<results.length; i++) {
                var result = results[i];
                result.key = result.id;
                paymentMethods.push(result);
            }
            this.setState({payment_methods:paymentMethods});
        } 
        catch(e){
        }
    }
    
    async loadWallets(){
        const wallets = await getWallets();
        console.log('----Walllets--------');
        console.log(wallets);

        var walletsArray = [];
        try {
            var results = wallets.data.results;
            for(var i=0; i<results.length; i++) {
                var result = results[i];
                result.title = walletsTitle[result.kind];
                result.key = result.id;
                if(result.kind == 3) {
                    this.setState({receiver:result.id});
                } else if(result.kind !=1) {
                    walletsArray.push(result);
                }
            }
            this.setState({wallets:walletsArray});
        } 
        catch(e){
        }
    }

    componentDidMount() {
        this.loadWallets();
        this.loadWithdrawPaymentMethods();
    }

    handleMethodChange(value){
        console.log('handleMethodChange');
        console.log(value);
        this.setState({payment_method:value});
    }

    handleWalletChange(value){
        console.log('handleWalletChange');
        console.log(value);
        this.setState({sender:value});
    }

    checkAmount = (rule, value, callback) => {
        const form = this.props.form;
        var amount = form.getFieldValue('amount');
        if(amount<25)
            callback('Minimum amount to withdraw: $25.');
        else {
            callback();
        }
    }

    getForm(getFieldDecorator){
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="withdraw-form" style={{maxWidth: '50rem'}}>
                <h3>From wallet.</h3>
                <FormItem>
                    {getFieldDecorator('from_wallet', {
                        rules: [{required: true, message: 'Please input from wallet!'}],
                    })(
                        <Select onChange={ this.handleWalletChange.bind(this)}>
                            {this.state.wallets.map((item, index) =>
                                <Option key={index} value={item.key}>{item.title}</Option>
                            )}
                        </Select>
                    )}
                </FormItem>

                <h3>To wallet.</h3>
               <FormItem>
                    {getFieldDecorator('to_wallet', {
                        rules: [{required: true, message: 'Please input to wallet!'}],
                    })(
                        <Select onChange={ this.handleMethodChange.bind(this)}>
                            {this.state.payment_methods.map((item, index) =>
                                <Option key={index} value={item.key}>{item.name}</Option>
                            )}
                        </Select>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input email!'}], 
                    })(
                        <Input prefix={<Icon type="pay-circle-o" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Enter the email address of your external wallet." type="email" />
                    )}
                </FormItem>


                <FormItem>
                    {getFieldDecorator('amount', {
                        rules: [{required: true, message: 'Please input amount!'}, {validator: this.checkAmount}],
                    })(
                        <Input prefix={<Icon type="pay-circle-o" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Enter an amount" type="number"/>
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }

    render() {
        return (
            <div className="user-admin-withdraw">
                <h2 className="text-left">Withdraw</h2>
                <Spin spinning={this.state.loading}>
                    {formValidationDecorator.call(this, this.getForm)}
                </Spin>
                <div className="pt-3">
                    <h3>* Must have 1 active referral.</h3>
                    <h3>* Transfer balance can't be withdrawn.</h3>
                </div>
            </div>
        );
    }
}

const WithdrawForm = Form.create()(Withdraw);
export default WithdrawForm;
