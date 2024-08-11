class gameScene extends Phaser.Scene{

	constructor(){
		super("GameScene");
		//this._levelConfig = LevelConfig[1];
	}

	preload(){
		//scene = this

		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
		gameUtils.setGame(this)
	}

	
	addParticles(){

		gameUtils.addParticles(['star'],'gameAtlas')
		gameUtils.addSpriteParticles()
		gameUtils.addTextParticles('grobold')
		this.magicParticles.stop();

		this.createFade();

	};

	create(){
		
		sound.decode(assetsManager.getGameAssets().assets.soundsList,this)

		this.addParticles();
		this.show();
	}

	update(timer,delta){

	
	}

	createFade(){
		this.whiteFade = this.add.rectangle(screen.centerX,screen.centerY,screen.width,screen.height,0xffffff)
		//this.sceneGroup.add(this.whiteFade)
	}

	show(){
		this.restartAssets();
		this.animateScene();
	}

	animateScene(){
		this.whiteFade.alpha = 1;
		//this.addCoins(1000,this.titleScreen);
		sound.playSong('menuSong');
		sound.setMusicVolume(0.3);
		this.tweens.add({
			targets:this.whiteFade,
			alpha:0,
			duration:350,
			onComplete:()=>{

			}
		})
	}

	restartAssets(){
		this.score = 0;
	}
}