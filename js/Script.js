class Slider{
	constructor(wrapper){
		this.slider_wrapper=wrapper;
		this.HOLD_TIME=1000;
		this.TRANSITION_SPEED=1; 
		
		this.image_roll=document.getElementById("slider");
		this.images=this.image_roll.children;
		this.IMAGE_NUM=this.images.length;

		this.IMAGE_HEIGHT=this.images[0].clientHeight;
		this.IMAGE_WIDTH=this.images[0].clientWidth;

		this.image_roll.style.width=this.IMAGE_NUM*this.IMAGE_WIDTH + "px";
		
		
		this.slider_wrapper.style.height=this.IMAGE_HEIGHT+"px";
		
		this.interval=null

		this.new_index=1;
		this.current_index=0;
		this.current_margin_left=0;
	
		this.right_button=null;
		this.left_button=null;
	
		this.indicators=[];

		this.renderArrows();
		// this.renderIndicators();
	}

	slide(){
		this.toggleButtons(false)
		let slide_rate=((this.IMAGE_WIDTH*(this.current_index-this.new_index))/(this.IMAGE_WIDTH/this.TRANSITION_SPEED));
		this.interval=setInterval(function(){
			if(Math.abs(slide_rate)>(this.IMAGE_WIDTH  - Math.abs(this.current_margin_left)%this.IMAGE_WIDTH)){
				slide_rate=this.current_margin_left-(this.new_index*this.IMAGE_WIDTH);
			}
			this.current_margin_left=this.current_margin_left+slide_rate;
			this.image_roll.style.marginLeft=this.current_margin_left+ "px";
			if(Math.abs(this.current_margin_left)==(this.new_index*this.IMAGE_WIDTH)){
				console.log("Hold the door");
				this.toggleButtons(true);
				this.holdAnimation();
			}		
		}.bind(this),1);
	}

	holdAnimation(){
		clearInterval(this.interval);
		this.current_index=this.new_index;
			if(this.new_index==(this.IMAGE_NUM-1)){
			this.new_index=0;
		}else{
			this.new_index=this.new_index+1;
		}
		this.timeout=setTimeout(function(){
			this.slide();
		}.bind(this),this.HOLD_TIME);
	}

	toggleButtons(flag){
		if(flag==true){
			this.left_button.style.pointerEvents='auto';
			this.right_button.style.pointerEvents='auto';
			this.indicators.forEach(function(box){
				box.style.pointerEvents='auto';
			})
		}else{
			this.left_button.style.pointerEvents='none';
			this.right_button.style.pointerEvents='none';
			this.indicators.forEach(function(box){
				box.style.pointerEvents='none';
			})		
		}				
	}

	// renderIndicators(){
	// 	var slider_indicator=document.createElement("div");
	// 	slider_indicator.id="slider_indicator";

	// 	var indicator_ul = document.createElement("ul");
	// 	indicator_ul.className='clearfix';
	// 	indicator_ul.id='box';
	// 	slider_indicator.appendChild(indicator_ul);
	// 	this.slider_wrapper.appendChild(slider_indicator);

	// 	for(var j=0;j<this.IMAGE_NUM;j++){
	// 		var pointer=document.createElement("li");
	// 		var clickable=document.createElement("a");
	// 		clickable.className='indi';
	// 		clickable.href="#";
	// 		clickable.id=j;
	// 		indicator_ul.appendChild(pointer);
	// 		pointer.appendChild(clickable);
	// 		this.indicators.push(clickable);
	// 	}

	// 	slider_indicator.addEventListener('click',function(e){
	// 		if(e.target.className=='indi'){
	// 			clearTimeout(this.timeout);
	// 			clearInterval(this.interval);
	// 			this.new_index=Number(e.target.id);
	// 			console.log(this.new_index);
	// 			this.slide();
	// 		}
	// 	}.bind(this))
	
	// }

	renderArrows(){
		var buttons_overlay=document.createElement("div");
		buttons_overlay.className="buttons_overlay";
		this.slider_wrapper.appendChild(buttons_overlay);

		this.left_button=document.createElement("a");
		this.left_button.id="left_slide_button";
		this.left_button.innerHTML="<";
		this.left_button.href="javascript:void(0)";

		this.right_button=document.createElement("a");
		this.right_button.id="right_slide_button";
		this.right_button.innerHTML=">";
		this.right_button.href="javascript:void(0)";
		
		buttons_overlay.appendChild(this.right_button);
		buttons_overlay.appendChild(this.left_button);

		buttons_overlay.addEventListener('click',function(e){
			clearInterval(this.interval);
			clearTimeout(this.timeout);
			var target=e.target.id;
				if(target=='left_slide_button'){
					this.new_index=this.current_index-1;
				}
				if(target=='right_slide_button'){
					this.new_index=this.current_index+1;
				}
				if(this.new_index==-1){
					this.new_index=this.IMAGE_NUM-1;
				}else if(this.new_index==this.IMAGE_NUM){
					this.new_index=0;
				}
				this.slide();
		}.bind(this))

	}

}

var slider_wrapper=document.getElementById("slider-wrapper");
let slider=new Slider(slider_wrapper);
slider.slide();