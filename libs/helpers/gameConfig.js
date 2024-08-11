var gameConfig = function () {

    var gameInfo = {

        orientation:'landscape',
        skipLoading:true,
    }

    var playerInfo = {
        playerName:null,
    }

    var mapInfo = {
        milestones:[
            {
                unlocked:true,
                stars:0,
                position:{x:0.11,y:0.27},
                numberOfEnemies:2,
                background:1,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.2,y:0.52},
                numberOfEnemies:2,
                background:2,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.4,y:0.49},
                numberOfEnemies:2,
                background:1,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.77,y:0.8},
                numberOfEnemies:2,
                background:2,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.7,y:0.49},
                numberOfEnemies:2,
                background:1,
            },
        ],
        currentMilestone:0,
    }

    var characters = [
        {
            name:'character01',
            health:100,
            attack:10,
            defense:10,
            animationFrames:[
                {name:'Attack',start:0,end:24},
                {name:'Die',start:25,end:59},
                {name:'Hit',start:60,end:74},
                {name:'Idle',start:75,end:94},
                {name:'Walk',start:95,end:134},
            ]
        },
        {
            name:'character02',
            health:100,
            attack:10,
            defense:10,
            animationFrames:[
                {name:'Attack',start:0,end:29},
                {name:'Die',start:30,end:64},
                {name:'Hit',start:65,end:84},
                {name:'Idle',start:85,end:104},
                {name:'Walk',start:105,end:124},
            ]
        },
        {
            name:'character03',
            health:100,
            attack:10,
            defense:10,
            animationFrames:[
                {name:'Attack',start:0,end:19},
                {name:'Die',start:20,end:44},
                {name:'Hit',start:45,end:64},
                {name:'Idle',start:65,end:84},
                {name:'Walk',start:85,end:104},
            ]
        },
        {
            name:'character04',
            health:100,
            attack:10,
            defense:10,
            animationFrames:[
                {name:'Attack',start:0,end:19},
                {name:'Die',start:20,end:49},
                {name:'Hit',start:50,end:69},
                {name:'Idle',start:70,end:89},
                {name:'Walk',start:90,end:109},
            ]
        },
        {
            name:'character05',
            health:100,
            attack:10,
            defense:10,
            animationFrames:[
                {name:'Attack',start:0,end:24},
                {name:'Die',start:25,end:69},
                {name:'Hit',start:70,end:89},
                {name:'Idle',start:90,end:109},
                {name:'Walk',start:110,end:129},
            ]
        },
        {
            name:'character06',
            health:100,
            attack:10,
            defense:10,
            animationFrames:[
                {name:'Attack',start:0,end:39},
                {name:'Die',start:40,end:89},
                {name:'Hit',start:90,end:109},
                {name:'Idle',start:110,end:129},
                {name:'Walk',start:130,end:149},
            ]
        },
        {
            name:'character07',
            health:100,
            attack:10,
            defense:10,
            animationFrames:[
                {name:'Attack',start:0,end:39},
                {name:'Die',start:40,end:89},
                {name:'Hit',start:90,end:109},
                {name:'Idle',start:110,end:129},
                {name:'Walk',start:130,end:149},
            ]
        },
    ]
    
    function getInfo(){
        return gameInfo;
    }

    function setPlayerInfoProperty(property,value){
        playerInfo[property] = value;
    }

    function getPlayerInfoProperty(property){
        return playerInfo[property];
    }

    function getMapProperty(property){
        return mapInfo[property];
    }

    function setMapProperty(property,value){
        mapInfo[property] = value;
    }

	return{
        getInfo:getInfo,
        getMapProperty:getMapProperty,
        setPlayerInfoProperty:setPlayerInfoProperty,
        getPlayerInfoProperty:getPlayerInfoProperty,
	}
		
}()