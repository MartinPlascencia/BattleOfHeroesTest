class mapScene extends Phaser.Scene{

	constructor(){
		super("MapScene");
		//this._levelConfig = LevelConfig[1];
	}

	preload(){

		gameUtils.setGame(this)
		console.log("screen width: " + screen.width + " screen height: " + screen.height + " window width: " + window.innerWidth + " window height: " + window.innerHeight); 
	}

	
	addParticles(){

		gameUtils.addParticles(['star'],'gameAtlas')
		gameUtils.addSpriteParticles()
		gameUtils.addTextParticles('grobold')

		this.confetti = this.add.particles(0, 0, 'gameAtlas', {
			frame:['confetti_red','confetti_yellow','confetti_blue','confetti_green'],
            x: { random: [ 0,screen.width ] },
			y:-200,
            lifespan: 3000,
            gravityY: 400,
            frequency: 75,
            scale: { min: 0.3, max: 1 },
			angle: { min: 0, max: 360 },
			rotate:{start:0,end:450},
			accelerationY:{min:100,max:300},
			speedX:{min:-100,max:100},
        });
		this.confetti.stop();

		this.createFade();

	};

	create(){
		
		sound.decode(assetsManager.getGameAssets().assets.soundsList,this)

		this.createMapBackground();
		this.createScrollCamera();
		this.createMapMilestones();
		this.createUI();
		this.createBottomBar();
		this.addParticles();
		this.show();
	}

	createMapBackground(){
		let background = this.add.image(0,0,'map01').setOrigin(0,0);
		let originalHeight = background.displayHeight;
		background.displayHeight = screen.height;
		background.displayWidth = (background.displayHeight * background.displayWidth) / originalHeight;
		this.background = background;
	}

	createMapMilestones(){
		let milestones = gameConfig.getMapProperty('milestones');
		this.mapMilestones = this.add.container(0,0);
		milestones.forEach((milestone,index)=>{
			let milestoneTexture = 'LvlMapLock';
			if(milestone.stars > 0)
				milestoneTexture = 'LvlMap' + milestone.stars + 'Star';
			else if(milestone.unlocked)
				milestoneTexture = 'LvlMapAvailable';
			let milestoneImage = this.add.image(milestone.position.x * this.background.displayWidth,milestone.position.y * this.background.displayHeight,
				'assets',milestoneTexture);
			if(milestone.unlocked)
				milestoneImage.setInteractive();
			milestoneImage.setScale(2.5);
			milestoneImage.milestoneIndex = index;
			milestoneImage.setSize(1000,2000);
			milestoneImage.on('pointerdown',()=>{
				this.deactivateMilestones();
				gameConfig.setMapProperty('currentMilestone',milestoneImage.milestoneIndex);
				gameUtils.scaleButton(milestoneImage,()=>{
					milestoneImage.setInteractive();
				});
				sound.play("pop");
			})
			this.mapMilestones.add(milestoneImage);
		})
	}

	deactivateMilestones(){
		this.mapMilestones.list.forEach(milestone=>{
			milestone.disableInteractive();
		})
	}

	createScrollCamera(){
		let cameraOptions = {
			contentBounds: {   // Determines the limits of the area where the camera is looking. (optional)
				x: 0,          // x position of contents from top-left origin (default = cameraOptions.x)
				y: 0,           // y position of contents from top-left origin (default = cameraOptions.y)
				length: this.background.displayWidth     // Distance measured in pixels along the camera main axis
			},
			horizontal: true   // Does this camera use horizontal scroll (default = false)
		};
		this.scrollCamera = new ScrollingCamera(this, cameraOptions);
	}

	createUI(){
		this.coinsUI = this.add.container(screen.width - 125,55);

		let coinsBarImage = this.add.image(0,0,'assets','GoldBar');
		this.coinsUI.add(coinsBarImage);

		let coinsText = this.add.bitmapText(0,3,'grobold','0',30,1).setOrigin(0.5);
		this.coinsUI.add(coinsText);

		this.coinsUI.setScrollFactor(0,0);
	}

	createBottomBar(){
		this.bottomBar = this.add.container(0,screen.height);
		this.bottomBar.setScrollFactor(0,0);

		let buttons = ['Shop','Heroes','Arena','Map','Options']

		let buttonWidth = screen.width / buttons.length;
		buttons.forEach((button,index)=>{

			let buttonContainer = this.add.container(buttonWidth * index + buttonWidth * 0.5,0);
			this.bottomBar.add(buttonContainer);

			let buttonImage = this.add.image(0,0,'assets','Btn_orange_active');
			buttonImage.displayWidth = buttonWidth;
			buttonImage.setOrigin(0.5,1);
			buttonContainer.add(buttonImage);

			if(button == 'Map')
				buttonImage.setFrame('Btn_orange_inactive');

			let buttonText = this.add.bitmapText(-15,-40,'grobold',button,30,1).setOrigin(0,0.5);
			buttonContainer.add(buttonText);

			let buttonIcon = this.add.image(buttonText.x - 40,buttonText.y,'assets',button + '_icon');
			buttonContainer.add(buttonIcon);

			buttonContainer.setSize(buttonImage.width,buttonImage.height);
			buttonContainer.setInteractive();
			buttonContainer.buttonIndex = index;
			buttonContainer.on('pointerdown',()=>{
				sound.play("pop");
				buttonContainer.disableInteractive();
				this.activateBottomBarButton(buttonContainer.buttonIndex);
				gameUtils.scaleButton(buttonContainer,()=>{
					buttonContainer.setInteractive();
				});
			})
		})

	}

	activateBottomBarButton(buttonIndex){
		this.bottomBar.list.forEach((button,index)=>{
			if(index == buttonIndex)
				button.list[0].setFrame('Btn_orange_inactive');
			else
				button.list[0].setFrame('Btn_orange_active');
		})
	}

	createFade(){
		this.whiteFade = this.add.rectangle(screen.centerX,screen.centerY,screen.width * 3,screen.height,0xffffff)
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
				this.animateBottomBar();
			}
		})
	}

	restartAssets(){
		this.bottomBar.list.forEach((button,index)=>{
			button.setScale(0);
		});
	}

	animateBottomBar(){
		this.bottomBar.list.forEach((button,index)=>{
			this.tweens.add({
				targets:button,
				scale:1,
				duration:500,
				delay:index * 100,
				ease:'Back.easeOut'
			})
		})
	}
}