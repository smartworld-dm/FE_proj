import React, {Component} from 'react';
import {Layout, Menu, Dropdown, Button, Icon, message, Select, Input, Form, Spin} from 'antd';
import {formValidationDecorator} from '../../../utils/miscUtils';
import {getRegistrationPath, getRestorePath} from "../../../utils/urlBuilder";
import { getWallets, postTransactions,getDepositPaymentMethods } from '../../../services/session/authorization';

const Option = Select.Option;

const FormItem = Form.Item;


const walletsTitle = ['Main wallet','Transfer wallet','Referral wallet','External wallet'];

class Deposit extends Component {

    state = {
        loading: false,
        email:'',
        amount:0,
        payment_method:0,
        payment_methods:[],
        wallets: [],
        sender:-1,
        payment_email:''
    };

    handleSubmit(){
        console.log('handleSubmit');
        console.log(document.getElementById('transaction_id').value);
        console.log(document.getElementById('amount').value);

        var data =     {
                        "action": 0,
                        "amount": parseInt(document.getElementById('amount').value),
                        "transaction_id": document.getElementById('transaction_id').value,
                        "receiver": 4,
                        "status": 0,
                        "sender": this.state.sender,
                        "payment_method": this.state.payment_method,
                        "payment_email": this.state.payment_email,
                    };

        if(this.state.payment_email == '') {
            showWarning("Error!", "Please input payment_email");
            return;
        }

        this.props.form.validateFields(async (err, values) => {
                if (!err) {
                    this.setState({loading: true});
                    console.log(values);
                  
                    const {error} = postTransactions(data);        
                    this.setState({loading: false});
                    
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
                    this.setState({sender:result.id});
                } else 
                    walletsArray.push(result);
            }
            this.setState({wallets:walletsArray});
        } 
        catch(e){
        }
    }

    componentDidMount() {
        this.loadWallets();
        this.loadDepositPaymentMethods();
    }

    async loadDepositPaymentMethods(){
        const response = await getDepositPaymentMethods();
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

    handleMethodChange(value){
        console.log('handleMethodChange');
        console.log(value);
        this.setState({payment_method:value});

        for(var i=0; i<this.state.payment_methods.length; i ++){
            var payment_method = this.state.payment_methods[i];
            if(value == payment_method.id) {
                var email = payment_method.payment_information[0].email;
                console.log(email);
                this.setState({payment_email:email});
            }
        }
    }

    getForm(getFieldDecorator){
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="withdraw-form" style={{maxWidth: '50rem'}}>
        
                <h2>Select a deposit method.</h2>
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

                <h2> Please send funds to {this.state.payment_email}</h2>

                <FormItem>
                    {getFieldDecorator('amount', {
                        rules: [{required: true, message: 'Please enter your Deposit amount.'}], 
                    })(
                        <Input prefix={<Icon type="pay-circle-o" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Deposit amount" type="number" />
                    )}
                </FormItem>

               

                <FormItem>
                    {getFieldDecorator('transaction_id', {
                        rules: [{required: true, message: 'Please enter your transaction_id.'}],
                    })(
                        <Input prefix={<Icon type="pay-circle-o" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Enter your transaction id."/>
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
            <div className="user-admin-deposit">
                <h2 className="text-left">Deposit</h2>
                <Spin spinning={this.state.loading}>
                    {formValidationDecorator.call(this, this.getForm)}
                </Spin>
              
            </div>
        );
    }
}

const DepositForm = Form.create()(Deposit);
export default DepositForm;
