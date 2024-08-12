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
                {
                    name:"Background1Layer01",
                    file:"images/game/backgrounds/Background1Layer01.png"
                },
                {
                    name:"Background1Layer02",
                    file:"images/game/backgrounds/Background1Layer02.png"
                },
                {
                    name:"Background1Layer03",
                    file:"images/game/backgrounds/Background1Layer03.png"
                },
                {
                    name:"Background1Layer04",
                    file:"images/game/backgrounds/Background1Layer04.png"
                },
                {
                    name:"Background2Layer01",
                    file:"images/game/backgrounds/Background2Layer01.png"

                },
                {
                    name:"Background2Layer02",
                    file:"images/game/backgrounds/Background2Layer02.png"
                },
                {
                    name:"Background2Layer03",
                    file:"images/game/backgrounds/Background2Layer03.png"
                },
                {
                    name:"Background2Layer04",
                    file:"images/game/backgrounds/Background2Layer04.png"
                }
            ],
            atlases: [
                {   
                    name: "assets",
                    json: "images/game/assets.json",
                    image: "images/game/assets.png",
                },

            ],
            soundsList:["bucket","click2","Game_Start","lose","pop","pop_magic","drag","explode","winwin","beep","gameLose","flesh",
                        "quick-whoosh","coin","minigamesError","cashSound","fire","rainbow","fantasy_ballad","zombieUp"],
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
                    name:"punchHit",
                    file:"images/game/spritesheets/punch_hit.png",
                    size:{x:199,y:185},
                    frames:18
                },
                {
                    name:"character01",
                    file:"images/game/spritesheets/characters/character01.png",
                    size:{x:250,y:250},
                    frames:135,
                },
                {
                    name:"character02",
                    file:"images/game/spritesheets/characters/character02.png",
                    size:{x:250,y:250},
                    frames:124,
                },
            ],
            spines:[
                /* {
                    name:"character01",
                    json:"images/game/spines/character01/skeleton.json",
                    atlas:"images/game/spines/character01/skeleton.atlas",
                }, */
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