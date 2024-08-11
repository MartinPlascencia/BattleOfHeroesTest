class gameScene extends Phaser.Scene{

	constructor(){
		super("GameScene");
		//this._levelConfig = LevelConfig[1];
	}

	preload(){
		//scene = this


		gameUtils.setGame(this);

		this.currentMilestone = gameConfig.getMapProperty('milestones')[gameConfig.getMapProperty('currentMilestone')];
	}

	
	addParticles(){

		gameUtils.addParticles(['star'],'gameAtlas')
		gameUtils.addSpriteParticles()
		gameUtils.addTextParticles('grobold')

		this.createFade();

	};

	create(){
		
		sound.decode(assetsManager.getGameAssets().assets.soundsList,this)

		this.createBackground();
		//this.createHeroes();
		this.addParticles();
		this.show();
	}

	createBackground(){

		this.backgroundGroup = this.add.container()

		let backgroundKey = 'Background' + (gameConfig.getMapProperty('currentMilestone') + 1);

		let backgroundSky = this.add.tileSprite(0,0,screen.width,this.textures.get('backgrounds',backgroundKey + 'Layer04').height,'backgrounds',
			backgroundKey + 'Layer04' ).setOrigin(0,0);
		this.backgroundGroup.add(backgroundSky);
		this.backgroundGroup.sky = backgroundSky;

		let ground = this.add.tileSprite(0,screen.height,screen.width,this.textures.get('backgrounds',backgroundKey + 'Layer01').height,
			'backgrounds',backgroundKey + 'Layer01' ).setOrigin(0,1);

		let ground2 = this.add.tileSprite(0,ground.y - ground.displayHeight * 0.8,screen.width,this.textures.get('backgrounds',backgroundKey + 'Layer02').height,
			'backgrounds',backgroundKey + 'Layer02' ).setOrigin(0,1);

		let ground3 = this.add.tileSprite(0,ground2.y,screen.width,this.textures.get('backgrounds',backgroundKey + 'Layer03').height,
			'backgrounds',backgroundKey + 'Layer03' ).setOrigin(0,1);

		this.backgroundGroup.add([ground3,ground2,ground]);



	}

	createHeroes(){
		this.heroesGroup = this.add.container();

		let heroe = this.add.spine(screen.centerX - 50, screen.height - 100, 'character01', 'Idle', true);
		heroe.setSkinByName('default');

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