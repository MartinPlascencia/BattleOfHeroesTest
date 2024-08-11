var assetsManager = function () {

    var preloadAssets = {
        assets : {
            atlases: [
                {
                    name: "loadingAtlas",
                    json: "images/preload/atlas.json",
                    image: "images/preload/atlas.png",
                }
            ],
            soundsList:['click'],
            fonts: [
                {
                    name:"futuraBold",
                    image:"images/game/font/futuraPTBold.png",
                    font:"images/game/font/futuraPTBold.fnt",
                },
            ]
        }
    }

    var gameAssets = {
        assets : {
            plugins:[

            ],
            images:[
                {
                    name:"loginBackground",
                    file:"images/game/loginBackground.png",
                },
                {
                    name:"map01",
                    file:"images/game/map01.png",
                },
            ],
            atlases: [
                {   
                    name: "assets",
                    json: "images/game/assets.json",
                    image: "images/game/assets.png",
                },

            ],
            soundsList:["beep","bucket","click2","explosion1","Game_Start","jackpot","lose","pop","pop_magic","gameplaySong","level_failed",
                        "quick-whoosh","coin","minigamesError","cashSound","fire","rainbow"],
            soundFormat:'.mp3',
            fonts: [
                {
                    name:"grobold",
                    image:"images/game/font/grobold.png",
                    font:"images/game/font/grobold.fnt",
                },
            ],
            spritesheets:[
                {
                    name:"bomb",
                    file:"images/game/spritesheets/ss_bomb.png",
                    size:{x:346,y:334},
                    frames:17,
                },
                {
                    name:"bubble_pop",
                    file:"images/game/spritesheets/ss_bubble.png",
                    size:{x:120,y:120},
                    frames:16,
                },
            ],
        }
    }

    function getPreloadAssets(){
        return preloadAssets
    }

    function getGameAssets(){
        return gameAssets
    }

	return{
        getPreloadAssets:getPreloadAssets,
        getGameAssets:getGameAssets,
	}
		
}()