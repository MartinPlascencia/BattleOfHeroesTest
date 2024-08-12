class loginScene extends Phaser.Scene{

	constructor(){
		super("LoginScene");
	}

	preload(){

		gameUtils.setGame(this);
		this.load.plugin('rexbbcodetextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js', true);
		this.load.plugin('rextexteditplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js', true);
	}

	create(){
		
		sound.decode(assetsManager.getGameAssets().assets.soundsList,this)
		this.createBackground();
		this.createLogin();
		this.createInitialButtons();
		this.createFade();
		this.show();
	}

	createBackground(){

		let backgroundColor = this.add.rectangle(screen.centerX,screen.centerY,screen.width,screen.height,0x2e383b);
		
		let background = this.add.image(screen.centerX,screen.centerY,'loginBackground').setAlpha(0.5);
		let originalHeight = background.displayHeight;
		if(background.displayHeight < screen.height){
			background.displayHeight = screen.height;
			background.displayWidth = (background.displayHeight * background.displayWidth) / originalHeight;
		}
	}

	createLogin(){

		this.loginButton = this.add.container(screen.centerX,screen.centerY + 150);

		let buttonImage = this.add.image(0,0,'assets','Green_Btn1').setScale(2.5,2);
		this.loginButton.add(buttonImage);

		let buttonText = this.add.bitmapText(0,0,'grobold','Continue',30,1);
		buttonText.setOrigin(0.5);
		this.loginButton.add(buttonText);

		this.loginButton.setSize(buttonImage.width * buttonImage.scaleX,buttonImage.height * buttonImage.scaleY);
		this.loginButton.setInteractive();
		this.loginButton.on('pointerdown',()=>{
			sound.play("pop");
			this.loginButton.disableInteractive();
			localStorage.clear();
			gameConfig.setPlayerInfoProperty('playerName',this.inputField.text);
			this.goToMapScene();
			gameUtils.scaleButton(this.loginButton,()=>{
				this.loginButton.setInteractive();
			});
		});
		this.loginButton.setAlpha(0);

		this.createLoginInputField();
	}

	createLoginInputField(){
		let charactersLimit = 10;
		this.inputField = this.add.rexBBCodeText(screen.centerX, screen.centerY - 50, 'Enter Name', {
			fontFamily: 'Calibri',
            color: 'black',
            fontSize: '35px',
            fixedWidth: 300,
            fixedHeight: 100,
            backgroundColor: '#ffffff',
            valign: 'center',
			halign: 'center',
            //rtl: true
        })
        this.inputField.setOrigin(0.5)
        this.inputField.setInteractive()
        this.inputField.on('pointerdown', ()=> {
			var config = {
				onOpen: (textObject)=> {
					console.log('Open text editor');
				},
				onTextChanged: (textObject, text)=> {
					if (text.length > charactersLimit)
						text = text.substring(0, charactersLimit);
					textObject.text = text;
				},
				onClose: (textObject)=> {
					if (textObject.text === ''){
						textObject.text = 'Enter Name';
						if(this.loginButton.alpha != 0){
							this.tweens.add({
								targets:this.loginButton,
								alpha:0,
								duration:500,
								ease:'Linear'
							});
						}
					}else if(textObject.text != 'Enter Name'){
						if(this.loginButton.alpha == 0){
							this.tweens.add({
								targets:this.loginButton,
								alpha:1,
								duration:500,
								ease:'Linear'
							});
						}
					}
				},
				selectAll: true,
				// enterClose: false
			}
			this.plugins.get('rextexteditplugin').edit(this.inputField, config);
		}, this);
		this.inputField.setScale(0);
	}

	showInputField(){
		this.tweens.add({
			targets:this.inputField,
			scale:1,
			duration:300,
			ease:'Back.easeOut'
		})
	}




	createInitialButtons(){

		this.intitialButtons = [];
		this.createUserButton = this.add.container(screen.centerX,screen.centerY + 150);

		let buttonImage = this.add.image(0,0,'assets','Green_Btn1').setScale(3,2);
		this.createUserButton.add(buttonImage);

		let buttonText = this.add.bitmapText(0,0,'grobold','Create New User',30,1);
		buttonText.setOrigin(0.5);
		this.createUserButton.add(buttonText);

		this.createUserButton.setSize(buttonImage.width * buttonImage.scaleX,buttonImage.height * buttonImage.scaleY);
		this.createUserButton.setInteractive();
		this.createUserButton.on('pointerdown',()=>{
			this.createUserButton.disableInteractive();
			sound.play("pop");
			this.showInputField();
			gameUtils.scaleButton(this.createUserButton,()=>{
				this.hideInitialButtons();
				this.createUserButton.setInteractive();
			});
		});
		this.intitialButtons.push(this.createUserButton);

		this.continueButton = this.add.container(this.createUserButton.x,this.createUserButton.y + 100);

		buttonImage = this.add.image(0,0,'assets','Orange_btn').setScale(3.5,2);
		this.continueButton.add(buttonImage);

		buttonText = this.add.bitmapText(0,0,'grobold','Continue',30,1);
		buttonText.setOrigin(0.5);
		this.continueButton.add(buttonText);

		this.continueButton.setSize(buttonImage.width * buttonImage.scaleX,buttonImage.height * buttonImage.scaleY);
		this.continueButton.setInteractive();
		this.continueButton.on('pointerdown',()=>{
			sound.play("pop");
			this.continueButton.disableInteractive();
			gameUtils.scaleButton(this.continueButton,()=>{
				this.goToMapScene();
			});
		});
		if(gameConfig.getPlayerInfoProperty('playerName') == null){
			this.continueButton.setAlpha(0.5);
			this.continueButton.disableInteractive();
			buttonImage.setScale(2.5,2);
		}else{
			let playerName = gameConfig.getPlayerInfoProperty('playerName');
			if(playerName.length > 7)
				playerName = playerName.substring(0,7) + '.';
			buttonText.text = 'Continue as ' + playerName;
		}
		this.intitialButtons.push(this.continueButton);

		this.intitialButtons.forEach((button)=>{
			button.setScale(0);
		});
	}

	update(timer,delta){

	
	}

	createFade(){
		this.whiteFade = this.add.rectangle(screen.centerX,screen.centerY,screen.width,screen.height,0xffffff)
		//this.sceneGroup.add(this.whiteFade)
	}

	goToMapScene(){
		this.tweens.add({
			targets:this.whiteFade,
			alpha:1,
			duration:350,
			onComplete:()=>{
				this.scene.start("MapScene");
			}
		});
	}

	show(){
		this.animateScene();
	}

	animateInitialButtons(){
		this.time.delayedCall(500,()=>{
			sound.play("bucket");
			this.intitialButtons.forEach((button,index)=>{
				this.tweens.add({
					targets:button,
					scale:1,
					delay:200 * index,
					duration:400,
					ease:'Back.easeOut',
				});
			});
		});
	}

	hideInitialButtons(){
		this.intitialButtons.forEach((button,index)=>{
			button.disableInteractive();
			this.tweens.add({
				targets:button,
				scale:0,
				delay:200 * index,
				duration:400,
				ease:'Back.easeIn',
			});
		});
	}

	animateScene(){
		this.whiteFade.alpha = 1;
		//this.addCoins(1000,this.titleScreen);
		this.animateInitialButtons();
		this.tweens.add({
			targets:this.whiteFade,
			alpha:0,
			duration:350,
			onComplete:()=>{

			}
		})
	}
}