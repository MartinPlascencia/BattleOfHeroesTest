var gameConfig = function () {

    var gameInfo = {

        orientation:'landscape',
        skipLoading:false,
    }

    var playerInfo = {
        playerName:null,
    }

    var mapInfo = {
        milestones:[
            {
                unlocked:true,
                stars:0,
                position:{x:0.11,y:0.24},
                numberOfEnemies:2,
                background:1,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.2,y:0.49},
                numberOfEnemies:2,
                background:2,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.4,y:0.47},
                numberOfEnemies:3,
                background:1,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.77,y:0.8},
                numberOfEnemies:4,
                background:2,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.7,y:0.49},
                numberOfEnemies:5,
                background:1,
            },
        ],
        currentMilestone:0,
    }

    var characters = {
        enemies : [
            {
                name:'character02',
                health:100,
                attack:[10,25],
                defense:10,
                animationFrames:[
                    {name:'Attack',start:0,end:29,repeat:0},
                    {name:'Die',start:30,end:64,repeat:0},
                    {name:'Hit',start:65,end:84,repeat:0},
                    {name:'Idle',start:85,end:104,repeat:-1},
                    {name:'Walk',start:105,end:124,repeat:-1},
                ],
                offset:13,
            },
        ],
        heroes:[
            {
                name:'character01',
                health:100,
                attack:[35,55],
                defense:10,
                animationFrames:[
                    {name:'Attack',start:0,end:24,repeat:0},
                    {name:'Die',start:25,end:59,repeat:0},
                    {name:'Hit',start:60,end:74,repeat:0},
                    {name:'Idle',start:75,end:94,repeat:-1},
                    {name:'Walk',start:95,end:134,repeat:-1},
                ],
                offset:0,
            },
        ]
    }
    
    function restartMilestones(){
        mapInfo.milestones.forEach((milestone,index)=>{
            if(index == 0)
                milestone.unlocked = true;
            else
                milestone.unlocked = false;
            milestone.stars = 0;
        });
    }

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

    function getHeroesCharacters(){
        return characters.heroes;
    }

    function getEnemiesCharacters(){
        return characters.enemies;
    }

	return{
        restartMilestones:restartMilestones,
        getInfo:getInfo,
        getMapProperty:getMapProperty,
        setPlayerInfoProperty:setPlayerInfoProperty,
        getPlayerInfoProperty:getPlayerInfoProperty,
        getHeroesCharacters:getHeroesCharacters,
        getEnemiesCharacters:getEnemiesCharacters,
        setMapProperty:setMapProperty,
	}
		
}()