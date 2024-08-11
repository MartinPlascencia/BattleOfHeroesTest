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
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.2,y:0.52},
                numberOfEnemies:2,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.4,y:0.49},
                numberOfEnemies:2,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.77,y:0.8},
                numberOfEnemies:2,
            },
            {
                unlocked:false,
                stars:0,
                position:{x:0.7,y:0.49},
                numberOfEnemies:2,
            },
        ],
        currentMilestone:null,
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

	return{
        getInfo:getInfo,
        getMapProperty:getMapProperty,
        setPlayerInfoProperty:setPlayerInfoProperty,
        getPlayerInfoProperty:getPlayerInfoProperty,
	}
		
}()