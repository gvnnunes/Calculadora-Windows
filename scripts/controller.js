class CalcController{

    constructor(){
        this._lastNumber;
        this._lastOperator = "";
        this._operation = [];
        this.buttons();        
    }      

    clearAll(){

        this._lastNumber = "";
        this._lastOperator = "";
        this._operation = [];
        this.setDisplay("0");

    }

    calc(){

        
        if(this._lastOperator && this._lastNumber){

            if (this._lastOperator == "=") {

                let last = this.getOperator();
                this.pushOperation('(' + this._lastNumber + ')');
                console.log(this._operation);
                let result = this.getResult();
                this._operation = [];
                this.setDisplay(result);
                this._operation.push(result, last);
                this._lastNumber = result;
                return;
            }

            if(this._operation.length == 2){

                this._lastOperator = "";
                this._lastNumber = "";           

            }
            else{

                this._operation.push(this._lastOperator, '(' + this._lastNumber + ')');
                let result = this.getResult();
                this._operation = [];
                this.setDisplay(result);
                this.pushOperation(result);

            }

            return;
        }   

        if(this._operation.length == 3){

            let last = this.getLastPosition();
            this._lastOperator = this.getOperator();
            this._lastNumber = this.getNumber();
            this.setLastPosition('(' + last + ')');
            let result = this.getResult();            
            this._operation = [];
            this.setDisplay(result);
            this.pushOperation(result);

        }
        else if(this._operation.length > 3){

            let nextOperator = this._operation.pop();
            let last = this.getLastPosition();
            this.setLastPosition('(' + last + ')');
            let result = this.getResult();   
            this._lastOperator = "=";        
            this._lastNumber = result;
            this._operation = [];
            this.setDisplay(result);
            this._operation.push(result, nextOperator);

        }

    }

    Operation(value){
        
        if (value == '←') {

            let last = this.getNumber();
            let lastRemoved = String(last).substring(String(last).length, String(last).length -1);
            this.setLastPosition(lastRemoved);
            this.setDisplay();
            return;

        }

        if(value == '='){
            
            this.calc();

            return;
        }

        if(value == '-1'){
            
            let last = this.getLastPosition();

            if(!isNaN(last)){                    
                    
                last = eval(last + "*-1");
                this.setLastPosition(last);
                this.setDisplay(last);
                console.log(this._operation);
            }

            return;
        }

        if (this._operation.length != 0 && isNaN(value)){
            //Operador
            if (isNaN(this.getLastPosition())){
                //Altera o operador
                this.setLastPosition(value);
                console.log(this._operation);
            }
            else{
                this.pushOperation(value);                
                this.calc();              
                console.log(this._operation);  
            }   
        }        
        else if(isNaN(value) == false){
            //Número

            if(isNaN(this.getLastPosition())){
                this.pushOperation(parseInt(value));
                console.log(this._operation);
                this.setDisplay(value);
            }
            else{
                let last = this.getLastPosition().toString() + value.toString();
                this.setLastPosition(parseInt(last));
                console.log(this._operation);
                this.setDisplay(last);                
            }

        }
        
    }

    execBtn(value){

        switch(value){

            case 'C':
                this.clearAll();
                break;
            case '±':
                this.Operation('-1');                
                break;
            case 'X':
                this.Operation('*');
                break;
            case '÷':
                this.Operation('/');
                break;
            case '←':
            case '=':
            case '+':
            case '-':
                this.Operation(value);
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.Operation(value);
                break;

        }

    }

    buttons(){

        let buttons = document.querySelectorAll(".row > button");
        
        buttons.forEach(btn => {
            
                btn.addEventListener("click", e =>{

                this.execBtn(btn.value);
            
            })
            
        });

    }

    pushOperation(value) {
        this._operation.push(value);
    }

    getResult() {
        return eval(this._operation.join(""));
    }

    getOperator(){
        
        for(let i = this._operation.length - 1; i > 0; i--){

            if(isNaN(this._operation[i])){

                return this._operation[i];
                
            }
            
        }

    }

    getNumber() {

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (isNaN(this._operation[i]) == false) {

                return this._operation[i];

            }

        }

    }

    setLastPosition(value) {
        this._operation[this._operation.length - 1] = value;
    }

    getLastPosition() {
        return this._operation[this._operation.length - 1];
    }

    getDisplay(){
        return document.querySelector("#display").textContent;
    }

    setDisplay(value){
        document.querySelector("#display").textContent = value;
    }
}