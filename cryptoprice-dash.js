class CryptoPriceDash extends Polymer.Element {
    static get is() { return 'cryptoprice-dash'; }
    static get properties() {
      return {
        currencies: {
          type: Array,
          value: [
            {
              code: 'BTC',
              name: 'Bitcoin'
            },
            {
              code: 'ETH',
              name: 'Ethereum'
            },
            {
              code: 'LTC',
              name: 'Litecoin'
            }
          ]
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
      console.log(response);
    }
  }

  window.customElements.define(CryptoPriceDash.is, CryptoPriceDash);