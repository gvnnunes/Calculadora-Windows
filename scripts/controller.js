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

    clearEntry(){

        if(!isNaN(this.getLastPosition())){

            this._operation.pop();
            this.setDisplay("0");
            
        }
        

    }

    calcEqual(){

        let last = this.getLastPosition();
        
        this._lastOperator = this.getOperator();
        this._lastNumber = this.getNumber();
        this.setLastPosition('(' + last + ')');            
        let result = this.getResult();            
        this._operation = [];
        this.setDisplay(result);
        this.pushOperation(result);

    }

    calc(){

        
        if(this._lastOperator && this._lastNumber){

            if (this._lastOperator == "=" && this._operation.length < 3) {

                let last = this.getOperator();
                this.pushOperation('(' + this._lastNumber + ')');
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
            else if(this._operation.length == 1){

                this._operation.push(this._lastOperator, '(' + this._lastNumber + ')');
                let result = this.getResult();
                this._operation = [];
                this.setDisplay(result);
                this.pushOperation(result);

            }
            else{

                this.calcEqual();

            }

            return;
        }   

        if(this._operation.length == 3){

            this.calcEqual();

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
        
        if(value == '√'){

            let last = this.getLastPosition();
            
            if(!isNaN(last)){

                last = Math.sqrt(last);
                this.setLastPosition(last);
                this.setDisplay(last);
                
            }

            return;
        }

        if(value == '¹/x'){

            let last = this.getLastPosition();
            
            if(!isNaN(last)){

                last = 1 / last;
                this.setLastPosition(last);
                this.setDisplay(last);
                
            }

            return;
        }

        if(value == 'x²'){

            let last = this.getLastPosition();
            
            if(!isNaN(last)){

                last = last * last;
                this.setLastPosition(last);
                this.setDisplay(last);
                
            }

            return;
        }

        if(value == '%'){

            let last = this.getLastPosition();

            if(!isNaN(last)){

                last = last / 100;                
                this.setLastPosition(last);
                let result = this.getResult();
                this._operation = [];
                this.pushOperation(result);
                this.setDisplay(result);

            }

            return;
        }

        if(value == '.'){
            
            let last = this.getLastPosition();

            if(this._operation.length == 0){

                this.pushOperation("0.");
                this.setDisplay("0.");
                return;

            }
            else if(this.getLastPosition() == 0){

                this.setLastPosition("0.");
                this.setDisplay("0.");
                return;

            }

            if(!isNaN(last)){

                if(String(last).indexOf('.') == -1){
                    
                    let newValue = last.toString() + ".";                    
                    this.setLastPosition(newValue);
                    this.setDisplay(newValue);
                    return;

                }                

            }            

            return;
        }

        if (value == '←') {

            let last = this.getNumber();
            let lastRemoved = String(last).substring(0, String(last).length -1);
            this.setLastPosition(lastRemoved);
            this.setDisplay(lastRemoved);
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

            }   
        }        
        else if(isNaN(value) == false){
            //Número

            if(isNaN(this.getLastPosition())){
                this.pushOperation(parseInt(value));         
                this.setDisplay(value);
            }
            else{
                let last = this.getLastPosition().toString() + value.toString();
                this.setLastPosition(parseFloat(last));
                this.setDisplay(last);                
            }

        }
        
    }

    execBtn(value){

        switch(value){

            case 'CE':
                this.clearEntry();
                break;
            case 'C':
                this.clearAll();
                break;
            case ',':
                this.Operation('.');
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
            case '√':
            case '¹/x':
            case 'x²':
            case '%':
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