import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class Paypal extends React.Component {
    render() {
        const onSuccess = (payment) => {
            // console.log("The payment was succeeded!", payment);
            this.props.onSuccess(payment)
        }
 
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
 
        const onError = (err) => {
            console.log("Error!", err);
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'BRL'; 
        let total = this.props.toPay; 
        // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
 
        const client = {
            sandbox:    'AaVpZ4Y8pHAUYN8kesGuUJGj64EBujMwIr6dEJt-cUD6EE_Te8ZnmVUfmcf5TfidvVNfl261UnW2bMn6',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/
 
        return (
            <PaypalExpressBtn 
            env={env}
            client={client}
            currency={currency} 
            total={total} 
            onError={onError} 
            onSuccess={onSuccess} 
            onCancel={onCancel}
            style={{
                size: 'large',
                color:'blue',
                shape: 'rect',
                label: 'checkout'
            }} />
        );
    }
}
