const tdpm = {
    createBoard(oBoard){
        let boardDiv = document.createElement('div');
        boardDiv.id = oBoard.id;
        boardDiv.style.cssText= `
        width:${oBoard.bWidth};
        height: ${oBoard.bHeight};
        border:1px solid black;
        box-sizing: border-box;
        margin:auto;
        `;

        document.body.append(boardDiv);
    },
    createStriker(oStriker){
        let strikerDiv =document.createElement('div');
        strikerDiv.id = oStriker.id;
        strikerDiv.name = oStriker.name;
        strikerDiv.style.cssText = `
        width: ${oStriker.sDiameter};
        height: ${oStriker.sDiameter};
        background-color: ${oStriker.color};
        display:flex;
        color:white;
        align-items: center;
        justify-content: center;
        border-radius: ${oStriker.borderRadius};
        background-color: ${oStriker.color};
        position: absolute;
        z-index: 999999;
        box-sizing: border-box;
        border 1px solid black;
        overflow:hidden;
        cursor:grab;
        user-select:none;
        `;
        strikerDiv.innerHTML = strikerDiv.id;
        document.querySelector(`#${oStriker.hostBoardId}`).append(strikerDiv);
        strikerDiv.where=this.whereIs.bind(document.querySelector('#'+strikerDiv.id),oStriker.hostBoardId);
        strikerDiv.there=this.toThere.bind(document.querySelector('#'+strikerDiv.id));

    },
    createPuck(oPuck){
        let puckDiv = document.createElement('div');
        puckDiv.id = oPuck.id;
        puckDiv.style.cssText= `
        width: ${oPuck.pDiameter};
        height: ${oPuck.pDiameter};
        display:flex;
        color:white;
        align-items: center;
        justify-content: center;
        border-radius: ${oPuck.borderRadius};
        background-color: ${oPuck.color};
        position: absolute;
        z-index: 999999;
        box-sizing: border-box;
        border 1px solid black;
        overflow:hidden;
        
        `;
        puckDiv.innerHTML = puckDiv.id;
        document.querySelector(`#${oPuck.hostBoardId}`).append(puckDiv);
        puckDiv.where=this.whereIs.bind(document.querySelector('#'+puckDiv.id),oPuck.hostBoardId);
        puckDiv.there=this.toThere.bind(document.querySelector('#'+puckDiv.id));
        puckDiv.canMove = this.physicsPropInstaller.canMove.bind(document.querySelector('#'+puckDiv));
    },
//---------------------------------------------------------
    init(config){
        config.board.forEach(oBoard=>{
            this.createBoard(oBoard)
        });
        config.puck.forEach(oPuck=>{
            this.createPuck(oPuck)
        });
        config.striker.forEach(oStriker=>{
            this.createStriker(oStriker)
        })

    },
    whereIs(hostBoardId){
        let hostBoard = document.getElementById(hostBoardId);
        //TODO: board border degeri sapmaya neden oluyor debug edilecek
        console.log(hostBoard.offsetLeft)
        let boardPosition = {
            x:hostBoard.offsetLeft,
            y:hostBoard.offsetTop,
        }
        // Goreceli olarak board icinin degerlerini verecek 0,0 noktasi boardin sol ust kosesi
        let objCoord ={
            x:parseInt(window.getComputedStyle(this).getPropertyValue('left'))-boardPosition.x,
            y:parseInt(window.getComputedStyle(this).getPropertyValue('top'))-boardPosition.y
            };
        return objCoord;
    },
    toThere(x, y){
        let hostBoard = document.getElementById(hostBoardId);
        //TODO: board border degeri sapmaya neden oluyor debug edilecek
        this.style.left = (x+hostBoard.x)+'px';
        this.style.top = (y+hostBoard.y)+'px';
    },
    physicsPropInstaller() {
        this.canMove= ()=>{

        };
        this.canStop = ()=>{

        };
        this.canGraspable = ()=>{

        }
    }


}
//-------------------------------------------------------------------------
window.addEventListener('load',()=>{
    tdpm.init({
        board:[
            {id:'board_1', bWidth:'1500px', bHeight:'800px'}
            ],
        puck:[
            {id:'puck_1', pDiameter:'100px ', color:'red', borderRadius:'50%', hostBoardId:'board_1', startInPosition:{position:'middle', x:null, y: null}}
            ],
        striker:[
            {name:'Player_1', id:'Player_1', sDiameter:'50px', borderRadius:'50%', color:'blue', hostBoardId:'board_1', physicProps:['canMove','canGraspable']},
            {name:'Player_2', id:'Player_2', sDiameter:'50px', borderRadius:'50%', color:'orange', hostBoardId:'board_1'}
            ],
        airflow:{}

    });

})
