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

		this.confetti = this.add.particles(0, 0, 'assets', {
			frame:['confetti_red','confetti_yellow','confetti_blue','confetti_green'],
            x: { random: [ 0,screen.width ] },
			y:-200,
            lifespan: 3000,
            gravityY: 400,
            frequency: 120,
            scale: { min: 0.3, max: 0.8 },
			angle: { min: 0, max: 360 },
			rotate:{start:0,end:450},
			accelerationY:{min:100,max:300},
			speedX:{min:-100,max:100},
        });
		this.confetti.stop();

		this.leafParticles = this.add.particles(0, 0, 'assets', {
			frame:['leaf'],
            x: { random: [ 0,screen.width ] },
			y:-200,
            lifespan: 3000,
            gravityY: 50,
            frequency: 60,
            scale: { min: 0.3, max: 0.6 },
			angle: { min: 0, max: 360 },
			rotate:{start:0,end:450},
			accelerationY:{min:100,max:300},
			speedX:{min:-100,max:100},
        });
		this.leafParticles.start();

		this.createFade();

	};

	create(){
		
		//sound.decode(assetsManager.getGameAssets().assets.soundsList,this)

		this.createBackground();
		this.createBlackFade();
		this.createHeroes();
		this.createUI();
		this.addParticles();
		this.show();
	}

	createBackground(){

		this.backgroundGroup = this.add.container()

		let backgroundKey = 'Background' + this.currentMilestone.background;

		let backgroundSky = this.add.tileSprite(0,0,screen.width,this.textures.get(backgroundKey + 'Layer04').height,
			backgroundKey + 'Layer04' ).setOrigin(0,0);
		this.backgroundGroup.add(backgroundSky);
		this.backgroundGroup.sky = backgroundSky;

		let ground = this.add.tileSprite(0,screen.height,screen.width,this.textures.get(backgroundKey + 'Layer01').height,
			backgroundKey + 'Layer01' ).setOrigin(0,1);

		let ground2 = this.add.tileSprite(0,ground.y - ground.displayHeight * 0.8,screen.width,this.textures.get(backgroundKey + 'Layer02').height,
			backgroundKey + 'Layer02' ).setOrigin(0,1);

		let ground3 = this.add.tileSprite(0,ground2.y,screen.width,this.textures.get(backgroundKey + 'Layer03').height,
			backgroundKey + 'Layer03' ).setOrigin(0,1);

		this.backgroundGroup.add([ground3,ground2,ground]);



	}

	createCharacterAnimations(characterData){
		characterData.animationFrames.forEach((animationData)=>{
			if(this.anims.exists(characterData.name + animationData.name)) return;
			this.anims.create({
				key:characterData.name + animationData.name,
				frames:this.anims.generateFrameNumbers(characterData.name,{start:animationData.start,end:animationData.end}),
				frameRate:24,
				repeat:animationData.repeat,
			});
		})
	}

	createHeroes(){
		this.heroesGroup = this.add.container();
		this.enemiesGroup = this.add.container();

		this.heroesList = gameConfig.getHeroesCharacters();
		this.enemiesList = gameConfig.getEnemiesCharacters();

		this.heroesOffset = 200;
		let heroesPositionY = screen.height - 155;

		for(let i = 0; i < this.currentMilestone.numberOfEnemies; i++){
			let heroData = this.heroesList[0];
			this.createCharacterAnimations(heroData);

			let hero = this.add.sprite(screen.centerX - ((i + 1)* this.heroesOffset),heroesPositionY + heroData.offset,heroData.name).setScale(-1.5,1.5).setOrigin(0.5,1);
			hero.characterName = heroData.name;
			hero.health = heroData.health;
			hero.attackNumber = heroData.attack;
			hero.play(hero.characterName + "Idle");
			this.heroesGroup.add(hero);

			let enemyData = this.enemiesList[0];
			this.createCharacterAnimations(enemyData);

			let enemy = this.add.sprite(screen.centerX + ((i + 1)* this.heroesOffset),heroesPositionY + enemyData.offset,enemyData.name).setScale(1.5).setOrigin(0.5,1);
			enemy.health = enemyData.health;
			enemy.characterName = enemyData.name;
			enemy.attackNumber = enemyData.attack;
			enemy.play(enemy.characterName + "Idle");
			this.enemiesGroup.add(enemy);
		}
		
		this.heroesGroup.currentIndex = 0;
		this.enemiesGroup.currentIndex = 0;
	}

	createUI(){

		let uiPositionY = 100;
		let offsetBars = 145
		this.vsText = this.add.image(screen.centerX,uiPositionY,'assets','Vs').setScale(0.75);

		this.heroesHealthBar = this.add.container(screen.centerX - offsetBars,uiPositionY);

		let playerText = this.add.bitmapText(-125,-65,'grobold','PLAYER',25).setOrigin(0.5);
		this.heroesHealthBar.add(playerText);

		let heroHealthBar = this.add.image(0,0,'assets','Green_Bar_Bg').setOrigin(1,0.5);
		this.heroesHealthBar.add(heroHealthBar);

		let heroGreenBar = this.add.image(-4,-4,'assets','Green_Bar').setOrigin(1,0.5);
		this.heroesHealthBar.add(heroGreenBar);
		this.heroesHealthBar.greenBar = heroGreenBar;

		let heroIcon = this.add.image(0,0,'assets','character01Icon').setOrigin(0.5).setScale(0.75);
		this.heroesHealthBar.add(heroIcon);
		this.heroesHealthBar.icon = heroIcon;

		this.enemiesHealthBar = this.add.container(screen.centerX + offsetBars,uiPositionY).setScale(-1,1);

		let enemyText = this.add.bitmapText(-125,-65,'grobold','COMPUTER',25).setOrigin(0.5).setScale(-1,1);
		this.enemiesHealthBar.add(enemyText);

		let enemyHealthBar = this.add.image(0,0,'assets','Green_Bar_Bg').setOrigin(1,0.5);
		this.enemiesHealthBar.add(enemyHealthBar);

		let enemyGreenBar = this.add.image(4,-4,'assets','Green_Bar').setOrigin(1,0.5);
		this.enemiesHealthBar.add(enemyGreenBar);
		this.enemiesHealthBar.greenBar = enemyGreenBar;

		let enemyIcon = this.add.image(0,0,'assets','character02Icon').setOrigin(0.5).setScale(0.75);
		this.enemiesHealthBar.add(enemyIcon);
		this.enemiesHealthBar.icon = enemyIcon;

		this.heroesHealthBar.setScale(0);
		this.enemiesHealthBar.setScale(0);

		this.counterText = this.add.bitmapText(screen.centerX,screen.centerY - 75,'grobold','0',125).setOrigin(0.5).setScale(0).setTint(0xffc602);
	}

	setCounterAnimation(index,stay = false){
		this.counterText.text = index;
		this.counterText.alpha = 1;
		this.counterText.setScale(0);
		this.tweens.add({
			targets:this.counterText,
			scale:1,
			duration:500,
			ease:'Back.easeOut',
		});
		if(stay) 
			return;
		this.tweens.add({
			targets:this.counterText,
			alpha:0,
			duration:500,
			ease:'Back.easeOut',
			delay:400,
		})
	}

	startCounter(){

		let delay = 150;
		for(let i = 3; i > 0; i--){
			this.time.delayedCall(delay,()=>{
				sound.play("beep");
				this.setCounterAnimation(i);
			});
			delay += 1000;
		}

		this.time.delayedCall(delay,()=>{
			this.startBattle();
		});
	}

	startBattle(){

		this.setCounterAnimation('FIGHT!');

		this.startHealthBar(this.heroesHealthBar,this.heroesGroup.list[this.heroesGroup.currentIndex].characterName);
		this.startHealthBar(this.enemiesHealthBar,this.enemiesGroup.list[this.enemiesGroup.currentIndex].characterName,true);

		this.time.delayedCall(500,()=>{
			this.characterAttack(true);
		});
		
	}

	characterAttack(isHero){
		
		let hero = this.heroesGroup.list[this.heroesGroup.currentIndex];
		let enemy = this.enemiesGroup.list[this.enemiesGroup.currentIndex];

		let attacker = isHero ? hero : enemy;
		let target = isHero ? enemy : hero;
		attacker.play(attacker.characterName + "Attack").once('animationcomplete', () => {
			attacker.play(attacker.characterName + "Idle");
		 });

		this.tweens.add({
			targets:attacker,
			x:attacker.x + (isHero ? 100 : -100),
			duration:300,
			yoyo:true,
		});

		this.time.delayedCall(600,()=>{
			this.setHealthBar(attacker,target,isHero);
		});

	}

	setHealthBar(attacker,target,isHero){
		
		let firstHit = Phaser.Math.Between(0, 5) > 3;
		sound.play(firstHit ? "explode" : "flesh");
		let targetBar = isHero ? this.enemiesHealthBar.greenBar : this.heroesHealthBar.greenBar;

		target.play(target.characterName + "Hit");

		let particlesNames = firstHit ? "bomb" : "punchHit"
		gameUtils.showSpriteParticles(particlesNames,target,0.75,null,{x:0,y:-100});

		target.health -= attacker.attackNumber;

		let scaleValue = target.health / 100;
		scaleValue = scaleValue < 0 ? 0 : scaleValue;
		this.tweens.add({
			targets:targetBar,
			scaleX:scaleValue,
			duration:500,
		});

		if(target.health <= 35)
			targetBar.setFrame('Red_Bar');

		this.whiteFade.alpha = 1;
		this.tweens.add({
			targets:this.whiteFade,
			alpha:0,
			duration:350,
		});

		this.cameras.main.shake(200,0.005);

		if(target.health <= 0){
			this.time.delayedCall(1000,()=>{
				this.characterDeath(!isHero);
			});
		}else{
			this.time.delayedCall(1000,()=>{
				this.characterAttack(!isHero);
			});
		}
	}

	characterDeath(isHero){
		
		sound.play("zombieUp");
		let target = isHero ? this.heroesGroup.list[this.heroesGroup.currentIndex] : this.enemiesGroup.list[this.enemiesGroup.currentIndex];
		target.play(target.characterName + "Die");

		this.tweens.add({
			targets:target,
			alpha:0,
			duration:500,
			delay: 500,
			onComplete:()=>{
				this.nextCharacter(isHero);
			},
		});

	}

	nextCharacter(isHero){
		let newAttacker;
		if(isHero){
			this.heroesGroup.currentIndex++;
			if(this.heroesGroup.currentIndex >= this.heroesGroup.list.length){
				this.heroesGroup.currentIndex = 0;
				this.gameEnded(!isHero);
				return;
			}
			newAttacker = this.heroesGroup.list[this.heroesGroup.currentIndex];
		}else{
			this.enemiesGroup.currentIndex++;
			if(this.enemiesGroup.currentIndex >= this.enemiesGroup.list.length){
				this.enemiesGroup.currentIndex = 0;
				this.gameEnded(!isHero);
				return;
			}
			newAttacker = this.enemiesGroup.list[this.enemiesGroup.currentIndex];
		}

		let charactersGroup = isHero ? this.heroesGroup : this.enemiesGroup;
		charactersGroup.list.forEach((character)=>{
			character.play(character.characterName + "Walk");
		});
		this.startHealthBar(isHero ? this.heroesHealthBar : this.enemiesHealthBar,newAttacker.characterName,!isHero);
		this.tweens.add({
			targets:charactersGroup,
			x:isHero ? charactersGroup.x + this.heroesOffset : charactersGroup.x - this.heroesOffset,
			duration:1000,
			onComplete:()=>{
				charactersGroup.list.forEach((character)=>{
					character.play(character.characterName + "Idle");
				});
				this.time.delayedCall(500,()=>{
					this.characterAttack(isHero);
				});
			}
		});

		
	}

	gameEnded(isHero){

		sound.stopSong();
		this.leafParticles.stop();
		this.tweens.add({
			targets:this.blackFade,
			alpha:0.6,
			duration:300,
		});
		if(isHero){
			
			sound.play("winwin");
			this.confetti.start();
			this.setCounterAnimation('WIN!',true);
			this.currentMilestone.stars = 3;
			let currentMilestone = gameConfig.getMapProperty('currentMilestone');
			currentMilestone++;
			let milestones = gameConfig.getMapProperty('milestones');
			if(milestones.length > currentMilestone)
				milestones[currentMilestone].unlocked = true;
			gameConfig.setMapProperty('currentMilestone',currentMilestone);
		}else{
			sound.play("gameLose");
		}

		this.time.delayedCall(4000,()=>{
			this.tweens.add({
				targets:this.whiteFade,
				alpha:1,
				duration:500,
				onComplete:()=>{
					this.scene.start("MapScene");
				}
			});
		});
		
	}

	startHealthBar(bar,iconName, isEnemy = false ){
		sound.play("Game_Start");
		let scaleValue = isEnemy ? -1 : 1;
		this.tweens.add({
			targets:bar,
			scaleX:{from:0,to:scaleValue},
			scaleY:1,
			ease:'Back.easeOut',
			duration:500,
		});

		this.tweens.add({
			targets:bar.greenBar,
			scaleX:{from:0,to:1},
			duration:500,
		});

		bar.icon.setFrame(iconName + 'Icon');
		bar.greenBar.setFrame('Green_Bar');
	}


	update(timer,delta){

	
	}

	createFade(){
		this.whiteFade = this.add.rectangle(screen.centerX,screen.centerY,screen.width,screen.height,0xffffff)
		//this.sceneGroup.add(this.whiteFade)
	}

	createBlackFade(){
		this.blackFade = this.add.rectangle(screen.centerX,screen.centerY,screen.width,screen.height,0x000000)
		this.blackFade.alpha = 0;
	}

	show(){
		this.restartAssets();
		this.animateScene();
	}

	animateScene(){
		sound.playSong("fantasy_ballad");
		this.whiteFade.alpha = 1;
		//this.addCoins(1000,this.titleScreen);
		sound.setMusicVolume(0.3);
		this.tweens.add({
			targets:this.whiteFade,
			alpha:0,
			duration:350,
			onComplete:()=>{
				this.startCounter();
			}
		})
	}

	restartAssets(){
		this.score = 0;
	}
}