(function(a){a.each(["plugin","advanced"],function(){tinymce.ScriptLoader.add(tinymce.PluginManager.urls.mt+"/langs/"+this+".js")});tinymce.Editor.prototype.addMTButton=function(d,e){var c=this;var f={};var b=e.onclickFunctions;if(b){e.onclick=function(){var h=c.mtEditorStatus.mode;var g=b[h];if(typeof(g)=="string"){c.mtProxies[h].execCommand(g)}else{g.apply(c,arguments)}if(h=="source"){c.onMTSourceButtonClick.dispatch(c,c.controlManager)}};for(k in b){f[k]=1}}else{f={wysiwyg:1,source:1}}if(!e.isSupported){e.isSupported=function(i,h){if(!f[i]){return false}if(b&&i=="source"){var g=b[i];if(typeof(g)=="string"){return c.mtProxies.source.isSupported(g,h)}else{return true}}else{return true}}}if(typeof(c.mtButtons)=="undefined"){c.mtButtons={}}c.mtButtons[d]=e;return c.addButton(d,e)};tinymce.create("tinymce.ui.MTTextButton:tinymce.ui.Button",{renderHTML:function(){var e=tinymce.DOM;var f=this.classPrefix,d=this.settings,c,b;b=e.encode(d.label||"");c='<a role="button" id="'+this.id+'" href="javascript:;" class="mceMTTextButton '+f+" "+f+"Enabled "+d["class"]+(b?" "+f+"Labeled":"")+'" onmousedown="return false;" onclick="return false;" aria-labelledby="'+this.id+'_voice" title="'+e.encode(d.title)+'">';c+=d.text;c+="</a>";return c}});tinymce.create("tinymce.plugins.MovableType",{buttonSettings:"",initButtonSettings:function(b){var e=this;e.buttonIDs={};var d={source:{},wysiwyg:{}};var c=1;a.each(["common","source","wysiwyg"],function(h,f){var l="plugin_mt_"+f+"_buttons";for(var g=1;b.settings[l+g];g++){e.buttonSettings+=(e.buttonSettings?",":"")+b.settings[l+g];b.settings["theme_advanced_buttons"+c]=b.theme.settings["theme_advanced_buttons"+c]=b.settings[l+g];if(f=="common"){d.source[c-1]=d.wysiwyg[c-1]=1}else{d[f][c-1]=1}c++}});return d},init:function(m,b){var l=this;var c=m.id;var o=c.length;var i=a("#blog-id").val()||0;var j={};var n=[];var s=null;var f={};var q=this.initButtonSettings(m);m.mtProxies=j;m.mtEditorStatus={mode:"wysiwyg",format:"richtext"};function r(v,u){var t=v+"-"+u;if(!f[t]){f[t]={};a.each(m.mtButtons,function(w,x){if(x.isSupported(v,u)){f[t][w]=x}})}return f[t]}function d(){var t=m.mtEditorStatus;a.each(n,function(x,w){s.find(".mce_"+w).css({display:""}).removeClass("mce_mt_button_hidden");m.controlManager.setDisabled(this,false)});n=[];var u=r(t.mode,t.format);function v(w){if(!u[w]){s.find(".mce_"+w).css({display:"none"}).addClass("mce_mt_button_hidden");n.push(w)}}if(t.mode=="source"){j.source.setFormat(t.format);a.each(m.controlManager.controls,function(w,x){if(!x.classPrefix){return}v(w.substr(o+1))})}else{a.each(m.mtButtons,function(w,x){v(w)})}a("#"+c+"_toolbargroup > span > table").each(function(w){if(q[t.mode][w]){a(this).show()}else{a(this).hide()}})}function e(u,t){a.fn.mtDialog.open(ScriptURI+"?__mode="+u+"&amp;"+t)}function h(t){a.each(m.windowManager.windows,function(v,u){var x=u.iframeElement;a("#"+x.id).load(function(){var y=this.contentWindow;var w={"$contents":a(this).contents(),window:y};t(w,function(){y.tinyMCEPopup.close();if(tinymce.isWebKit){a("#convert_breaks").focus()}j.source.focus()})})})}function p(v,t){function u(){var w=a(this);j.source.execCommand("createLink",null,w.find("#href").val(),{target:w.find("#target_list").val(),title:w.find("#linktitle").val()});t()}v["$contents"].find("form").attr("onsubmit","").submit(u);if(!j.source.isSupported("createLink",m.mtEditorStatus.format,"target")){v["$contents"].find("#targetlistlabel").closest("tr").hide()}}m.onInit.add(function(){s=a(m.getContainer());d();m.theme.resizeBy(0,0)});m.addCommand("mtGetStatus",function(){return m.mtEditorStatus});m.addCommand("mtSetStatus",function(t){a.extend(m.mtEditorStatus,t);d()});m.addCommand("mtGetProxies",function(){return j});m.addCommand("mtSetProxies",function(t){a.extend(j,t)});m.addButton("mt_insert_html",{title:"mt.insert_html",onclick:function(){m.windowManager.open({file:b+"/insert_html.html",width:430,height:335,inline:1},{plugin_url:b})}});m.addMTButton("mt_insert_image",{title:"mt.insert_image",onclick:function(){e("dialog_list_asset","_type=asset&amp;edit_field="+c+"&amp;blog_id="+i+"&amp;dialog_view=1&amp;filter=class&amp;filter_val=image")}});m.addMTButton("mt_insert_file",{title:"mt.insert_file",onclick:function(){e("dialog_list_asset","_type=asset&amp;edit_field="+c+"&amp;blog_id="+i+"&amp;dialog_view=1")}});m.addMTButton("mt_source_bold",{title:"mt.source_bold",text:"strong",mtButtonClass:"text",onclickFunctions:{source:"bold"}});m.addMTButton("mt_source_italic",{title:"mt.source_italic",text:"em",mtButtonClass:"text",onclickFunctions:{source:"italic"}});m.addMTButton("mt_source_blockquote",{title:"mt.source_blockquote",text:"blockquote",mtButtonClass:"text",onclickFunctions:{source:"blockquote"}});m.addMTButton("mt_source_unordered_list",{title:"mt.source_unordered_list",text:"ul",mtButtonClass:"text",onclickFunctions:{source:"insertUnorderedList"}});m.addMTButton("mt_source_ordered_list",{title:"mt.source_ordered_list",text:"ol",mtButtonClass:"text",onclickFunctions:{source:"insertOrderedList"}});m.addMTButton("mt_source_list_item",{title:"mt.source_list_item",text:"li",mtButtonClass:"text",onclickFunctions:{source:"insertListItem"}});m.addMTButton("mt_source_link",{title:"mt.insert_link",onclickFunctions:{source:function(u,t,v){tinymce._setActive(m);this.theme._mceLink.apply(this.theme);h(p)}}});m.addMTButton("mt_source_mode",{title:"mt.source_mode",onclickFunctions:{wysiwyg:function(){m.execCommand("mtSetFormat","none.tinymce_temp")},source:function(){m.execCommand("mtSetFormat","richtext")}}});if(!m.onMTSourceButtonClick){m.onMTSourceButtonClick=new tinymce.util.Dispatcher(m)}var g={mt_source_bold:"bold",mt_source_italic:"italic",mt_source_blockquote:"blockquote",mt_source_unordered_list:"insertUnorderedList",mt_source_ordered_list:"insertOrderedList",mt_source_list_item:"insertListItem",mt_source_link:"createLink"};a.each(g,function(u,t){if(l.buttonSettings.indexOf(u)==-1){delete stateControls[u]}});m.onMTSourceButtonClick.add(function(u,t){a.each(g,function(v,w){t.setActive(v,u.mtProxies.source.isStateActive(w))})});m.onNodeChange.add(function(v,t,z,y,u){var w=v.mtEditorStatus;if(v.mtEditorStatus.mode=="source"&&v.mtEditorStatus.format!="none.tinymce_temp"){a("#"+c+"_mt_source_mode").css("display","none")}else{a("#"+c+"_mt_source_mode").css("display","")}var x=v.mtEditorStatus.mode=="source"&&v.mtEditorStatus.format=="none.tinymce_temp";t.setActive("mt_source_mode",x);if(!v.mtProxies.source){return}a.each(g,function(A,B){t.setActive(A,v.mtProxies.source.isStateActive(B))})})},createControl:function(d,b){var g=b.editor;var h=g.buttons[d];if((d=="mt_insert_image")||(d=="mt_insert_file")){if(!this.buttonIDs[d]){this.buttonIDs[d]=[]}var i=d+"_"+this.buttonIDs[d].length;this.buttonIDs[d].push(i);return b.createButton(i,a.extend({},h,{"class":"mce_"+d}))}if(h&&h.mtButtonClass){var f,c,e;switch(h.mtButtonClass){case"text":c=tinymce.ui.MTTextButton;break;default:throw new Error("Not implemented:"+h.mtButtonClass)}if(b._cls.button){e=b._cls.button}b._cls.button=c;f=b.createButton(d,a.extend({},h));if(e!=="undefined"){b._cls.button=e}return f}return null},getInfo:function(){return{longname:"MovableType",author:"Six Apart, Ltd",authorurl:"",infourl:"",version:"1.0"}}});tinymce.PluginManager.add("mt",tinymce.plugins.MovableType)})(jQuery);