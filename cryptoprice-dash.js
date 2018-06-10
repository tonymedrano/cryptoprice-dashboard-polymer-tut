class CryptoPriceDash extends Polymer.Element {
    static get is() { return 'cryptoprice-dash'; }
    static get properties() {
      return {
        currencies: {
          type: Array,
          value: [
            {
              code: 'BTC',
              name: 'Bitcoin',
              price: 0
            },
            {
              code: 'ETH',
              name: 'Ethereum',
              price: 0
            },
            {
              code: 'LTC',
              name: 'Litecoin',
              price: 0
            }
          ]
        },
        loading:{
          type: Boolean,
          notify: true,
          value: false
        }
      };
    }
    ready(){
      super.ready();
      Polymer.RenderStatus.afterNextRender(this, () => {
        this._getCurrencyData();
      })
    }
    _getCurrencyData(){
      let ajax = this.$.coinbase;
      let currencies = this.currencies;
      currencies.forEach((currency) => {
        ajax.url = `https://api.coinbase.com/v2/prices/${currency.code}-USD/spot`;
        ajax.generateRequest();
      });
    }
    _handleResponse(response){
      this._computeCurrencyPrice(response.detail);
    }
    _computeCurrencyPrice(source){
      let code = source.url.substring(35,38);
      let index = this.currencies.map(e => e.code).indexOf(code);
      this.set(`currencies.${index}.price`, source.response.data.amount);
    }
  }

  window.customElements.define(CryptoPriceDash.is, CryptoPriceDash);