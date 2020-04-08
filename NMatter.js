$(document).ready(function() {  
    getUserInformation(); 
    getAssociate(); 
    getChart();
    getPartner();
    getClosed();
});  
function getUserInformation() { 
$.ajax({ 
   method: 'GET', 
   url: "http://labsp16app:2101/Beazley/_api/web/lists/Getbytitle('BBList')/items?&$select=ID,Title,MatterDevelopments&$filter=SaveButtonClicked%20eq%20null&$top=1000", 
   headers: { 
       "accept": "application/json;odata=verbose",
       "content-type": "application/json;odata=verbose",
   },
    success: mySuccHandler,
   error: myErrHandler
});

function mySuccHandler(response) {
//console.log(response);

try{
$("#grid").kendoGrid({

//toolbar:["excel","save","cancel","search" ],

dataSource: {
   data: response.d.results,
  
   pageSize: 20,
   

schema:{
   


   model: {
      id:"Title",
       fields:{
          
          Title: {type:"string"},
          MatterDescription: {type:"string"}
          
       }
   }
},
},

filterable:false,
sortable: true,
//scrollable: true,  //add this line for scrollable
//height: 600, // Fixed height 
groupable: false,
pageable: true,
batch:true,
navigatable:true,
selectable: true,
toolbar:["<h1>New Matters</h1>","search" ],
//toolbar: "<h1>New Matters </h1>",
columns : [
    {
     field: "ID",
     title: "Matter Number",
    // template: '<a href="\\#">#= ID#</a>'
    template: '<a target="_blank" href="http://labsp16app:2101/beazley/Lists/BBList/EditForm.aspx?ID=#= ID#">#= Title#</a>'
},
    
    
    {
    field: "Title",
    title:"Matter",
    hidden:true,
    },

{
field:"MatterDevelopments",
title:"Matter Descriptions",
hidden: true, // hide column
},
],
});

}
catch(e){
alert(e.message);
}

}
function myErrHandler(data, errMessage) {    
alert("Error: " + errMessage);    
}

}
getAssociate() // next grid 
function getAssociate() { 
    $.ajax({ 
       method: 'GET', 
       url: "http://labsp16app:2101/Beazley/_api/web/lists/Getbytitle('BBList')/items?&$select=ID,Title,MatterName,Claim,ClaimNumber,PolicyNumber&$expand=Partner&$select=Partner/UserName,Partner/FirstName,Partner/LastName&$expand=Associate&$select=Associate/UserName,Associate/FirstName,Associate/LastName&$filter=SummaryComplete%20eq%20null&$top=1000", 
       headers: { 
           "accept": "application/json;odata=verbose",
           "content-type": "application/json;odata=verbose",
       },
        success: mySuccHandler,
       error: myErrHandler
    });
    
    function mySuccHandler(response) {
    //console.log(response);
    
    try{
        
     // tabstrip to kendo page.
    $("#grid1").kendoGrid({
    
    //toolbar:["excel","save","cancel","search" ],
    
    dataSource: {
       data: response.d.results,
      
       pageSize: 20,
       
    
    schema:{
       
    
    
       model: {
          id:"Title",
           fields:{
              
              Title: {type:"string"},
             
             
              
           }
       }
    },
    },
    
    filterable: {
       
            mode: "row"
        
    },
    sortable: true,
    groupable: false,
    scrollable:true,
    height:500,
    pageable: true,
    batch:true,
    navigatable:true,
    selectable: true,
    //toolbar:["search" ],
    toolbar: "<h1>Incomplete Summaries (Associates) </h1>",

    columns : [
        
        
        
        {
        field: "Title",
        title:"Matter",
        
        },
    
    {
    field:"Claim",
    title:"Assured",
    },
    {
     field:"ClaimNumber",
     title:"Claim Number",
    },
    {
      field:"PolicyNumber",
      title:"Policy Number",
    },
    {
        field:"Associate.UserName",
        title:"Associate",
        template: "#: Associate.FirstName # #= Associate.LastName #"
       
    }
    ],
    
    });
   // $(".k-grid-toolbar", "#grid1").before("<p>hello</p>");
    }
    catch(e){
    alert(e.message);
    }
    getChart();
    
    }
    function myErrHandler(data, errMessage) {    
    alert("Error: " + errMessage);    
    }
    
    }
    
    function getChart() { 
        $.ajax({ 
           method: 'GET', 
           url: "http://labsp16app:2101/Beazley/_api/web/lists/Getbytitle('BBList')/items?&$select=ID,Title,MatterDevelopments,AssignmentType&$filter=AssignmentType%20eq%20%27Complex%27&$top=1000", 
           headers: { 
               "accept": "application/json;odata=verbose",
               "content-type": "application/json;odata=verbose",
           },
            success: mySuccHandler,
            

           error: myErrHandler
        });
        
        function mySuccHandler(response) {
        console.log(response);
        
        try{
        $("#chart").kendoChart({
        
        //toolbar:["excel","save","cancel","search" ],
        
        dataSource: {
           data: response.d.results,
           


          },
          title:{
            text:"Overall Matters",
            font: "bold 14px  Arial,Helvetica,sans-serif"
          },
          
          filter: {
            field: "ID", operator: "eq", value: "ID"
        },

        series:[{
        type:"pie",
        field:"ID",
        categoryField:"ID",
        autoFit: true,
        }],
        seriesDefaults: {
            labels: {
                visible: true,
                format: "{0}%"
            }
        },

        
    tooltip: {
            visible: true,
            format: "{0}%"
        }
       
        });
        
        }
        catch(e){
        alert(e.message);
        }
        getPartner();
        }
        function myErrHandler(data, errMessage) {    
        alert("Error: " + errMessage);    
        }
        }

        function getPartner() { 
            $.ajax({ 
               method: 'GET', 
               url: "http://labsp16app:2101/Beazley/_api/web/lists/Getbytitle('BBList')/items?&$select=ID,Title,MatterName,Claim,ClaimNumber,PolicyNumber&$expand=Partner&$select=Partner/UserName,Partner/FirstName,Partner/LastName&$expand=Associate&$select=Associate/UserName,Associate/FirstName,Associate/LastName&$filter=SummaryComplete%20eq%20null&$top=1000", 
               headers: { 
                   "accept": "application/json;odata=verbose",
                   "content-type": "application/json;odata=verbose",
               },
                success: mySuccHandler,
               error: myErrHandler
            });
            
            function mySuccHandler(response) {
            //console.log(response);
            
            try{
                
             // tabstrip to kendo page.
            $("#grid2").kendoGrid({
            
            //toolbar:["excel","save","cancel","search" ],
            
            dataSource: {
               data: response.d.results,
              
               pageSize: 20,
               
            
            schema:{
               
            
            
               model: {
                  id:"Title",
                   fields:{
                      
                      Title: {type:"string"},
                     
                     
                      
                   }
               }
            },
            },
            
            filterable: {
               
                    mode: "row"
                
            },
            sortable: true,
            groupable: false,
            scrollable:true,
            height:500,
            pageable: true,
            batch:true,
            navigatable:true,
            selectable: true,
            //toolbar:["search" ],
            toolbar: "<h1>Pending Final Review (Partner) </h1>",
        
            columns : [
                
                
                
                {
                field: "Title",
                title:"Matter",
                
                },
            
            {
            field:"Claim",
            title:"Assured",
            },
            {
             field:"ClaimNumber",
             title:"Claim Number",
            },
            {
              field:"PolicyNumber",
              title:"Policy Number",
            },
            {
                field:"Partner.UserName",
                title:"Partner",
                template: "#: Partner.FirstName # #= Partner.LastName #"
               
            }
            ],
            
            });
           // $(".k-grid-toolbar", "#grid1").before("<p>hello</p>");
            }
            catch(e){
            alert(e.message);
            }
            getClosed();
            
            }
            function myErrHandler(data, errMessage) {    
            alert("Error: " + errMessage);    
            }
            
            }
            function getClosed() { 
                $.ajax({ 
                   method: 'GET', 
                   url: "http://labsp16app:2101/Beazley/_api/web/lists/Getbytitle('BBList')/items?&$select=ID,Title,MatterName,Claim,ClaimNumber,PolicyNumber&$filter=SummaryComplete%20eq%20null&$top=1000", 
                   headers: { 
                       "accept": "application/json;odata=verbose",
                       "content-type": "application/json;odata=verbose",
                   },
                    success: mySuccHandler,
                   error: myErrHandler
                });
                
                function mySuccHandler(response) {
                //console.log(response);
                
                try{
                $("#grid3").kendoGrid({
                
                //toolbar:["excel","save","cancel","search" ],
                
                dataSource: {
                   data: response.d.results,
                  
                   pageSize: 20,
                   
                
                schema:{
                   
                
                
                   model: {
                      id:"Title",
                       fields:{
                          
                          Title: {type:"string"},
                          PolicyNumber: {type:"string"}
                          
                       }
                   }
                },
                },
                
                filterable:false,
                sortable: true,
                scrollable: true,  //add this line for scrollable
                height: 500, // Fixed height 
                groupable: false,
                pageable: true,
                batch:true,
                navigatable:true,
                selectable: true,
                toolbar:["<h1>Flagged for Closure</h1>","search" ],
                //toolbar: "<h1>New Matters </h1>",
                columns : [
                    
                    
                    
                    {
                    field: "Title",
                    title:"Matter",
                    
                    },
                
                {
                field:"PolicyNumber",
                title:"Policy Number",
                
                },
                ],
                });
                
                }
                catch(e){
                alert(e.message);
                }
                
                }
                function myErrHandler(data, errMessage) {    
                alert("Error: " + errMessage);    
                }
                
                }






