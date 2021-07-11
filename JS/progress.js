class Paint {
    constructor(){
        this.domSelector();
        this.colorPallete();
        this.createCanvas();
        this.startPaint();
        this.colorPicker();
        this.clear();
        this.domListener();  
        this.mouseEventsList();
    }
    domSelector(){
        this.clearHolder = document.querySelector(".new");
        this.toolbarHolder = document.querySelectorAll(".toolbar>*");
        this.colorChoices = document.querySelectorAll(".colors-boxes");
        this.colorOneHolder = document.querySelector(".color-one");
        this.colorTwoHolder = document.querySelector(".color-two");
        this.colorOneBg = document.querySelector(".color-one-bg");
        this.colorTwoBg = document.querySelector(".color-two-bg");
        this.picker = document.querySelectorAll(".colors-picker");
        this.blockHolder = document.querySelector(".canvas-place");
        this.inputElement = document.querySelector('input[type=file]');
        this.imageUpload = undefined;
    }
    // this is the list of all mouseEvents
    mouseEventsList(){
        this.mouseDownF = this.mouseDownF.bind(this);
        this.mouseMoveF = this.mouseMoveF.bind(this);
        this.mouseUpF = this.mouseUpF.bind(this);
        this.keyClick = this.keyClick.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
    }
    // this method is used for picking different tools for drawing and get ride of other event listeners
    startPaint(){
        this.toolbarHolder.forEach((tool)=>{
                tool.addEventListener("click", (e)=>{
                    this.addTool(e.target);
                // if(this.toolss == "f"){}
                if(this.toolss == "cut"){
                    this.cut() 
                }
                else if(this.toolss == "copy"){
                    this.copy() 
                }
                else if(this.toolss == "paste"){
                    this.paste() 
                }
                else if(this.toolss == "text"){
                    this.textss();
                    this.draw();
                }
                else if(this.toolss == "resize"){
                    this.resize();
                    this.draw();
                }
                else if(this.toolss == "fillers"){
                    this.filler();
                    this.draw();
                }
                else if(this.toolss == "rotate-flip-ver" || this.toolss == "rotate-flip-hor"){
                    this.flip(this.toolss);
                    this.draw();
                }
                else if(this.toolss == "rotate-right-90-deg" || this.toolss == "rotate-left-90-deg" || this.toolss == "rotate-180-deg"){
                    this.rotate(this.toolss);
                    this.draw();
                }
                else if(this.toolss == "size-1" || this.toolss == "size-2" || this.toolss == "size-3" || this.toolss == "size-4"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    if(this.toolss == "size-1"){this.lineSize = 4}
                    if(this.toolss == "size-2"){this.lineSize = 6}
                    if(this.toolss == "size-3"){this.lineSize = 8}
                    if(this.toolss == "size-4"){this.lineSize = 10}
                }
                else if(this.toolss == "fills-no-color"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    this.fillColor = "rgba(255, 255, 255, 0)";
                    this.ctx.globalAlpha = 1;
                }
                else if(this.toolss == "fills-solid-color"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    this.fillColor = document.querySelector(".color-two-bg").style.background;
                    this.ctx.globalAlpha = 1;
                }
                else if(this.toolss == "fills-marker"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    this.fillColor = document.querySelector(".color-two-bg").style.background;
                    this.ctx.globalAlpha = 0.7;
                }
                else if(this.toolss == "outline-no-color"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    this.strokeColor = "rgba(255, 255, 255, 0)";
                    this.ctx.globalAlpha = 1;
                }
                else if(this.toolss == "outline-solid-color"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    this.strokeColor = document.querySelector(".color-One-bg").style.background;
                    this.ctx.globalAlpha = 1;
                }
                else if(this.toolss == "file-open"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    this.draw();
                }
                else if(this.toolss == "file-save"){
                    this.isDrawing = false; 
                    this.isMoving = false;
                    this.draw();
                }
                else{
                    this.draw();
                }    
                })
            })
    }
    handleFiles(e) {
            this.imgSrc = URL.createObjectURL(e.target.files[0]);
            this.imageUpload = new Image();
            this.imageUpload.src = this.imgSrc;
    } 
    mouseLocation(e){
        this.x = e.offsetX;
        this.y = e.offsetY;
    }
    // this method is using for the start point of drawing
    mouseLocationStart(e){
        this.xStart = e.offsetX;
        this.yStart = e.offsetY;
    }
    //////////////////////////////////////////////////////////////////////////////
    // this method helps us to create main canvas for drawing
    createCanvas(){
        this.myCanvasHolder = document.querySelector(".myPaint");
        this.width = this.myCanvasHolder.width = document.querySelector(".content").offsetWidth;
        this.height = this.myCanvasHolder.height = window.innerHeight*0.9;
        this.ctx = this.myCanvasHolder.getContext("2d");
        this.ctx.width = this.width;
        this.ctx.height = this.height;
        this.isDrawing = false;
    }
    // this method helps to create a temporary canvas for drawing when mouse is holding without deleting the other draws which drawed before
    createTempCanvas(){
    this.tempCanvasHolder = document.createElement("canvas");
    this.tempCanvasHolder.classList.add("tempPaint");
    document.body.append(this.tempCanvasHolder); // adds the canvas to the body element
    this.blockHolder.append(this.tempCanvasHolder); // adds the canvas to #someBox
    this.tempCanvasHolder.style.display = "block";
    this.tempCanvasHolder.style.position = "absolute";
    this.tempctx = this.tempCanvasHolder.getContext("2d"); 
    this.width = this.tempCanvasHolder.width = document.querySelector(".content").offsetWidth;
    this.height = this.tempCanvasHolder.height = window.innerHeight*0.9;
    
    }
    // this method is used for clearing the canvas
    clear(){
        this.clearHolder.addEventListener("click", ()=>{
        this.createCanvas();
        document.querySelectorAll(".tempPaint").forEach(x=>x.remove())
        })    
    }
    
    // this method is using for picking the color which will be used for background of drawing
    colorPicker(){
        this.picker.forEach(e=>{
            e.addEventListener("click", (e)=>{
                e.preventDefault();
                if (e.target.classList.contains("co")){
                    this.colorTwoHolder.classList.remove("active");
                    this.colorOneHolder.classList.add("active");
                }
                if (e.target.classList.contains("ct")){
                    this.colorOneHolder.classList.remove("active");
                    this.colorTwoHolder.classList.add("active");
                }  
            })
        })
    }
    colorPallete(){
        this.lineSize = 5;
        this.fillColor = "#fff";
        this.strokeColor = "#000";
        this.colorChoices.forEach(e=>{
            e.addEventListener("click",()=>{
                this.colorPicked = e.getAttribute("data-color");
                if (this.colorTwoHolder.classList.contains("active")){
                    this.colorTwoBg.style.background = this.fillColor = this.colorPicked;
                }
                else {
                    this.colorOneBg.style.background = this.strokeColor = this.colorPicked;
                };
        })
    })
    }
    textss(){
        let menu = ["font-fam","font-siz"];
            if(document.querySelector(`.text`).classList.contains("active")){
                document.querySelector(`.text`).classList.remove("active");
                menu.forEach(e=>{document.querySelector(`.${e}`).classList.remove("text-active");});
                document.querySelector(".text-view").classList.remove("menu-active");
                document.querySelector(".home").classList.add("menu-active");
            }
            else{
                document.querySelector(`.text`).classList.add("active");
                menu.forEach(e=>{document.querySelector(`.${e}`).classList.add("text-active");});
                document.querySelector(".text-view").classList.add("menu-active");
                document.querySelector(".home").classList.remove("menu-active");
            } 
    }
    textWrite(){
        //create temp place to write
        this.tempHolder = document.createElement("INPUT");
        this.tempHolder.classList.add("text-input");
        this.tempHolder.setAttribute("type", "text");
        document.body.append(this.tempHolder); 
        this.blockHolder.append(this.tempHolder);
        this.tempHolder.style.display = "block";
        this.tempHolder.style.position = "absolute";
        this.tempHolder.style.left = this.xStart;
        this.tempHolder.style.top = this.yStart;
        let fontSizeSelection = document.querySelector("#sizeSelect").selectedIndex;
        this.textStyle = "normal";
        this.tempHolder.style.fontSize = `${document.querySelectorAll(".size-selection")[fontSizeSelection].value}px`||"24px";
        let fontFamilySelection = document.querySelector("#familySelect").selectedIndex;
        this.tempHolder.style.fontFamily = `${document.querySelectorAll(".family-selection")[fontFamilySelection].value}`||"Nunito-Light";
        this.tempHolder.style.color = this.strokeColor || this.colorPicked;    
    }
    resize(){
            if(this.selectedAre){
                document.querySelector(".canvas-place").lastChild.remove();
                this.alaki = this.toolss;
                this.toolss = this.beforeTool;
                this.createTempCanvas();
                this.drawF(this.tempctx, this.mouseUpStartX*1.3, this.mouseUpStartY*1.3, this.mouseUpFinishX*1.3, this.mouseUpFinishY*1.3, true);
                this.toolss = this.alaki;
            }
    }
    filler(){
            document.querySelector(".myPaint").style.backgroundColor = document.querySelector(".color-two-bg").style.backgroundColor;
    }
    flip(element){
                document.querySelector(".canvas-place").lastChild.remove();
                this.alaki = this.toolss;
                this.toolss = this.beforeTool;
                this.createTempCanvas();
                if(element == "rotate-flip-hor"){
                    this.drawF(this.tempctx, this.mouseUpFinishX, this.mouseUpStartY, this.mouseUpStartX, this.mouseUpFinishY);
                    this.selectedAre = this.tempctx.getImageData((this.mouseUpFinishX>=this.mouseUpStartX)?this.mouseUpStartX-8:this.mouseUpFinishX-8,(this.mouseUpFinishY>=this.mouseUpStartY)?this.mouseUpStartY-8:this.mouseUpFinishY-8,Math.abs(this.mouseUpStartX-this.mouseUpFinishX)+16,Math.abs(this.mouseUpStartY-this.mouseUpFinishY)+16);
                }
                if(element == "rotate-flip-ver"){
                    this.drawF(this.tempctx, this.mouseUpStartX, this.mouseUpFinishY, this.mouseUpFinishX, this.mouseUpStartY);
                    this.selectedAre = this.tempctx.getImageData((this.mouseUpFinishX>=this.mouseUpStartX)?this.mouseUpStartX-8:this.mouseUpFinishX-8,(this.mouseUpFinishY>=this.mouseUpStartY)?this.mouseUpStartY-8:this.mouseUpFinishY-8,Math.abs(this.mouseUpStartX-this.mouseUpFinishX)+16,Math.abs(this.mouseUpStartY-this.mouseUpFinishY)+16);
                }
                this.toolss = this.alaki;
    }   
    rotate(element){
                document.querySelector(".canvas-place").lastChild.remove();
                this.alaki = this.toolss;
                this.toolss = this.beforeTool;
                this.createTempCanvas();
                this.widthCenter = this.mouseUpStartX+(this.mouseUpFinishX-this.mouseUpStartX)/2
                this.heightCenter = this.mouseUpStartY+(this.mouseUpFinishY-this.mouseUpStartY)/2
                this.tempctx.translate(this.widthCenter, this.heightCenter);
                if(element == "rotate-right-90-deg"){
                    this.tempctx.rotate(Math.PI * 0.5);
                }
                if(element == "rotate-left-90-deg"){
                    this.tempctx.rotate(Math.PI * 1.5);
                }
                if(element == "rotate-180-deg"){
                    this.tempctx.rotate(Math.PI);
                }
                this.tempctx.translate(this.widthCenter*-1, this.heightCenter*-1);
                this.drawF(this.tempctx, this.mouseUpStartX, this.mouseUpStartY, this.mouseUpFinishX, this.mouseUpFinishY);
                this.toolss = this.alaki;
                this.selectHeight = Math.abs(this.mouseUpFinishX-this.mouseUpStartX);
                this.selectWidth = Math.abs(this.mouseUpFinishY-this.mouseUpStartY);
                this.minimX=Math.min(this.mouseUpStartX,this.mouseUpFinishX);
                this.minimY=Math.min(this.mouseUpStartY,this.mouseUpFinishY);
                this.selectedAre = this.tempctx.getImageData(this.minimX-8-(this.selectWidth/2)+(this.selectHeight/2),this.minimY-8+(this.selectWidth/2)-(this.selectHeight/2),this.selectWidth+16,this.selectHeight+16);
    }
    cut(){
        this.selectedAre = this.ctx.getImageData(this.selectStartX,this.selectStartY,this.selectWidth,this.selectHeight);
        this.copySelect = false;
        this.cutSelect = true;
    }
    copy(){
        this.selectedAre = this.ctx.getImageData(this.selectStartX,this.selectStartY,this.selectWidth,this.selectHeight);
        this.cutSelect = false;
        this.copySelect = true;
    }
    paste(){
        if(this.copySelect){
            if(this.selectWidth > 2){
                document.querySelectorAll(".tempPaint").forEach(e=>e.remove());
                this.createTempCanvas(); 
                this.tempctx.putImageData(this.selectedAre, 10, 20);
                this.selectWidth = 1;
                this.copySelect = false;
            }
        }
        if(this.cutSelect){
            if(this.selectWidth > 2){
                document.querySelectorAll(".tempPaint").forEach(e=>e.remove());
                this.createTempCanvas(); 
                this.ctx.clearRect(this.selectStartX,this.selectStartY,this.selectWidth,this.selectHeight);
                this.ctx.fillStyle = "#fff"
                this.ctx.fillRect(this.selectStartX,this.selectStartY,this.selectWidth,this.selectHeight);
                this.tempctx.putImageData(this.selectedAre, 10, 20);
                this.selectStartX = 10;
                this.selectStartY = 20; 
                this.cutSelect = false;
            }
        }
    }   
//////////////////////////Draw///////////////////
    // add event listeners
    addTool(tool){
        if (tool.classList.contains("pen")){this.toolss = "pen";};
        if (tool.classList.contains("rectangle")){this.toolss = "rectangle";};
        if (tool.classList.contains("circle")){this.toolss = "circle";};
        if (tool.classList.contains("triangle")){this.toolss = "triangle";};
        if (tool.classList.contains("oval")){this.toolss = "oval";};
        if (tool.classList.contains("eraser")){this.toolss = "eraser";};
        if (tool.classList.contains("line")){this.toolss = "line";};
        if (tool.classList.contains("diamond")){this.toolss = "diamond";};
        if (tool.classList.contains("pentagon")){this.toolss = "pentagon";};
        if (tool.classList.contains("hexagon")){this.toolss = "hexagon";};
        if (tool.classList.contains("right-triangle")){this.toolss = "right-triangle";};
        if (tool.classList.contains("right-arrow")){this.toolss = "right-arrow";};
        if (tool.classList.contains("left-arrow")){this.toolss = "left-arrow";};
        if (tool.classList.contains("up-arrow")){this.toolss = "up-arrow";};
        if (tool.classList.contains("down-arrow")){this.toolss = "down-arrow";};
        if (tool.classList.contains("six-point-star")){this.toolss = "six-point-star";};
        if (tool.classList.contains("four-point-star")){this.toolss = "four-point-star";};
        if (tool.classList.contains("five-point-star")){this.toolss = "five-point-star";};
        if (tool.classList.contains("heart")){this.toolss = "heart";};
        if (tool.classList.contains("rounded-rectangular-callout")){this.toolss = "rounded-rectangular-callout";};
        if (tool.classList.contains("color-picker")){this.toolss = "color-picker";};
        if (tool.classList.contains("slct")){this.toolss = "select";};
        if (tool.classList.contains("cpy")){this.toolss = "copy";};
        if (tool.classList.contains("cuts")){this.toolss = "cut";};
        if (tool.classList.contains("pst")){this.toolss = "paste";};
        if (tool.classList.contains("text")){this.toolss = "text";};
        if (tool.classList.contains("resize")){this.toolss = "resize";};
        if (tool.classList.contains("fillers")){this.toolss = "fillers";};
        if (tool.classList.contains("rotate-flip-hor")){this.toolss = "rotate-flip-hor";};
        if (tool.classList.contains("rotate-flip-ver")){this.toolss = "rotate-flip-ver";};
        if (tool.classList.contains("rotate-right-90-deg")){this.toolss = "rotate-right-90-deg";};
        if (tool.classList.contains("rotate-left-90-deg")){this.toolss = "rotate-left-90-deg";};
        if (tool.classList.contains("rotate-180-deg")){this.toolss = "rotate-180-deg";};
        if (tool.classList.contains("f")){this.toolss = "f";};
        if (tool.classList.contains("marker")){this.toolss = "marker";};
        if (tool.classList.contains("oil")){this.toolss = "oil";};
        if (tool.classList.contains("watercolor")){this.toolss = "watercolor";};
        if (tool.classList.contains("size-1")){this.toolss = "size-1";};
        if (tool.classList.contains("size-2")){this.toolss = "size-2";};
        if (tool.classList.contains("size-3")){this.toolss = "size-3";};
        if (tool.classList.contains("size-4")){this.toolss = "size-4";};
        if (tool.classList.contains("fills-no-color")){this.toolss = "fills-no-color";};
        if (tool.classList.contains("fills-solid-color")){this.toolss = "fills-solid-color";};
        if (tool.classList.contains("fills-marker")){this.toolss = "fills-marker";};
        if (tool.classList.contains("outline-no-color")){this.toolss = "outline-no-color";};
        if (tool.classList.contains("outline-solid-color")){this.toolss = "outline-solid-color";};
        if (tool.classList.contains("brush-option-pencil")){this.toolss = "pen";};
        if (tool.classList.contains("file-open")){this.toolss = "file-open";};
        if (tool.classList.contains("file-save")){this.toolss = "file-save";};
        
    }
    // this method is used for adding event listener for any tools picked    
    draw(){
        // if the below line code be here I could change the color because it changes the ctx color!
            // this.clipBoardTools();
            this.inputElement.addEventListener("change", this.handleFiles, true);
            document.addEventListener("keydown",this.keyClick,true);
            this.blockHolder.addEventListener('mousedown',this.mouseDownF,true);
            this.blockHolder.addEventListener('mousemove',this.mouseMoveF,true);
            window.addEventListener('mouseup',this.mouseUpF, true);
    }
    // this method is for starting location of drawing by pressing left-click of mouse
    mouseDownF(e){
        if(this.toolss){
            this.locationX;
            this.locationY;
            this.mouseLocationStart(e);
            if(!this.loc){
                this.locationX = this.xStart;
                this.locationY = this.yStart;
                this.loc = true;
            }
            if(this.toolss == "f" ||this.toolss ==  "text"){
                this.textWrite();
                this.keyClick(e);
                this.isDrawing = false; 
                this.isMoving = true;
                this.toolss =  "newText";
            }
            else{
                if(this.isMovingDraw){
                    this.isMovingDraw = true;
                    this.isDrawing = false;
                    this.isMoving = true;
                }
                else if(this.toolss == "select"){
                    this.isDrawing = true; 
                    this.isMoving = false;
                }
                else if(this.toolss == "paste" || this.toolss == "rotate-right-90-deg" || this.toolss == "rotate-left-90-deg" || this.toolss == "rotate-180-deg" || this.toolss == "rotate-flip-hor" || this.toolss == "rotate-flip-ver"){
                    this.isDrawing = false; 
                    this.isMoving = true;
                }
                else if(this.toolss == "file-open"){
                    this.createTempCanvas();
                    this.tempctx.drawImage(this.imageUpload,0,0);
                    this.isDrawing = false; 
                    this.isMoving = true;
                }
                else if(this.toolss == "file-save"){
                    this.link.setAttribute('download', 'MintyPaper.png');
                    this.link.setAttribute('href', this.myCanvasHolder.toDataURL("image/png").replace("image/png", "image/octet-stream"));

                    Canvas2Image.saveAsPNG(canvas);
                    this.isDrawing = false; 
                    this.isMoving = true;
                }
                
                else {
                    this.isDrawing = true; 
                    this.isMoving = false;
                    this.createTempCanvas(e); 
                } 
            }       
        }
    }
    keyClick(e){        
            if(e.code == "Enter"){
                document.querySelector(".text-view").classList.remove("menu-active");
                document.querySelector(".home").classList.add("menu-active");
                document.querySelector(".text").classList.remove("active");
                document.querySelector(".text-input").remove();
                let menu = ["font-fam","font-siz"];
                menu.forEach(e=>{document.querySelector(`.${e}`).classList.remove("text-active");});
                this.createTempCanvas();
                this.tempctx.font = `${this.textSize} ${this.textFamily}`;
                this.tempctx.fillStyle = this.textColor;
                this.tempctx.fillText(this.textInput, this.locationX, this.locationY);
                this.tempctx.fill();
                this.text = this.tempctx.measureText(this.textInput);
                if(this.textSize.replace("px","") == 20){this.selectedAre = this.tempctx.getImageData(this.locationX,this.locationY-20,this.text.width,28);}
                if(this.textSize.replace("px","") == 24){this.selectedAre = this.tempctx.getImageData(this.locationX,this.locationY-23,this.text.width,32);}
                if(this.textSize.replace("px","") == 36){this.selectedAre = this.tempctx.getImageData(this.locationX,this.locationY-35,this.text.width,44);}
                if(this.textSize.replace("px","") == 42){this.selectedAre = this.tempctx.getImageData(this.locationX,this.locationY-40,this.text.width,52);}
                this.isMoving = true;  
            }
            else{
                this.text = document.querySelector(".text-input");
                this.textInput = this.text.value;
                this.textSize = this.text.style.fontSize;
                this.textColor = this.text.style.color;
                this.textStyle = this.text.style.fontStyle;
                this.textFamily = this.text.style.fontFamily;
            }
    }
    // this method is for continuous locations of drawing by holding left-click of mouse
    mouseMoveF(e){
    if (this.isDrawing == true) {
        if(this.toolss == "pen" || this.toolss == "eraser" || this.toolss == "marker" || this.toolss == "oil" || this.toolss == "watercolor"){
            this.drawF(this.ctx, this.x, this.y, e.offsetX, e.offsetY);
            }
        else{
            this.tempctx.clearRect(0, 0, this.width, this.height);
            this.drawF(this.tempctx, this.xStart, this.yStart, this.x, this.y); 
        }
        }
    this.mouseLocation(e);
    if(this.isMoving == true){
        
        if(this.toolss == "paste" || this.toolss == "rotate-right-90-deg" || this.toolss == "rotate-left-90-deg" || this.toolss == "rotate-180-deg" || this.toolss == "rotate-flip-hor" || this.toolss == "rotate-flip-ver" || this.toolss == "newText"){
            this.tempctx.clearRect(0, 0,9000, 9000);
            this.tempctx.putImageData(this.selectedAre, this.x, this.y);
        }
        else if(this.toolss == "file-open"){
                this.tempctx.clearRect(0, 0,9000, 9000);
                this.tempctx.drawImage(this.imageUpload,this.x,this.y);
            }
        else{
            this.tempctx.clearRect(0, 0,9000, 9000);
            this.b = this.x-this.mouseUpStartX;
            this.t = this.y-this.mouseUpStartY;
            this.drawF(this.tempctx, this.x, this.y, this.mouseUpFinishX+this.b, this.mouseUpFinishY+this.t);
        } 
    }
}
    // this method is for end locations of drawing by leave the left-click of mouse
    mouseUpF(e){  
        if (this.isDrawing == true) {
            if(this.toolss == "pen"  || this.toolss == "eraser" || this.toolss == "marker" || this.toolss == "oil" || this.toolss == "watercolor"){
                this.drawF(this.ctx, this.x, this.y, e.offsetX, e.offsetY);
                this.isMovingDraw = false;
                this.mouseUpStartX = this.xStart;
            this.mouseUpStartY = this.yStart;
            this.mouseUpFinishX = e.offsetX;
            this.mouseUpFinishY = e.offsetY;
            this.ctx.globalCompositeOperation = 'source-over'
            }
            else {
                this.drawF(this.tempctx, this.xStart, this.yStart, this.x, this.y);
                this.isMovingDraw = true;
                this.mouseUpStartX = this.xStart;
                this.mouseUpStartY = this.yStart;
                this.mouseUpFinishX = this.x;
                this.mouseUpFinishY = this.y;  
                this.beforeTool = this.toolss;
            }
                this.isDrawing = false;
                this.xStart = undefined;
                this.yStart = undefined;
                this.x = undefined;
                this.y = undefined; 
                // this.isGredient = false;   
        }
        if(this.isMoving == true){
            if(this.toolss == "paste" || this.toolss == "rotate-right-90-deg" || this.toolss == "rotate-left-90-deg" || this.toolss == "rotate-180-deg" || this.toolss == "newText" || this.toolss == "rotate-flip-hor" || this.toolss == "rotate-flip-ver"){
                this.ctx.putImageData(this.selectedAre, this.x, this.y);   
            }
            else if(this.toolss == "file-open"){
                this.ctx.drawImage(this.imageUpload,this.x,this.y);
            }
            else{
            this.b = this.x-this.mouseUpStartX;
            this.t = this.y-this.mouseUpStartY;
            this.drawF(this.ctx, this.x, this.y, this.mouseUpFinishX+this.b, this.mouseUpFinishY+this.t); 
            }           
            this.isMovingDraw = false;
            document.querySelectorAll(".tempPaint").forEach(e=>e.remove());
            this.b = this.x-this.mouseUpStartX;
            this.t = this.y-this.mouseUpStartY;
            this.mouseUpStartX = this.x;
            this.mouseUpStartY = this.y;
            this.mouseUpFinishX = this.mouseUpFinishX+this.b;
            this.mouseUpFinishY = this.mouseUpFinishY+this.t;
            this.toolss = null;
            this.selectedAre = null;
            this.isMoving = false;
            this.xStart = undefined;
            this.yStart = undefined;
            this.x = undefined;
            this.y = undefined;
        };
    }
    drawF(context, x1, y1, x2, y2,t,s) {
        context.lineWidth = this.lineSize;
        context.strokeStyle = this.strokeColor;
        context.fillStyle = this.fillColor;
        context.shadowBlur = 0;
        context.shadowColor = undefined;
        
            if (this.toolss == "pen") {
                context.beginPath();
                context.lineWidth = this.lineSize;
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.closePath();
                context.stroke();
                context.closePath();
            }
            if (this.toolss == "marker") {
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineWidth = 10;
                context.lineCap = context.lineJoin = "round";
                context.closePath();
                context.stroke();
                context.closePath();
            }
            if (this.toolss == "oil") {
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.lineWidth = 10;
                context.lineCap = context.lineJoin = "round";
                context.shadowBlur = 7;
                context.shadowColor = this.fillColor;
                context.closePath();
                context.stroke();
                context.closePath();
            }
            if (this.toolss == "watercolor") {
                context.beginPath();
                context.moveTo(x2, y2);
                context.arc( Math.random()+x2, Math.random()+y2, Math.random()+2,true, Math.PI * 2, false);
                context.lineWidth = 24;
                context.lineCap = context.lineJoin = "round";
                context.shadowBlur = 24;
                context.shadowColor = this.fillColor;
                context.closePath();
                context.stroke();
                context.closePath();
            }
            if (this.toolss == "rectangle") {
                this.widthSquare = x2-x1;
                this.heightSquare = y2-y1;
                context.beginPath();  
                context.rect(x1, y1, this.widthSquare, this.heightSquare);
                context.closePath(); 
                context.stroke();
                context.fill();
            }
            if(this.toolss == "circle") {
            (Math.abs(x2-x1)>=Math.abs(y2-y1))?this.widthCircle = Math.abs(y2-y1)/2:this.widthCircle = Math.abs(x2-x1)/2;
            context.beginPath();
            if (x2>x1 && y2>y1){
                context.arc(x1+((y2-y1)/2), y1+((y2-y1)/2), this.widthCircle, 0, 2 * Math.PI)
            }
            if (x2<x1 && y2>y1){
                context.arc(x1-((y2-y1)/2), y1+((y2-y1)/2), this.widthCircle, 0, 2 * Math.PI)
            }
            if (x2<x1 && y2<y1){
                context.arc(x1-Math.abs((y2-y1)/2), y1-Math.abs((y2-y1)/2), this.widthCircle, 0, 2 * Math.PI)
            }
            if (x2>x1 && y2<y1){
                context.arc(x1+Math.abs((y2-y1)/2), y1-Math.abs((y2-y1)/2), this.widthCircle, 0, 2 * Math.PI)
            }
            context.stroke();
            context.fill();
            context.closePath();
            }
            if(this.toolss == "triangle") {
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y1);
                context.lineTo(x1+((x2-x1)/2), y2);
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "oval"){
                this.widthOval = Math.abs(x2-x1)/2;
                this.heightOval = Math.abs(y2-y1)/2;
                context.beginPath();  
                context.ellipse(x1+((x2-x1)/2), y1+((y2-y1)/2), this.widthOval, this.heightOval, 0, 0, 2 * Math.PI);
                context.stroke();
                context.fill();
                context.closePath(); 
            }
            if(this.toolss == "eraser"){
                context.beginPath();
                context.fillStyle = "#000";
                context.globalCompositeOperation = 'destination-out'
                context.arc(x1, y1, this.lineSize*5, 0, 2 * Math.PI);
                context.fill();
                context.stroke();
                context.closePath();
            }
            if (this.toolss == "line") {
                context.beginPath();
                context.moveTo(x1, y1);
                context.lineTo(x2, y2);
                context.stroke();
                context.closePath();
            }
            if(this.toolss == "diamond") {
                context.beginPath();  
                context.moveTo(x1,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)/2),y2);
                context.lineTo(x2,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)/2),y1);     
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "pentagon") {
                context.beginPath();  
                context.moveTo(x1+((x2-x1)/2),y2);
                context.lineTo(x2,y1+((y2-y1)*3/5));
                context.lineTo(x1+((x2-x1)*4/5),y1);
                context.lineTo(x1+((x2-x1)*1/5),y1);
                context.lineTo(x1,y1+((y2-y1)*3/5));
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "hexagon") {
                context.beginPath();  
                context.moveTo(x1+((x2-x1)/2),y2);
                context.lineTo(x2,y1+((y2-y1)*3/4));
                context.lineTo(x2,y1+((y2-y1)*1/4));
                context.lineTo(x1+((x2-x1)/2),y1);
                context.lineTo(x1,y1+((y2-y1)*1/4));
                context.lineTo(x1,y1+((y2-y1)*3/4));
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "right-triangle") {
                context.beginPath();  
                context.moveTo(x1,y1);
                context.lineTo(x2,y2);
                context.lineTo(x1,y2);
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "right-arrow") {
                context.beginPath();  
                context.moveTo(x1,y1+((y2-y1)*3/4));
                context.lineTo(x1+((x2-x1)/2),y1+((y2-y1)*3/4));
                context.lineTo(x1+((x2-x1)/2),y2);
                context.lineTo(x2,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)/2),y1);
                context.lineTo(x1+((x2-x1)/2),y1+((y2-y1)*1/4));
                context.lineTo(x1,y1+((y2-y1)*1/4));
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "left-arrow") {
                context.beginPath();  
                context.moveTo(x1,y1+((y2-y1)*3/4));
                context.lineTo(x1+((x2-x1)/2),y1+((y2-y1)*3/4));
                context.lineTo(x1+((x2-x1)/2),y2);
                context.lineTo(x2,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)/2),y1);
                context.lineTo(x1+((x2-x1)/2),y1+((y2-y1)*1/4));
                context.lineTo(x1,y1+((y2-y1)*1/4));
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "up-arrow") {
                context.beginPath(); 
                context.moveTo(x1+((x2-x1)*1/4),y1);
                context.lineTo(x1+((x2-x1)*3/4),y1);
                context.lineTo(x1+((x2-x1)*3/4),y1+((y2-y1)/2));
                context.lineTo(x2,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)/2),y2);
                context.lineTo(x1,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)*1/4),y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)*1/4),y1);
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "down-arrow") {
                context.beginPath(); 
                context.moveTo(x1+((x2-x1)*1/4),y1);
                context.lineTo(x1+((x2-x1)*3/4),y1);
                context.lineTo(x1+((x2-x1)*3/4),y1+((y2-y1)/2));
                context.lineTo(x2,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)/2),y2);
                context.lineTo(x1,y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)*1/4),y1+((y2-y1)/2));
                context.lineTo(x1+((x2-x1)*1/4),y1);
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "six-point-star") {
                context.beginPath();  
                context.moveTo(x1,y1+((y2-y1)*1/4));
                context.lineTo(x1+((x2-x1)*1/6),y1+((y2-y1)*1/2));
                context.lineTo(x1,y1+((y2-y1)*3/4));
                context.lineTo(x1+((x2-x1)*1/3),y1+((y2-y1)*3/4));
                context.lineTo(x1+((x2-x1)*1/2),y2);
                context.lineTo(x1+((x2-x1)*2/3),y1+((y2-y1)*3/4));
                context.lineTo(x2,y1+((y2-y1)*3/4));
                context.lineTo(x1+((x2-x1)*5/6),y1+((y2-y1)*1/2));
                context.lineTo(x2,y1+((y2-y1)*1/4));
                context.lineTo(x1+((x2-x1)*2/3),y1+((y2-y1)*1/4));
                context.lineTo(x1+((x2-x1)*1/2),y1);
                context.lineTo(x1+((x2-x1)*1/3),y1+((y2-y1)*1/4));
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "four-point-star") {
                context.beginPath();  
                context.moveTo(x1,y1+((y2-y1)*1/2));
                context.lineTo(x1+((x2-x1)*3/8),y1+((y2-y1)*5/8));
                context.lineTo(x1+((x2-x1)*1/2),y2);
                context.lineTo(x1+((x2-x1)*5/8),y1+((y2-y1)*5/8));
                context.lineTo(x2,y1+((y2-y1)*1/2));
                context.lineTo(x1+((x2-x1)*5/8),y1+((y2-y1)*3/8));
                context.lineTo(x1+((x2-x1)*1/2),y1);
                context.lineTo(x1+((x2-x1)*3/8),y1+((y2-y1)*3/8));
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "five-point-star") {
                context.beginPath();  
                context.moveTo(x1,y1+((y2-y1)*6.5/10));
                context.lineTo(x1+((x2-x1)*3.5/10),y1+((y2-y1)*6.5/10));
                context.lineTo(x1+((x2-x1)*1/2),y2);
                context.lineTo(x1+((x2-x1)*6.5/10),y1+((y2-y1)*6.5/10));
                context.lineTo(x2,y1+((y2-y1)*6.5/10));
                context.lineTo(x1+((x2-x1)*7/10),y1+((y2-y1)*3.5/10));
                context.lineTo(x1+((x2-x1)*8/10),y1);
                context.lineTo(x1+((x2-x1)*1/2),y1+((y2-y1)*1.5/10));
                context.lineTo(x1+((x2-x1)*2/10),y1);
                context.lineTo(x1+((x2-x1)*3/10),y1+((y2-y1)*3.5/10));
                context.closePath();
                context.stroke();
                context.fill();
            }
            if(this.toolss == "heart") {
                this.widthCircle = Math.abs(x2-x1);
                this.heightOval = Math.abs(y2-y1);
                if(x2<x1){[x1,x2]=[x2,x1]};
                if(y2>=y1){this.startYPoint=y1+(this.heightOval*0.35)};
                if(y2<y1){this.startYPoint=y1-(this.heightOval*0.65)};
                context.beginPath();  
                // left top arc
                context.ellipse(x1+(this.widthCircle*2.1/8), this.startYPoint,this.widthCircle*2.1/8,this.heightOval*0.35, 0,  0, Math.PI,true);
                // right top arc
                context.ellipse(x1+(this.widthCircle*5.9/8), this.startYPoint, this.widthCircle*2.1/8,this.heightOval*0.35, 0,  0, Math.PI,true);
                // right bottom arc
                context.ellipse(x1+(this.widthCircle*1/3),this.startYPoint, this.widthCircle*2/3,this.heightOval*0.65, 0,  0,Math.PI*2.515/6);
                // left bottom arc
                context.ellipse(x1+(this.widthCircle*2/3),this.startYPoint, this.widthCircle*2/3,this.heightOval*0.65, 0, Math.PI*3.485/6,Math.PI);
                context.stroke();
                context.fill();
                context.closePath();
            } 
            if(this.toolss == "color-picker") {
                let pixel = this.ctx.getImageData(x2, y2, 1, 1);
                let data = pixel.data;
                const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
                if (this.colorTwoHolder.classList.contains("active")){
                    this.colorTwoBg.style.background = this.fillColor = rgba;
                }
                else {
                    this.colorOneBg.style.background = this.strokeColor = rgba;
                };   
            }
            if(this.toolss == "select") {
                this.selectWidth = x2-x1;
                this.selectHeight = y2-y1;
                this.selectStartX = x1;
                this.selectStartY = y1;
            }
    }
    /////////////////////////////Dom/////////////////////////////////
    // This function will accept common Dom events 
    domListener(){
        this.menuDisplay(["file","rotate","brush","outline","fills","size"]);
    }
    // This method using for showing the menus
    menuDisplay(link){
        link.forEach(element=>{
            document.querySelector(`.${element}`).addEventListener("click", (e)=>{
                e.preventDefault();
                this.listShow = document.querySelector(`.${element}-list`);
                if (this.listShow.classList.contains("dis-none")){
                    this.listShow.classList.remove("dis-none");
                    this.listShow.classList.add("dis-grid");
                    this.toggleOverlay();
                }
                else {
                    this.listShow.classList.remove("dis-grid");
                    this.listShow.classList.add("dis-none");
                    this.toggleOverlay();
                }
            })
        })
        document.querySelectorAll(".file-list>*").forEach(e=>e.addEventListener("click",e=>{
            document.querySelector(".file-list").classList.remove("dis-grid");
            document.querySelector(".file-list").classList.add("dis-none");
            document.querySelector(".background-overlay").classList.add("dis-none");
        }));
    }
    // this method is using for getting ride of menus by clicking outside of it
    toggleOverlay(){
        this.overlay = document.querySelector(".background-overlay");
        (this.overlay.classList.contains("dis-none"))?this.overlay.classList.remove("dis-none"):this.overlay.classList.add("dis-none");
        this.overlay.addEventListener("click", (e)=>{
            e.preventDefault();
            this.overlay.classList.add("dis-none");
            ["file","rotate","brush","outline","fills","size"].forEach(e=> {
                this.listShow = document.querySelector(`.${e}-list`);
                this.listShow.classList.add("dis-none"); 
                this.listShow.classList.remove("dis-grid");
            }) 
        })
    }
};  
const paint = new Paint();