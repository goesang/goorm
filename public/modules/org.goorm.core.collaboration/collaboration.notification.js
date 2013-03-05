/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the AGPL v3 License:
 * http://www.goorm.io/intro/License
 * project_name : goormIDE
 * version: 1.0.0
 **/
 
org.goorm.core.collaboration.notification = {
	dialog: null,
	is_init: false,

	init : function(){
		var self = this;
		
		this.buttons = [
			// {
				// text : "<span localization_key='send'>Send</span>",
				// handler : function(){
					// if(core.module.layout.inner_layout.getUnitByPosition("right")._collapsed){
	 					// core.module.layout.inner_layout.getUnitByPosition("right").expand();
	 				// }
				// }
			// },
			{
				text : "<span localization_key='close'>Close</span>",
				handler : function(){
					self.hide();
				}
			}
		]
		
		
		this.dialog = org.goorm.core.collaboration.notification.dialog;
		this.dialog.init({
			localization_key:"title_notification",
			title: "Notification",
			path : "configs/dialogs/org.goorm.core.collaboration/collaboration.notification.html",
			width : 300,
			height : 100,
			buttons : this.buttons,
			draggable : true,
			effect: {effect:YAHOO.widget.ContainerEffect.FADE, duration:2},
			success : function(){
				$('.notification_content_show_button').click(function(){
					$('.communication_notification_container').parent().parent().animate({'height':'180px'}, 500);
					
					$('.notification_content_area').slideDown(500, function(){
						$('.notification_content_show_button').hide();
						$('.notification_content_hide_button').show();
					});
				});

				$('.notification_content_hide_button').click(function(){
					$('.communication_notification_container').parent().parent().animate({'height':'25px'}, 500);

					$('.notification_content_area').slideUp(500, function(){
						$('.notification_content_hide_button').hide();
						$('.notification_content_show_button').show();
					});
				});
				
			}
		});
		
		this.dialog = this.dialog.dialog;
	},
	
	notify : function(data){
		var name = data.split(':')[0];
		var content = data.split(':')[1];
		
		$('.notification_partner_area').find('.partner_name').html(" " + name);
		$('.notification_content_area').append('<div class="notification_content">'+ data +'</div>');
		
		var room = $('.notification_content_area');
		$(room).scrollTop(room.height());
	},
	
	show : function(){
		this.dialog.panel.show();
		if(!this.is_init){
			this.dialog.panel.cfg.setProperty('xy', [$(window).width()-350, $(window).height()-250]);
			this.is_init = true;
		}
	},
	
	hide : function(){
		this.dialog.panel.hide();
	}
}