// CountDown 
var CDown = function() {
	this.state=0;// if initialized
	this.counts=[];// array holding countdown date objects and id to print to {d:new Date(2013,11,18,18,54,36), id:"countbox1"}
	this.interval=null;// setInterval object
}

CDown.prototype = {
	init: function(){
		this.state=1;
		var self=this;
		this.interval=window.setInterval(function(){self.tick();}, 1000);
	},
	add: function(date,id){
		this.counts.push({d:date,id:id});
		this.tick();
		if(this.state==0) this.init();
	},
	expire: function(idxs){
		for(var x in idxs) {
			this.display(this.counts[idxs[x]], "Now!");
			this.counts.splice(idxs[x], 1);
		}
	},
	format: function(r){
// Table Format with Digital Readout
var out = "<table cellspacing=0 cellpadding=0 border=0 class=cdTimer>";
out += "<td align=center class='cdTimerTitle cdTimerVLine'>"+((r.d==1)?"DAY":"DAYS")+"</td>";
out += "<td align=center class='cdTimerTitle cdTimerVLine'>"+((r.d==1)?"HR":"HRS")+"</td>";
out += "<td align=center class='cdTimerTitle cdTimerVLine'>MIN</td>";
out += "<td align=center class='cdTimerTitle'>SEC</td><tr>";
out += "<td align=center class='cdTimerDigit cdTimerVLine'>"+ r.d +"</td>";
out += "<td align=center class='cdTimerDigit cdTimerVLine'>"+ r.h +"</td>";
out += "<td align=center class='cdTimerDigit cdTimerVLine'>"+ r.m +"</td>";
out += "<td align=center class='cdTimerDigit'>"+ r.s +"</td></table>";


return out.substr(0,out.length-2);
},
	math: function(work){
		var	y=w=d=h=m=s=ms=0;

		ms=(""+((work%1000)+1000)).substr(1,3);
		work=Math.floor(work/1000);//kill the "milliseconds" so just secs

		y=Math.floor(work/31536000);//years (no leapyear support)
		w=Math.floor(work/604800);//weeks
		d=Math.floor(work/86400);//days
		work=work%86400;

		h=Math.floor(work/3600);//hours
		work=work%3600;

		m=Math.floor(work/60);//minutes
		work=work%60;

		s=Math.floor(work);//seconds

		return {y:y,w:w,d:d,h:h,m:m,s:s,ms:ms};
	},
	tick: function(){
		var now=(new Date()).getTime(),
			expired=[],cnt=0,amount=0;

		if(this.counts)
		for(var idx=0,n=this.counts.length; idx<n; ++idx){
			cnt=this.counts[idx];
			amount=cnt.d.getTime()-now;//calc milliseconds between dates

			// if time is already past
			if(amount<0){
				expired.push(idx);
			}
			// date is still good
			else{
				this.display(cnt, this.format(this.math(amount)));
			}
		}

		// deal with any expired
		if(expired.length>0) this.expire(expired);

		// if no active counts, stop updating
		if(this.counts.length==0) window.clearTimeout(this.interval);
		
	},
	display: function(cnt,msg){
		document.getElementById(cnt.id).innerHTML=msg;
	}
};

window.onload=function(){
	var cdown = new CDown();

	cdown.add(new Date(2020,07,01,0,0,00), "countbox1");
};