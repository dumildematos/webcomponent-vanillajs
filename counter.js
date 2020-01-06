class Counter extends HTMLElement{

    constructor(){

        super();

        this.shadow = this.createShadowRoot();
        this._counto = 0;
    }

    set counto(value){
        this.setAttribute('counto', value);
    }

    get counto(){
        return this._counto;
    }
    
    static get observedAttributes(){
        return ['counto'];
    }

    attributeChangedCallback(name,olValue,newValue){
        var counterTxt = this.shadow.querySelector('.counter-bx');
        switch(name){
            case 'counto':
                this._counto = parseInt(newValue, 10) || 0;
                counterTxt.innerHTML = this.counto.toFixed().replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
    }

    connectedCallback(){
        var template = `
            <slot class="counter-bx"> ${this.counto} </slot>
        `;
        this.shadow.innerHTML = template;
    }
}

window.customElements.define('counter-to',Counter);