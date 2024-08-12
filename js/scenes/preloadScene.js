class preloaderIntro extends Phaser.Scene{

	constructor(){
		super("PreloaderIntro");
	}

	updateLoadingBar = (event)=>{
		if(this.logo){
			var loadingStep = (event.progress) * this.logo.displayHeight;
			var mask = this.maskUsed;
			mask.y = mask.initialY - loadingStep

			if(mask.y >= mask.endY && this.startButton.alpha == 0){
				if(gameConfig.getInfo().skipLoading){
					this.time.delayedCall(150,()=>{
						this.scene.start("LoginScene");
					})
				}else{
					this.tweens.add({
						targets:this.startButton,
						alpha:1,
						duration:500,
						onComplete:()=>{
							this.startButton.setInteractive();
						}
					})
				}
			}
		}
	}

	preload(){
		gameUtils.setGame(this)

		sceneloader.init(this)
		sceneloader.preload([assetsManager.getPreloadAssets()])

		gameUtils.checkOrientation()
		//this.setScreen()
		
	}

	create(){

		sound.decode(assetsManager.getPreloadAssets().assets.soundsList,this)

		let background = this.add.rectangle(screen.centerX,screen.centerY,screen.width,screen.height,0x33067a);

		let companyLogo = this.add.image(screen.centerX,screen.centerY + 85,'loadingAtlas','logoWarbler');

		let logo = this.add.image(screen.centerX,screen.centerY -150,'loadingAtlas','wIcon');
		let topLogo = this.add.image(logo.x,logo.y,'loadingAtlas','wIcon2');
		this.logo = topLogo;

		var mask = this.add.graphics()
		mask.fillStyle(0xffffff)
		mask.beginPath()
		mask.fillRect(topLogo.x - topLogo.displayWidth * 0.5, topLogo.y + topLogo.displayHeight * 0.5,topLogo.displayWidth,topLogo.displayHeight)
		mask.initialY = mask.y
		mask.endY = mask.initialY - topLogo.displayHeight
		this.maskUsed = mask;
		mask.alpha = 0

		var maskRect = mask.createGeometryMask()
		topLogo.setMask(maskRect)

		var btn = this.add.container(screen.centerX,companyLogo.y + 165)
		btn.alpha = 0;
		this.startButton = btn;

		var btnActive = this.add.sprite(0,0,'loadingAtlas','startBtn');
		btnActive.setOrigin(0.5);
		btn.add(btnActive);
		btn.on('pointerdown',function(button){
			sound.play("click")
			button.disableInteractive()
			gameUtils.scaleButton(button,function(){
				this.scene.start("LoginScene");
			}.bind(this))
			sound.play("click");

		}.bind(this,btn),this);
		btn.setSize(btnActive.width,btnActive.height);

		let buttonText = this.add.bitmapText(0,3,'futuraBold','Start Game',35,1).setOrigin(0.5).setTint(0x7f1111);
		btn.add(buttonText);

		sceneloader.preload([assetsManager.getGameAssets()], {onLoadFile: this.updateLoadingBar.bind(this)})
	}

}
