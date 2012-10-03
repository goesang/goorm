/**
 * Copyright Sung-tae Ryu. All rights reserved.
 * Code licensed under the GPL v2 License:
 * http://www.goorm.org/License
 **/

org.goorm.core.project._export = function () {
	this.dialog = null;
	this.buttons = null;
	this.tabview = null;
	this.project_list = null;
};

org.goorm.core.project._export.prototype = {
	init: function () { 
	
		var self = this;
		
		var handle_ok = function() { 

			var data = self.project_list.get_data();

			if(data.path=="" || data.name=="") {
				//alert.show(core.module.localization.msg["alertFileNameEmpty"]);
				alert.show("Not Selected.");
				return false;
			}

			var postdata = {
				user: core.user.first_name+"_"+core.user.last_name,
				project_path: data.path,
				project_name: data.name
			};
								
			$.get("project/export", postdata, function (data) {
				if (data.err_code == 0) {
					self.dialog.panel.hide();
					
					var downloaddata = {
						file: data.path	
					};
					
					location.href = "download/?file="+data.path;
				}
				else {
					alert.show(data.message);
				}
			});
			
		};

		var handle_cancel = function() { 
			
			this.hide(); 
		};
		
		this.buttons = [ {text:"OK", handler:handle_ok, isDefault:true},
						 {text:"Cancel",  handler:handle_cancel}]; 
						 
		this.dialog = new org.goorm.core.project._export.dialog();
		this.dialog.init({
			title:"Export", 
			path:"configs/dialogs/org.goorm.core.project/project._export.html",
			width:800,
			height:500,
			modal:true,
			yes_text:"Open",
			no_text:"Cancel",
			buttons:this.buttons,
			success: function () {
				var resize = new YAHOO.util.Resize("project_export_dialog_left", {
		            handles: ['r'],
		            minWidth: 250,
		            maxWidth: 400
		        });
				
		        resize.on('resize', function(ev) {
					var width = $("#project_export_dialog_middle").width();
		            var w = ev.width;
		            $("#project_export_dialog_center").css('width', (width - w - 9) + 'px');
		        });
			}
		});
		this.dialog = this.dialog.dialog;
		
		this.project_list = new org.goorm.core.project.list;
	},

	show: function () {
		this.project_list.init("#project_export");
		this.dialog.panel.show();
	}
};