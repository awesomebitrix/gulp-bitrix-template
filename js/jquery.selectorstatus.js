(function($){
    $.fn.selectorstatus = function(options){
            options = $.extend({
                    SelectCallBack:null, //callback, когда выбран статус
                    OpenCallBack:null, //callback when open popup 
                    CloseCallBack: null, //callback when close popup 
                    SelectedStatus: null,// list of selected statuses recive as object.ID
                    AllStatus: null, // list of all statuses recive as group object.ID & object.NAME
                    NameCheckBox: 'status', // name for checkbox
                    SummaryOut: true, // out put Number or String
                    InputSelector: null, // Type ID in [input]
                    Lang: 
                            {
                                title   : "TITLE",
                                btnok   : "OK",
                                choose  : "pls click to choose",
                                choosed : "choosed",
                                all     : "all choosed"
                            }
                }, options);
                    new CreateWin(this, options);

            return this;
    }
    var CreateWin = function(elem, options){this.init(elem, options);}
    CreateWin.prototype = {
        init :	function(elem, options)
        {		
            var UniqidNameDiv = options.NameCheckBox+'_'+Math.floor(Math.random()* 1000000);
            this.Binded(elem,UniqidNameDiv,this, options);
            this.DrawLineInDiv(elem, UniqidNameDiv, options);

        },	
        DrawLineInDiv : function(elem, name, options)
        {
            var ChoosedStatus = 0 ;
            var AllStatus = 0;
            var arhtml = new Array();
            var arSS   = new Array();
            if(options.SelectedStatus!==null)
            {
                for(k in options.AllStatus)
                {
                    AllStatus ++;
                    if(options.SelectedStatus[k]===true)
                    {
                        arhtml [arhtml.length] = options.AllStatus[k];
                        ChoosedStatus++;
                        arSS[arSS.length] = k;
                    }
                }
            }
            if(options.InputSelector!==null)
                $(options.InputSelector).val(arSS.join(","));
            
            if(ChoosedStatus==AllStatus)
                var SelAll = options.Lang.all;
            else
                var SelAll = options.Lang.choosed+" "+ChoosedStatus;
            
            
            if( ( ChoosedStatus>0  && options.SummaryOut === false ) || ChoosedStatus==1 )
                var strhtml = arhtml.join(', ');
            else if ( ChoosedStatus>1 && options.SummaryOut === true) 
                var strhtml = SelAll;
            else
                var strhtml = options.Lang.choose;

            $(elem).html(strhtml);
        },
        Binded : function(elem, name, thiser, options)
        {
            elem.bind("click.myclick",function(e){
                    thiser.MakeWindow(elem,name,thiser, options,e);
                    });
        } ,
        Bindclose :   function(elem, DivId , thiser, options)
        {
            $("."+DivId+"close").each(function()
            {	
                $(this).bind("click.myclick",function(){
                thiser.CloseWindow(elem,  DivId, thiser, options);
                });
            });
        },
        BindLiLabel : function(elem, DivId, thiser, options)
        {
            $(".WinFloatSelector li label").each(function()
            {
                $(this).bind("click.SelectClick",function()
                {
                    var lname = DivId.length;
                    var Idlabel = $(this).attr('id');
                    var	iID = Idlabel.substr((lname+1));

                    var Switcher = false;
                    if($(this).hasClass('active'))
                    {
                        Switcher = false;
                        if(options.SelectedStatus===null)
                            options.SelectedStatus = {};
                        delete options.SelectedStatus[iID];
                        $(this).removeClass('active');
                    }
                    else
                    {  
                        if(options.SelectedStatus===null)
                            options.SelectedStatus = {};
                        options.SelectedStatus[iID] = true;
                        Switcher = true;
                        $(this).addClass('active');
                    }  
                    thiser.DrawLineInDiv(elem,DivId, options);
                    if(options.SelectCallBack!==null)
                        options.SelectCallBack(iID,Switcher);
                });
            });
        },
        CloseWindow : function(elem, DivId, thiser, options)
        {
            $("."+DivId+"close").unbind("click.myclick");
            $('#'+DivId).remove();
            if(options.CloseCallBack!==null)
                    options.CloseCallBack();
            thiser.Binded(elem, DivId, thiser, options);
        },
        MakeWindow : function(elem, name, thiser, options,e)
        {	
                var left = e.pageX;
                var top  = e.pageY;
                elem.unbind("click.myclick");
                var closeName = name+"close";
                console.log(options.SelectedStatus);
                html = 	'<div class="WinFloatSelector" id="'+name+'">'+
                            '<h3>'+options.Lang.title+'</h3>'+
                            '<div class="WinFloatUIDiag">'+
                                '<ul>';
                        for(k in options.AllStatus)
                        {
                                html += "<li>";
                                html += '<input type="checkbox" ';
                                html += 'name="'+options.NameCheckBox+'"';
                                html += 'value="'+k+'"';
                                html += 'id="'+name+'_'+k+'">';
                                html += '<label for="'+name+'_'+k+'" id="'+name+'_'+k+'" '+( (options.SelectedStatus!==null) && (options.SelectedStatus[k]===true)?'class="active"':'')+'>'+options.AllStatus[k]+'</label>';
                                html += '</li>';
                        }
                html +=         '</ul>'+
                            '</div>'+
                            '<div class="button">'+
                                '<input type="button" class="'+closeName+'" value="'+options.Lang.btnok+'">'+
                            '</div>'+
                            '<div class="close '+closeName+'" title=""></div>'+
                        '</div>';
                $("body").append(html);
                $("#"+name).css('top',top);
                $("#"+name).css('left',left);
                
                if(options.OpenCallBack!==null)
                    options.OpenCallBack();
                thiser.Bindclose(elem, name, thiser, options);
                thiser.BindLiLabel(elem, name, thiser, options);
        }
    };
	
	

})(jQuery);

