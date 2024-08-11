const sound = function(){

	var decodedSounds = {}
	var soundVolume = 1
	var musicVolume = 1
	var songName
	var soundActive = true;
	var musicActive = true;
	var game;

	function init(){
		decodedSounds = {}
		soundVolume = 1
		musicVolume = 1
		songName = null
	}

	function setMusicVolume(volume){
		musicVolume = volume
		if(songName)
			decodedSounds[songName].setVolume(musicVolume)
	}

	function fadeOutSong(time){
		if(typeof decodedSounds[songName] !== "undefined"){
			time = time || 500;
			let songValue = {volume:musicVolume}
			game.tweens.add({
				targets:songValue,
				volume:0,
				duration:time,
				onUpdate:()=>{
					decodedSounds[songName].setVolume(songValue.volume)
				},
				onComplete:()=>{
					decodedSounds[songName].stop()
				}
			});
		}
	}

	function setSoundVolume(volume){
		soundVolume = volume
	}

	function decode(soundStringArray,gameRerence){
		if(!soundStringArray)
			return
		game = gameRerence;
		console.log("Decoding Sounds...")
		for(var indexSound = 0; indexSound < soundStringArray.length; indexSound++){
			var currentSoundData = soundStringArray[indexSound]
			if(game.cache.audio.get(currentSoundData)){
				var currentLoadedAudio = game.sound.add(currentSoundData)
				decodedSounds[currentSoundData] = currentLoadedAudio
			}else{
				console.warn(currentSoundData + ' audio did not load correctly')
			}
			
		}

		//game.sound.setDecodedCallback(decodedSounds, function(){}, this)
	}

	function pause(soundId,active){
		if(typeof decodedSounds[soundId] !== "undefined"){
			active?decodedSounds[soundId].pause():decodedSounds[soundId].resume()
		}else{
			console.warn("[Sound]"+"Not found Sound: "+soundId)
		}
	}

	function play(soundId, params){

		if(!soundActive && (!params || !params.loop))
			return;
		params = params || {}
		params.volume = params.loop?musicVolume:soundVolume

		if(typeof decodedSounds[soundId] !== "undefined"){
			
			decodedSounds[soundId].play(params)
			return decodedSounds[soundId]
		}else{
			console.warn("[Sound]"+"Not found Sound: "+soundId)
		}
	}

	function playSong(soundId){

		if(!musicActive)
			return;
		if(songName)
			stop(songName)
		if(decodedSounds[soundId]){
			songName = soundId
			play(songName,{loop:true})
		}
	}

	function pauseSong(active){
		if(songName){
			pause(songName,active)
		}
	}

	function stop(soundId) {
		var sound = decodedSounds[soundId]
		if(sound)
			sound.stop()
	}

	function stopSong(){
		if(songName)
			stop(songName)
	}

	function stopAll() {
		for(var key in decodedSounds){
			var sound = decodedSounds[key]
			if(sound)
				sound.stop()
		}
	}

	function activateSound(active){
		soundActive = active;
	}

	function activateMusic(active){
		musicActive = active;
		if(!active)
			stopSong();
		else
			playSong(songName);
	}

	return {
		pause:pause,
		decode: decode,
		init: init,
		play: play,
		stopAll:stopAll,
		playSong:playSong,
		pauseSong:pauseSong,
		stopSong:stopSong,
		setMusicVolume:setMusicVolume,
		setSoundVolume:setSoundVolume,
		stop:stop,
		fadeOutSong:fadeOutSong,
		activateSound: activateSound,
		activateMusic: activateMusic,
		getSoundActive: ()=>soundActive,
		getMusicActive: ()=>musicActive,
	}

}()