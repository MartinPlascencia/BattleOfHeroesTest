var gameUtils = function () {

    var game;
    var particlesGroup,textParticlesGroup,spriteParticlesGroup;
    var atlasName
    var firstResolution
    var desktop

    function setGame(gameUsed){
        game = gameUsed;
        desktop = game.sys.game.device.os.desktop
        particlesGroup = null
        textParticlesGroup = null
        spriteParticlesGroup = null
    }

    function saveLocalData(){
        var file = {
			playerName: gameConfig.getPlayerInfoProperty('playerName'),
            milestones:gameConfig.getMapProperty('milestones'),
		};
		localStorage.setItem('saveFile',JSON.stringify(file));
    }

    function loadLocalData(){
        var file = JSON.parse(localStorage.getItem('saveFile'));
        if(!file)
            return;
		gameConfig.setPlayerInfoProperty('playerName',file.playerName);
        if(file.milestones)
        {
            let milestones = gameConfig.getMapProperty('milestones');
            for(let i = 0;i<file.milestones.length;i++){
                milestones[i].unlocked = file.milestones[i].unlocked;
                milestones[i].stars = file.milestones[i].stars;
            }
        }

        console.log(gameConfig.getPlayerInfoProperty('playerName') + " player name");
    }

    function addCloseCallback(){
        window.addEventListener("beforeunload", function (e) {
            saveLocalData();                          
        });
    }

    function addParticles(listParticles,atlas,ignoreGravity){

        if(!atlasName)
            atlasName = atlas
        if(!particlesGroup)
            particlesGroup = []

        listParticles.forEach(function(particleName){
            createParticles(particleName,ignoreGravity)
        });
    }

    function addTextParticles(fontUsed,number){
        let numberToUse =  number || 4
        textParticlesGroup = game.add.group()

        for(let i = 0; i < numberToUse;i++){
            createTextParticle(fontUsed);
        }
    }

    function createTextParticle(fontUsed){
        var textParticle = game.add.bitmapText(0,0,fontUsed || 'kanit','0',18);
        textParticle.setOrigin(0.5)
        textParticle.alpha = 0
        textParticle.setCenterAlign()
        textParticlesGroup.add(textParticle)
        return textParticle;
    }

    function createParticles(tag,ignoreGravity){
                
        var particle
        let particleConfig = {
            frame:tag,
            speed: { min: -400, max: 400 },
            angle: { min: 0, max: 360 },
            scale: { min:1,max:3},
            alpha: {start:1,end:0},
            maxParticles:200,
            emitting:false,
            gravityY:300,
            //blendMode: 'SCREEN',
            rotate:{min:180,max:360},
        }
        if(ignoreGravity)
            particleConfig.gravityY = 0
        particle = game.add.particles(0,0,atlasName,particleConfig);
        //particle.stop()
        particle.tag = tag
        particlesGroup.push(particle)

        if(!atlasName)
            console.log("You need to specify the atlas name")
    }
         
    function showParticles(key,obj,partNumber,offsetPosition,timeParticle){
        
        var offset = offsetPosition || {x:0,y:0};
        var particlesNumber = partNumber || 10;
        var particleTime = timeParticle || 1500;
        var particle = lookParticle(key);
        
        var positionToEmit = getPositionToEmit(obj,offset)
        if(particle){
            //particle.gravityY = 0
            particle.lifeSpan = particleTime
			particle.emitParticleAt(positionToEmit.x,positionToEmit.y,particlesNumber);
        }else{
            console.log("particle " + key + " has not been created");
        }
    }

    function addSpriteParticles(){
        if(!spriteParticlesGroup)
            spriteParticlesGroup = game.add.group()
    }

    function showSpriteParticles(animName,obj,scale,frames,offsetPosition,keepAnimation){

        var offset = offsetPosition || {x:0,y:0};
        let fps = frames || 12
        let scaleToUse = scale || 1
        if(!spriteParticlesGroup)
            addSpriteParticles();
        var anim = spriteParticlesGroup.get(0,0,animName)

        if(!anim){
            console.log("sprite sheet particle " + animName + " has not been created")
            return
        }

        //console.log(spriteParticlesGroup.getLength() + ' sprites length')

        positionObject(anim,obj,offset)
        anim.setActive(true)
        anim.setVisible(true)
        //anim.loadTexture(animName)
        if(!game.anims.exists('fire' + animName)){
            game.anims.create({
                key:'fire' + animName,
                frames:game.anims.generateFrameNumbers(animName),
                frameRate:fps,
            })
        }
        anim.setScale(scaleToUse)
        anim.play({key:'fire' + animName,repeat:keepAnimation?-1:0});
        if(!keepAnimation){
            anim.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                spriteParticlesGroup.killAndHide(anim)
            }, this);
        }

        if(keepAnimation)
            return anim;
    }

    function getPositionToEmit(obj,offset){

        offset = offset || {x:0,y:0};
        let worldObj = obj.getWorldTransformMatrix()
        let positionToEmit = {}
        positionToEmit.x = worldObj.tx + offset.x
        positionToEmit.y = worldObj.ty + offset.y
        return positionToEmit
    }

    function scaleButton(obj,callback,style){
        if(!obj)
            return
        
        if(!style){
            var scale1 = obj.scaleX * 0.7
            var scale2 = obj.scaleX * 0.9

            game.tweens.add({
                targets:obj,
                scale:scale1,
                duration:150,
                onComplete:function(){
                    game.tweens.add({
                        targets:obj,
                        scale:scale2,
                        duration:50,
                        repeat:0,
                        yoyo:true,
                        onComplete:callback,
                    })
                },
                repeat:0,
                yoyo:true,
            })
        }else{
            var scaleX = obj.scaleX
            var scaleY = obj.scaleY

            game.tweens.add({
                targets:obj,
                scaleX:scaleX * 0.5,
                scaleY:scaleY * 1.8,
                duration:150,
                onComplete:()=>{
                    game.tweens.add({
                        targets:obj,
                        scaleX:scaleX * 2,
                        scaleY:0,
                        duration:100,
                        onComplete:callback,
                    })
                },
            })
        }
    }

    function checkDecimals(number){
        if(number % 1 != 0){
            return number.toFixed(1);
        }else{
            return number;
        }
    };

    function showTextParticles(text,obj,offsetPosition,fontSize,tint,font,dontMove){

        var particleText
        textParticlesGroup.children.each(function(particle){
            if(particle.alpha == 0){
                particleText = particle
                return
            }
        })
        if(!particleText){
            //console.log("particle text not available");
            particleText = createTextParticle(font)
        }
        positionObject(particleText,obj,offsetPosition || {x:0,y:0})
        particleText.fontSize = fontSize || 55;
        particleText.alpha = 1
        particleText.text = text
        particleText.tint = tint || 0xffffff
        font ? particleText.setFont(font) : particleText.setFont('kanit')
        game.tweens.add({targets:particleText,alpha:0,duration:500,delay:500})
        if(!dontMove)
            game.tweens.add({targets:particleText,y:particleText.y - 100,duration:1000})
    }

    function positionObject(asset, obj,offset){
        let worldObj = obj.getWorldTransformMatrix()
            asset.x = worldObj.tx + offset.x;
            asset.y = worldObj.ty + offset.y;
    }
     
    function lookParticle(key){
         
        for(var i = 0;i<particlesGroup.length;i++){
             
            var particle = particlesGroup[i]
             if(particle.tag == key){
                return particle
             }
         }
         
    }

    function blockGame(active){

        if(active){
            document.getElementById("turn").style.display="block";
            document.getElementById("game").style.display="none";
        }else{
            document.getElementById("turn").style.display="none";
            document.getElementById("game").style.display="block";
            if(getResolution() != firstResolution){

                window.location.reload(false)
            }
        }
        
    }

    function checkOrientation(){
        checkBlockResolution()
        onResizeCallback()
    }

    function onResizeCallback(){
        window.onresize = function (){
            checkBlockResolution()
        }
    }

    function checkBlockResolution(){
        if(!firstResolution)
            firstResolution = getResolution()
        let defaultOrientation = gameConfig.getInfo().orientation
        if(window.innerWidth > window.innerHeight){
            blockGame(defaultOrientation == 'portrait')
        }
        else{
            blockGame(defaultOrientation == 'landscape')
        }
    }

    function getResolution(){
        return window.innerWidth > window.innerHeight?'landscape':'portrait'
    }

    function isDesktop(){
        return desktop
    }

	return{
        setGame:setGame,
        showParticles:showParticles,
        showTextParticles:showTextParticles,
        showSpriteParticles:showSpriteParticles,
        addSpriteParticles:addSpriteParticles,
        addParticles:addParticles,
        addTextParticles:addTextParticles,
        scaleButton:scaleButton,
        checkOrientation:checkOrientation,
        isDesktop:isDesktop,
        getWorldPosition:getPositionToEmit,
        addCloseCallback:addCloseCallback,
        loadLocalData:loadLocalData,
	}
		
}()