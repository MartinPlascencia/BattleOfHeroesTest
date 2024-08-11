var sceneloader = function(){

	var currentLoader = null
	var game
	var errorFiles = 0

	function init(gameUsed){
		game = gameUsed
	}

	function gotError(){
		return errorFiles
	}

	function createNewLoader(callbacks){
		
		callbacks = callbacks || {}

		var newLoader =  game.load;

		newLoader.on('start',function(){
			//console.log("Preloading scenes")
			if(typeof(callbacks.onStart) === "function"){
				callbacks.onStart()
			}
		})

		newLoader.on('progress',function(progress){
			//console.log((progress * 100) + ' %')
			var eventParams = {
				progress: progress, 
			}

			if(typeof(callbacks.onLoadFile) === "function"){
				callbacks.onLoadFile(eventParams)
			}
		},this)

		newLoader.on('filecomplete', function (file,type) {
			//console.log(type + ' ' + file + ' loaded correctly');
		});

		newLoader.on('loaderror', function (file) {
			errorFiles++
			console.log(file.type + ' ' + file.key + ' not loaded correctly');
		});

		newLoader.on('complete',function(){
			//console.log('loading complete')
			if(typeof(callbacks.onComplete) === "function"){
				callbacks.onComplete()
			}
		})

		return newLoader
	}


	function preload(scenes, callbacks){

		
		currentLoader = createNewLoader(callbacks)

		for(var indexScene = 0; indexScene < scenes.length; indexScene++){

			var currentScene = scenes[indexScene]
			if(currentScene.assets !== "undefined"){
				var assets = currentScene.assets

				if(typeof assets.jsons == "object"){
					for(var indexJson = 0; indexJson < assets.jsons.length; indexJson++){
						var currentJson = assets.jsons[indexJson]
						currentLoader.json(currentJson.name, currentJson.file)
					}
				}

				if(typeof assets.spritesheets == "object"){
					for(var indexSprite = 0; indexSprite < assets.spritesheets.length; indexSprite++){
						var currentSprite = assets.spritesheets[indexSprite]
						if(!game.textures.exists(currentSprite.name))
							currentLoader.spritesheet(currentSprite.name, currentSprite.file, {frameWidth:currentSprite.size.x, frameHeight:currentSprite.size.y,endFrame:currentSprite.frames})
					}
				}

				if(typeof assets.spines == "object"){
					for(var indexSpine = 0; indexSpine < assets.spines.length; indexSpine++){
						var currentSpine = assets.spines[indexSpine]
						currentLoader.spine(currentSpine.name, currentSpine.json, [currentSpine.atlas], true)
					}
				}

				if(typeof assets.images == "object"){
					for(var indexImage = 0; indexImage < assets.images.length; indexImage++){
						var currentImage = assets.images[indexImage]
						if(!game.textures.exists(currentImage.name))
							currentLoader.image(currentImage.name, currentImage.file)
					}
				}

				if(gameUtils.isDesktop()){
					if(typeof assets.textures == "object"){
						for(var indexImage = 0; indexImage < assets.textures.length; indexImage++){
							var currentImage = assets.textures[indexImage]
							if(!game.textures.exists(currentImage.name))
								currentLoader.image(currentImage.name, currentImage.file)
						}
					}
				}
				
				if(typeof assets.sounds == "object"){
					for(var indexSound = 0; indexSound < assets.sounds.length; indexSound++){
						var currentSound = assets.sounds[indexSound]
						if(!game.cache.audio.get(currentSound.name))
							currentLoader.audio(currentSound.name, currentSound.file,{instances:2})
					}
				}
				

				if(typeof assets.fonts == "object"){
					for(var indexFont = 0; indexFont < assets.fonts.length; indexFont++){
						var currentFont = assets.fonts[indexFont]
						if(!game.textures.exists(currentFont.name))
							currentLoader.bitmapFont(currentFont.name, currentFont.image, currentFont.font)
					}
				}

				let soundFormat = assets.soundFormat || '.mp3'
				if(typeof assets.soundsList == "object"){
					for(var indexSound = 0; indexSound < assets.soundsList.length; indexSound++){
						var currentSound = assets.soundsList[indexSound]
						if(!game.cache.audio.get(currentSound))
							currentLoader.audio(currentSound, 'sounds/' + currentSound + soundFormat)
					}
				}

				if(typeof assets.atlases == "object"){
					for(var indexAtlas = 0; indexAtlas < assets.atlases.length; indexAtlas++){
						var currentAtlas = assets.atlases[indexAtlas]
						if(!game.textures.exists(currentAtlas.name))
							currentLoader.atlas(currentAtlas.name, currentAtlas.image, currentAtlas.json)
					}
				}

				if(typeof assets.plugins == "object"){
					for(var indexPlugin = 0; indexPlugin < assets.plugins.length; indexPlugin++){
						var currentPlugin = assets.plugins[indexPlugin]
						if(!game.plugins.isActive(currentPlugin.name))
							currentLoader.plugin(currentPlugin.name, currentPlugin.file, true);
					}
				}
			}

			else{
				console.warn("Scene with no Assets to preload")
			}

			//saveScene(currentScene)
		}
		if(callbacks){
			errorFiles = 0
			currentLoader.start()
		}
	}

	return {
		init:init,
		preload: preload,
		gotError:gotError,
	}
}()