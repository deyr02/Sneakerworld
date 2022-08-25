   /*--------------------------------------------------------------------*/    
   /*--------------------------------------------------------------------*/    
   /*-----------------------binding function on document ready---------------------------------------------*/    
   /*--------------------------------------------------------------------*/    
   /*--------------------------------------------------------------------*/    

let ismuted = true;
$(document).ready(function(){
   /*--------------------------------------------------------------------*/    
   /*----------------------  Mouser over and out event on logo  --------------------------------------------*/    
   /*--------------------------------------------------------------------*/    
    //mouse over logo
    // change the background color and font color
    $(".nav-logo").mouseover( function(){
        $(".nav-control").css("background-color", "var(--main-color-red)");
        $(".nav-other").css("background-color", "var(--main-color-red)");
        $("nav a").css("color", "var(--main-color-blue)");
        $(".mobile-nav-item a").css("color", "var(--main-color-blue)");
        $("#search-text").css("background-color", "var(--main-color-blue)");

    }) 
     //mouse over logo
    // change the background color and font color back to normal state
    $(".nav-logo").mouseout( function(){
        $(".nav-control").css("background-color", "var(--main-color-blue)");
        $(".nav-other").css("background-color", "var(--main-color-blue)");
        $("nav a").css("color", "var(--main-color-red)");
        $(".mobile-nav-item a").css("color", "var(--main-color-blue)");

        $("#search-text").css("background-color", "var(--main-color-red)");
    })
    
    
    //key press event for search  text box.
    //each time any key preess the following function will be called.
    $("#search-text").keypress(function(){
        
        //get the value from the search text box
        let input = $("#search-text").val();
        
        //call the searchSneaker function and return the search output if any found
        let output = searchSneaker(input);
        
        //prepareing the visible search result.
        displaySearchOutput("#desktop-search-output", output);
    });
    
    
    //Expanding and collapsing navigation while scrolling
    //the function will work as long as the browser window is  greater than 768px
    //the variable to hold the last scrolling top
    let _last_scrolled =0;
    $(window).scroll(function(){
        //making sure that the rest of the code work if the browser window is greater than 768px;
        if (window.innerWidth >= 768){
            let _scrollTop = $(window).scrollTop();
       
            //making sure that navigation is expanding or collapsing after scrolled down to 150px.
            if(_scrollTop > 150){
                
                ////scrollling down
                if (_scrollTop > _last_scrolled){
                       
                    _last_scrolled = _scrollTop;
                    //hiding nav control
                    $(".nav-control").addClass("nav-control-shirnk");
                    $(".nav-control .row").css("display", "none");
                    $("nav").css("background-color", "transparent");
                    //hiding search-result
                      if($("#desktop-search-output").css("display") === "block"){
                            $("#desktop-search-output").hide();
                        }
                    //hiding nav other
                    $(".nav-other").addClass("nav-other-shirnk");
                    $(".nav-other .row").css("display", "none");


                   // console.log($(window).scrollTop());
                }
                ///scrolling up
                else{
                    
                    _last_scrolled = _scrollTop;

                    $(".nav-control").removeClass("nav-control-shirnk");
                    $("nav").css("background-color", "white");
                    $(".nav-other").removeClass("nav-other-shirnk");
 
                    setTimeout(function(){
                     $(".nav-control .row").css("display", "flex");
                     $(".nav-other .row").css("display", "flex");


                    },1000);
                    
                    if($("#desktop-search-output").text().trim().length > 0){
                            $("#desktop-search-output").show()
                        }

                }
             

            }
        }
   
    });
    
    
    
    //making sure the dropdown menu in the navigation alway visible 
    // the follwing function will hide the search result box
    $(".drop-down").mouseover(function(){
           if($("#desktop-search-output").text().trim().length > 0){
                $("#desktop-search-output").hide()
            }
    });
    
       
    $(".drop-down").mouseout(function(){
           if($("#desktop-search-output").text().trim().length > 0){
                $("#desktop-search-output").show()
            }
    });
    
    slideShow(0, true);
    let _arr_adidas = ["SID101", "SID180", "SID111"];
    featuredProducts("#featured-adidas", "col-3", _arr_adidas);    
    let _arr_converse = ["SID209", "SID212", "SID221"];
    featuredProducts("#featured-converse", "col-3", _arr_converse);
    let _arr_nike = ["SID443", "SID454", "SID446"];
    featuredProducts("#featured-nike", "col-3", _arr_nike);
    let _arr_puma = ["SID460", "SID328", "SID462"];
    featuredProducts("#featured-puma", "col-3", _arr_puma);    
    let _arr_vans = ["SID400", "SID397", "SID359"];
    featuredProducts("#featured-vans", "col-3", _arr_vans);
    let _arr_onit = ["SID414", "SID469"];
    featuredProducts("#featured-onit", "col-3", _arr_onit);
    
    
    //new arrival
    
    let new_arrival = findProduct("sale", "New in");
    
    displaySneakers("#new-arrival-product", new_arrival.slice(0,8));   
    
    let on_sale = findProduct("sale", "On sale");
    
    displaySneakers("#on-sale-product", on_sale.slice(0,8));
    
    //////////////////locating bulltest points and video controls
    
    let video_height = $($(".product-add")[0]).innerHeight();
    $($(".bullet-points")[0]).css("top", video_height+"px");
    $($(".controls")[0]).css("top", video_height+"px");
    
    
});


$(window).resize(function(){
    let _slide = $(".slide");
    let video_height;
    for(let i =0; i<_slide.length; i++){
        if($($(_slide[i])).css("display") === 'block'){
            let _product_add = _slide[i].getElementsByClassName("product-add");
            video_height = $(_product_add).innerHeight();
        }
    }

    $($(".bullet-points")[0]).css("top", video_height-50+"px");
    $($(".controls")[0]).css("top", video_height-50+"px");
    
    if(window.innerWidth > 768){
        if(   $($(".mobile-nav-item")[0]).css("display") === "block"){
            window.location.reload();
        }
    }
    
})
   /*--------------------------------------------------------------------*/    
   /*--------------------------------------------------------------------*/    
   /*---------  END:   binding function on document ready----------------*/    
   /*--------------------------------------------------------------------*/    
   /*--------------------------------------------------------------------*/    





function displayMobileNav(_ele){
    $(_ele.children[0]).toggleClass("fa-bars");
    $(_ele.children[0]).toggleClass("fa-window-close");
    $($(".mobile-nav-item")[0]).toggle();
    console.log(    $(_ele.children[0]));
}




    
/*--------------------------------------------------------------------*/    
/*----------------------  Expanding and collapsing search text box  --------------------------------------------*/    
/*--------------------------------------------------------------------*/ 
function searchClick(_ele, _id){
    //toggiling icon between search and window colose
    $(_ele).toggleClass("fa-window-close");
    
    // make sure search input "text-box" become empty, each time the function call.
    $(_id).val("");
    
    //add the "expand" class so the textbox expend all the space avialable 
    $(_id).toggleClass("expand");
    
    //shrinking the span element so that 'textbox' can expand from right to left.
    //N.B(without shirnking the span element the text box will exapand left to right).
    $(".nav-control .row span").toggleClass("shirnk");
    
    //Making sure that the "desktop-search-output also close when search text box collapse
    // other wise there will be no way to close  "desktop-search-output" 
    if($("#desktop-search-output").css("display") === "block"){
        $("#desktop-search-output").toggle();
        $("#desktop-search-output").text("");
    }

    
}



/*--------------------------------------------------------------------*/    
/*----------------------  Search sneaker  --------------------------------------------*/    
/*--------------------------------------------------------------------*/
// search sneaker from the json file by the given word
//the method search for key word in "name" and "Style" property in sneaker objects. 
//if any match found then add to array and at last return the array. 
function searchSneaker(_search){
    let _sneakers = data.sneaker;
    let _output = new Array();
    for(var x in _sneakers){
        //searching in name and style property of each seaker object. 
        if( data.sneaker[x].name.toLowerCase().search(_search.toLocaleLowerCase()) !== -1 ||
           data.sneaker[x].style.toLowerCase().search(_search.toLocaleLowerCase())!== -1 ){
            _output.push({key:x, value:_sneakers[x]});
        }
    }
    return _output;
    
}




/*--------------------------------------------------------------------*/    
/*----------------------  dispaly search result output  --------------------------------------------*/    
/*--------------------------------------------------------------------*/
function displaySearchOutput(_id, _arr){
    if(_arr.length > 1){
        $(_id).toggle();
    }
    $(_id).text("");
    
    let _row = document.createElement("div");
    $(_row).addClass("row");
    let _max = window.innerHeight > 400 ? (_arr.length > 10 ? 10: _arr.length): (_arr.length> 5? 5: _arr.length);  
    
    if(window.innerHeight > 450 ){
        if(window.innerWidth > 991){
            _max = _arr.length >=10 ? 10: _arr.length;

        }
        else{
            _max = _arr.length >=6 ? 6: _arr.length;

        }
    }
    else{
        _max= _arr.length >= 3? 3 : _arr.length;
    }
    
    for(let i =0; i<_max; i++){
        let _col_5 = document.createElement("div");
        if(window.innerWidth > 991){
            $(_col_5).addClass("col-5");

        }
        else{
                $(_col_5).addClass("col-3");

        }
        let _content = document.createElement("div");
        $(_content).addClass("content");
        
        //Image block
        let _img_block = document.createElement("div");
        $(_img_block).addClass("img-block");
        let _img = document.createElement("img");
        let img = _arr[i].value.pictures[0];
        $(_img).attr("src", img);
        _img_block.append(_img);
        _content.append(_img_block);
        
        ///details-block
        let _details_block = document.createElement("div");
        $(_details_block).addClass("details-block");
        let _name = document.createElement("div");
        $(_name).addClass("name");
        _name.append(_arr[i].value.name);
        _details_block.append(_name);
        
        let _style = document.createElement("div");
        $(_style).addClass("style");
        _style.append(_arr[i].value.style);
        _details_block.append(_style);
        
        let _price = document.createElement("div");
        $(_price).addClass("price");
        _price.append( parseFloat(_arr[i].value.price).toFixed(2));
        _details_block.append(_price);
        
        let _show = document.createElement("div");
        $(_show).addClass("show");
        $(_show).attr("onclick",  "transferToSneakerPage('"+ _arr[i].key+"')" );
        _show.append("view");
        _details_block.append(_show);
        
        
        
        _content.append(_details_block);
        
        
        _col_5.append(_content);
        _row.append(_col_5);
    }

    $(_id).append(_row);
    
    let _row_2 = document.createElement("div");
    $(_row_2).addClass("row");
    
    let _col_5 = document.createElement("div");

    let _content = document.createElement("div");
    $(_content).addClass("content");
    
    let a = document.createElement("a");
    $(a).addClass("button");
    $(a).attr("onclick", "transferToSneakerCollection(" +"'search'" +",'" +  $("#search-text").val().toString()+"')");
    a.append("view all (" + _arr.length + ")");
    _col_5.append(a);
    
    _col_5.append(_content);
    _row_2.append(_col_5);
    
    $(_id).append(_row_2);

}




/*--------------------------------------------------------------------*/    
/*----------------------     slide shows --------------------------------------------*/    
/*--------------------------------------------------------------------*/

function slideShow(_startIndex, _sliding){
    let slides, _bullet_points, _bullets, _currentvideo, _isPlaying = true;
    _bullet_points = $(".bullet-points");
    $(_bullet_points).text("");
    slides = $(".slide");
    let _video = $(".slide video"); 
    let _id =  $("#playOrPause");

    if($(_id).hasClass("fa-play")){
        $(_id).removeClass("fa-play");
        $(_id).addClass("fa-pause");
    }
    
    for(let i =0; i< slides.length; i++){
        slides[i].style.display = "none"
        let x = document.createElement("div");
        $(x).addClass("bullet");
        _bullet_points.append(x);   
    }
    
    let points = _bullet_points.children();
    for(let j =0; j<points.length; j++){
        points[j].addEventListener("click", function(){
            _sliding = false;
        for(let k =0; k<_video.length; k++){

            $(_video[k])[0].pause();
            $(_video[k])[0].currentTime =0;
            
        }
            slideShow( j, true);
        });
    }

    _startIndex++;
    if(_startIndex > slides.length){
        _startIndex =1;
    }
    
    let currentIndex = _startIndex-1;
    slides[currentIndex].style.display = "block";
    _bullet_points.children()[currentIndex].style.backgroundColor = "var(--main-color-blue)";
    _currentvideo = $(_video[currentIndex])[0];
    
    

     let _playButton = $("#playvideo");
     _playButton.unbind();
     _playButton.on("click", function(){
         if(_isPlaying){
             _currentvideo.pause();
             _isPlaying = false;
         }
         else{
             $(_video[currentIndex])[0].play();
             _isPlaying = true;
         }
     });

    _currentvideo.ontimeupdated = function(){
        console.log(_currentvideo.currentTime);
    }
    _currentvideo.onended = function(){
         if(_sliding){
        slideShow(_startIndex, _sliding);

        }
    }     
     _currentvideo.play();   
    setInterval(()=>{
        if(_sliding && _isPlaying){
            
            
            let _v_duration = _currentvideo.duration;
            let _v_currentTime = _currentvideo.currentTime;
             let _completed =0;
            if(_v_currentTime !== 0){
                _completed = (_v_currentTime * 75) / _v_duration;
            }
            let _total_per = 25 +_completed;
            
            
        $( $(".featured")[currentIndex]).css("width", _total_per.toFixed(2) + "%");
        }

    },_currentvideo.duration);
       
}


function sounds(){
  $("#muteOrUnmute").toggleClass("fa-volume-up"); 

    
    if(ismuted){
        ismuted = false;
    }
    else{
        ismuted = true;
    }
    
    let video = $(".slide video");
    for(let i =0; i< video.length; i++){
        $(video[i]).prop("muted", ismuted);
    }
}

function playPause(){
    $("#playOrPause").toggleClass("fa-pause");
    $("#playOrPause").toggleClass("fa-play");

}




/*--------------------------------------------------------------------*/    
/*----------------------     sneaker block --------------------------------------------*/    
/*--------------------------------------------------------------------*/

function createSneakerBlock(_colType, _productId, _sneaker){
    let _col = document.createElement("div");
    $(_col).addClass(_colType);
    let _content =document.createElement("div");
    $(_content).addClass("content");
    
    let _featrured_img_block = document.createElement("div");
    $(_featrured_img_block).addClass("featured-img-block");
    _content.append(_featrured_img_block);
    let _featured_img = document.createElement("img");
    $(_featured_img).attr("src", _sneaker["pictures"][0]);
    _featrured_img_block.append(_featured_img);
    
    let _featrued_detail_block = document.createElement("div");
    $(_featrued_detail_block).addClass("featured-detail-block");
    let _featured_product_details = document.createElement("div");
    $(_featured_product_details).addClass("featured-product-details");
    let _row_1 = document.createElement("div");
    $(_row_1).addClass("row");
    let _style = document.createElement("div");
    $(_style).addClass("style");
    _style.append(_sneaker.style)
    _row_1.append(_style);
    
    let _price = document.createElement("div");
    $(_price).addClass("price");
    _price.append(parseFloat(_sneaker.price).toFixed(2));
    _row_1.append(_price);
    _featured_product_details.append(_row_1);
    
    let _row_2 = document.createElement("div");
    $(_row_2).addClass("row");
    let _div = document.createElement("div");
    _div.append("Avialable Colors");
    _row_2.append(_div);
    _featured_product_details.append(_row_2);
    
    let _row_3 = document.createElement("div");
    $(_row_3).addClass("row");
    let colors = _sneaker.availableColors.length > 7 ? 7: _sneaker.availableColors.length;
    for(let i =0; i< colors; i++){
        let _img = document.createElement("img");
        $(_img).attr("src", data["sneaker"][_sneaker.availableColors[i]].pictures[0] );
        _row_3.append(_img);
    }
    
    if (_sneaker.availableColors.length > 7){
        let _div_2 = document.createElement("div");
        _div_2.append("+"+ (_sneaker.availableColors.length -7) + " more" );
        _row_3.append(_div_2);
    }
    _featured_product_details.append(_row_3);
    
    let _row_4 = document.createElement("div");
    $(_row_4).addClass("row");
    let _show = document.createElement("div");
    $(_show).addClass("show");
    $(_show).attr("onclick", "transferToSneakerPage('" + _productId + "')");
    _show.append("VIEW");
    _row_4.append(_show);
    _featured_product_details.append(_row_4);

    
    _featrued_detail_block.append(_featured_product_details);
    _content.append(_featrued_detail_block);
    
    
    _col.append(_content);
    return _col;
}

//let bid = data["sneaker"]["SID101"];
//console.log(createSneakerBlock("col-3", bid));


/*--------------------------------------------------------------------*/    
/*----------------------     Featured product --------------------------------------------*/    
/*--------------------------------------------------------------------*/
function featuredProducts (_id, _colType, _arr){
    for(let i =0 ; i< _arr.length; i++){
        $(_id).append(createSneakerBlock(_colType, _arr[i], data["sneaker"][_arr[i]]));
    }
}
    





/*--------------------------------------------------------------------*/    
/*----------------------     find products --------------------------------------------*/    
/*--------------------------------------------------------------------*/

function findProduct(_properties, _vlaue){

    let _arr = []
    //find all objects of given properties and its value
    for(let _obj in data["sneaker"]){
        if(data["sneaker"][_obj][_properties].toLowerCase() === _vlaue.toLowerCase() ){
        _arr.push({
            key: _obj,
            value:  data["sneaker"][_obj]
        });
            
        }
    }
    
    
    //get all the unique style of the sneaker from the above search result.
    let u = _arr.map(item => item.value["style"]).filter((value, index, self)=> self.indexOf(value) === index);
    
    //get the first id  from the list of every style sneaker: cause that id contains all other sneaker ids in the available colors properties. 
    let _unique_style =[];
    for(let i =0; i< u.length; i++){
        let id = _arr.map(item => item).filter((value, index, self)=> value.value.style === u[i]);
        
        _unique_style.push(id[0].key);
     
        
    }
 
    return _unique_style;
    
}



/*--------------------------------------------------------------------*/    
/*----------------------     sneaker blocks --------------------------------------------*/    
/*--------------------------------------------------------------------*/
function sneakerBlocks(_id){

let _sneaker = data["sneaker"][_id];
    
    let _sneaker_block = document.createElement("div");
    $(_sneaker_block).addClass("col-4");
    $(_sneaker_block).addClass("sneaker-block");
    $(_sneaker_block).attr("onclick", "transferToSneakerPage('" + _id + "')");

    
    //content
    let _content = document.createElement("div");
    $(_content).addClass("content");
    
    //content--->sale-type
    let _sale_type = document.createElement("div");
    $(_sale_type).addClass("sale-type");
    let _sale_img = document.createElement("img");
    let _sale_img_source;
    if(_sneaker.sale.toLowerCase() === "new in"){
        _sale_img_source = "image/banner/NewArrivalSticker.png";
    }
    else if(_sneaker.sale.toLowerCase() === "on sale"){
        _sale_img_source = "image/banner/OnSaleSticker.png";
    }
    else if(_sneaker.sale.toLowerCase() === "regular"){
        _sale_img_source = "image/banner/topItem.png";
    }
    $(_sale_img).attr("src", _sale_img_source);
    _sale_type.append(_sale_img);
    _content.append(_sale_type);
    
    //content--->product-block
    let _product_block = document.createElement("div");
    $(_product_block).addClass("product-block");
    let _sneaker_pic = document.createElement("div");
    $(_sneaker_pic).addClass("sneaker-pic");
    let _sneaker_img = document.createElement("img");
    $(_sneaker_img).attr("src", _sneaker.pictures[0]);
    _sneaker_pic.append(_sneaker_img);
    _product_block.append(_sneaker_pic);
    _content.append(_product_block);
    
    //content--->price-tag
    let _price_tag = document.createElement("div");
    $(_price_tag).addClass("price-tag")
    let _price_tag_img = document.createElement("img");
    $(_price_tag_img).attr("src", "image/banner/pricetag.png");
    _price_tag.append(_price_tag_img);
    
    let _price = document.createElement("div");
    $(_price).addClass("price");
    _price.append(_sneaker.price.toFixed(2));
    _price_tag.append(_price);
    _content.append(_price_tag);
    
    //content--->avialable-colors
    let _avialable_color = document.createElement("div");
    $(_avialable_color).addClass("avialable-colors");
    let _slideshow = document.createElement("div");
    $(_slideshow).addClass("slideshow");
    let _colors = document.createElement("div");
    $(_colors).addClass("colors");
    for(let i =0; i<_sneaker.availableColors.length; i++){
        let _color_img = document.createElement("img");
        $(_color_img).attr("src", data["sneaker"][_sneaker.availableColors[i]].pictures[0]);
        _colors.append(_color_img);
    }
    _slideshow.append(_colors);
    _avialable_color.append(_slideshow);
    _content.append(_avialable_color);
    
    //content--->details-block
    let _details_block = document.createElement("div");
    $(_details_block).addClass("details-block");
    let _sneaker_details = document.createElement("div");
    $(_sneaker_details).addClass("sneaker-details");
    let _brand_logo = document.createElement("div");
    $(_brand_logo).addClass("brand-logo");
    let _brand_img = document.createElement("img");
    $(_brand_img).attr("src", data["brand"][_sneaker.brand].brand_logo);
    _brand_logo.append(_brand_img);
    _sneaker_details.append(_brand_logo);
    
    let _brand_logo_details = document.createElement("div");
    $(_brand_logo_details).addClass("brand-logo-details");
    _brand_logo_details.append(_sneaker.style);
    _sneaker_details.append(_brand_logo_details);
    
    let _brand_logo_details_2 = document.createElement("div");
    $(_brand_logo_details_2).addClass("brand-logo-details");
    _brand_logo_details_2.append("Available Colors: +" + _sneaker.availableColors.length);
    _sneaker_details.append(_brand_logo_details_2);

    
    _details_block.append(_sneaker_details);
    _content.append(_details_block);
    
    
    _sneaker_block.append(_content);

    
   return _sneaker_block;
}



/*--------------------------------------------------------------------*/    
/*----------------------     sneaker blocks --------------------------------------------*/    
/*--------------------------------------------------------------------*/

function displaySneakers(_id, _arr){
    for(let i =0 ; i<_arr.length; i++){
        let block = sneakerBlocks(_arr[i]);
        $(_id).append(block);
    }
}

sneakerBlocks("SID101");







/*--------------------------------------------------------------------*/    
/*----------------------     sneaker collection --------------------------------------------*/    
/*--------------------------------------------------------------------*/

let sneaker_list;
let current_page = 0;
let maxNumberOfItem= 20;
function seaker_Collection(_properties, _value){
    let headingText = "";
    switch(_value.toLowerCase()){
        case "new in":
            headingText = "NEW ARRIVAL";
            break;
        case "on sale":
            headingText = "ON SALE";
            break;       
        case "regular":
            headingText = "TOP SELLING ITEM";
            break;
        case "men":
            headingText = "MEN'S COLLECTION";
            break;
        case "women":
            headingText = "WOMEN'S COLLECTION";
            break;
        case "bid102":
            headingText = "ADIDAS";
            break;
        case "bid103":
            headingText = "CONVERSE";
            break;
        case "bid104":
            headingText = "NIKE";
            break;
        case "bid105":
            headingText = "PUMA";
            break;
        case "bid106":
            headingText = "VANS";
            break;
          case "bid107":
            headingText = "ONITSUKA TIGER";
            break;
            
        
            
        default:
            headingText = "SEARCH RESULT";
            break;
                
    }
    $("#banner-text").text(headingText);
    
        let _arr = []
    //find all objects of given properties and its value
        
        if(_properties === "search"){
            let s_result = searchSneaker(_value);
            for(var xx in s_result){
                _arr.push(s_result[xx].key);

            }
            
        }
    else if(_properties === "onsalecollection"){
        
          for(let _obj in data["sneaker"]){
            if(data["sneaker"][_obj]['sale'].toLowerCase() === "on sale" &&
              data["sneaker"][_obj]['gender'].toLowerCase() === _value.toLowerCase()){
            _arr.push(_obj);
            
            }
        }
    }
    else if(_properties === "newincollection"){
        
          for(let _obj in data["sneaker"]){
            if(data["sneaker"][_obj]['sale'].toLowerCase() === "new in" &&
              data["sneaker"][_obj]['gender'].toLowerCase() === _value.toLowerCase()){
            _arr.push(_obj);
            
            }
        }
    }
    else{
          for(let _obj in data["sneaker"]){
            if(data["sneaker"][_obj][_properties].toLowerCase() === _value.toLowerCase() ){
            _arr.push(_obj);
            
            }
        }
    }
  
    sneaker_list = _arr;
console.log(_arr.length);
    loadPageNumber(_arr);
    
}

function loadPageNumber(_arr){
    let pageNumber =0;
    pageNumber = parseInt( _arr.length/ maxNumberOfItem);
    
    _arr.length% maxNumberOfItem !== 0? pageNumber++: pageNumber;
    let _block =    $(".page-number")[0];
    for(let i =1; i<=pageNumber; i++){
        let page = document.createElement("div");
        $(page).addClass("page");
        $(page).attr("onclick" , "selectedPage(" + (i-1) +")");
        page.append(i);
        _block.append(page);
        
    }
    selectedPage(current_page);
}

function selectedPage(num){
    current_page = num;
    let _page = $(".page");
    
    for(let i =0; i<_page.length; i++){
        if($(_page[i]).hasClass("selected")){
            $(_page[i]).removeClass("selected");
        }
    }
    $($(".page")[num]).addClass("selected");
    
    if(num === 0){
        console.log($("#previous"));
       $("#previous").addClass("disabled");
    }
    else{
        if($("#previous").hasClass("disabled")){
            $("#previous").removeClass("disabled");

        }
    }
    
    let startIndex = current_page * maxNumberOfItem;
    let endIndex= (current_page+1)* maxNumberOfItem >= sneaker_list.length ? sneaker_list.length : (current_page+1)* maxNumberOfItem;
    $("#sneaker-collection-product").text("");
    console.log("startIndex "+startIndex+ "   endIndex "+ endIndex + " length "+  sneaker_list.slice(startIndex, endIndex).length);
    displaySneakers("#sneaker-collection-product", sneaker_list.slice(startIndex, endIndex));
        
}


function nextPage(){
    let _page = $(".page");
    
    if(current_page < _page.length-1){
        current_page++;
        selectedPage(current_page);
    }
    console.log("currentpage " + current_page);

}
function previousPage(){

    if(current_page > 0){
        current_page--;
        selectedPage(current_page);
    }
        console.log("currentpage " + current_page);

}



/*--------------------------------------------------------------------*/    
/*----------------------     Sneaker load --------------------------------------------*/    
/*--------------------------------------------------------------------*/
let _sneaker_image_index =0;
function sneakerLoad(){
    let _location = window.location.search;
    const urlParams = new URLSearchParams(_location);
    const _id = urlParams.get('id');
    let _selectedSneaker = data["sneaker"][_id];
        console.log(_selectedSneaker);
    
    
    //sneaker detiails
    
    //sneaker img-top
    $("#sneaker-img-top").attr("src", _selectedSneaker["pictures"][0]);
    //sneaker img all
    $("#saved-sneaker").attr("onclick", "saved_item_add('"+_id+"')" );
    let saved_item = JSON.parse(localStorage.getItem("sneaker_world_saved_item"));
    if(saved_item!== null){
        for(let i =0; i<saved_item.length; i++){
            if(saved_item[i] === _id){
                if(! $("#saved-sneaker").hasClass("saved")){
                 $("#saved-sneaker").addClass("saved");
                    
                }

            }
        }
    }
    if(_selectedSneaker["pictures"].length <=1){
        $("#sneaker-img-all").hide();

    }
    else{
        $("#sneaker-img-all").text("");
        for(let i =0; i< _selectedSneaker["pictures"].length; i++){
            let _s_imges = document.createElement("img");
            $(_s_imges).attr("src", _selectedSneaker["pictures"][i]);
            $(_s_imges).attr("alt", i);
            $(_s_imges).attr("onclick", "displaySelectedImage(" + i +")");
            if(i === 0){
                $(_s_imges).addClass("selected");
            }
            $("#sneaker-img-all").append(_s_imges);
        }
    }
    
    
    //sneaker description
    let _sneaker_description = $($(".sneaker-description")[0]);
    _sneaker_description.text(_selectedSneaker["description"]);
    
    //sneaker feature
    let _sneaker_feature = $($(".sneaker-features")[0].children[0]);
    _sneaker_feature.text("");
    for(let i =0; i< _selectedSneaker["productDetails"].length; i++){
        let _li = document.createElement("li");
        _li.append(_selectedSneaker["productDetails"][i]);
        _sneaker_feature.append(_li);
    }
    
    //sneaker price
    let _sneaker_price = $("#main-sneaker-price");
    _sneaker_price.text( parseFloat(_selectedSneaker["price"]).toFixed(2));    
    //sneaker name
    let _sneaker_name = $("#main-sneaker-name");
    _sneaker_name.text(_selectedSneaker["name"]);    
    
    //sneaker name
    let _sneaker_style = $("#main-sneaker-style");
    _sneaker_style.text(_selectedSneaker["style"]);    
    //sneaker gender
    let _sneaker_gender = $("#main-sneaker-gender");
    _sneaker_gender.text(_selectedSneaker["gender"]);
        //sneaker color
    let _sneaker_color = $($(".color-name")[0]);
    _sneaker_color.text(_selectedSneaker["color"]);
    
    
    //available colors
    let _main_sneakers_colors = $("#main-sneaker-colors");
    $(_main_sneakers_colors).text("");
    
    for(let i =0; i< _selectedSneaker.availableColors.length; i++){
        let _color_img = document.createElement("img");
        $(_color_img).attr("src", data["sneaker"][_selectedSneaker.availableColors[i]].pictures[0]);
        $(_color_img).attr("onclick", "transferToSneakerPage('"+ _selectedSneaker.availableColors[i]+"')");
        if(_selectedSneaker.availableColors[i] === _id){
            $(_color_img).addClass("color-selected");
        }
        _main_sneakers_colors.append(_color_img);
    }
    
    //size
    let _sneaker_size = $("#main-sneaker-size");
    $(_sneaker_size).text("");
    
    for(let i =0; i<_selectedSneaker.size.length; i++){
        let _size_div = document.createElement("div");
        $(_size_div).addClass("size-no");
        $(_size_div).append(_selectedSneaker.size[i].sizeNumber);
        
        if(!_selectedSneaker.size[i].available){
            $(_size_div).addClass("not-avialable");
        }
        else{
            $(_size_div).attr("onclick", "sizeSelction(this)");    
        }
        _sneaker_size.append(_size_div);

    }
    
    ///shopping cart  button 
        $("#shopping-cart-button").attr("onclick", "add_to_cart_click('" +_id+"')");

    //brand-logo
    let _brand_logo =  $("#brand-img");
    let brand = data['brand'][_selectedSneaker.brand];
    $(_brand_logo).attr("src", brand["brand_logo"]);
    
    //brand-description
    
    let _brand_description = $($(".brand-description")[0]);
    $(_brand_description).text("");
    $(_brand_description).text(brand.brand_details);
    
    
    
    
    
    
    
    
    
    //suggested Item
    let suggestedItem =    findProduct("brand", _selectedSneaker.brand);
    let _random_index = 0;
    if(suggestedItem.length > 4){
        _random_index = Math.floor(Math.random() * (suggestedItem.length-5));
    }

    console.log(suggestedItem.length);
    featuredProducts("#suggested-sneaker", "col-4", suggestedItem.slice(_random_index, _random_index+4));
    
    //add recent visited item
    addToRecentvisited(_id);

    
}

function displaySelectedImage(id){
    _sneaker_image_index = id;
    let img_src = "";
    let _all_img = $("#sneaker-img-all img");
    for(let i =0; i<_all_img.length; i++){
        if($(_all_img[i]).hasClass("selected")){
            $(_all_img[i]).removeClass("selected");
        }
        if(i === id){
            img_src = $(_all_img[i]).attr("src");

        }
    }
    $(_all_img[id]).addClass("selected");
    $("#sneaker-img-top").attr("src", img_src);

}

function displayNextImage(){
    let _all_img = $("#sneaker-img-all img");
    
    if(_sneaker_image_index < _all_img.length -1){
        _sneaker_image_index ++;
        displaySelectedImage(_sneaker_image_index);
        
    }

}

function displayPrevImage(){
    let _all_img = $("#sneaker-img-all img");
    
    if(_sneaker_image_index >= 1){
        _sneaker_image_index --;
        displaySelectedImage(_sneaker_image_index);
        
    }

}


function expandImage(){
    let _location = window.location.search;
    const urlParams = new URLSearchParams(_location);
    const _id = urlParams.get('id');
    let _selectedSneaker = data["sneaker"][_id];
    
    let topimg = $("#sneaker-img-top");
    
    let fullviewdiv = document.createElement("div");
    $(fullviewdiv).addClass("row");
    $(fullviewdiv).attr("id", "full-view");
    
    let closefullviewdiv = document.createElement("div");
    $(closefullviewdiv).attr("id","close-full-view");
    
    let _close = document.createElement("i");
    $(_close).addClass("fa");
    $(_close).addClass("fa-window-close");
    $(_close).attr("onclick","closeWindow('#full-view')");
    closefullviewdiv.append(_close);
    
    fullviewdiv.append(closefullviewdiv);
    
    let _scrolledto;
    
    for(let i = 0; i<_selectedSneaker["pictures"].length; i++){
        let _img = document.createElement("img");

        $(_img).attr("src", _selectedSneaker["pictures"][i]);
        
        if($(topimg).attr("src") === _selectedSneaker["pictures"][i]){
            _scrolledto = _img;
        }
        fullviewdiv.append(_img);

    }
    
    $("body").append(fullviewdiv);
    $("html, body").animate({
        scrollTop: $(_scrolledto).offset().top
    }, 2000);
    
}

function closeWindow(_id){
    console.log(_id);
    $(_id).remove();
      $("html, body").animate({
        scrollTop: $('body').offset().top
    }, 10);
}

let selected_sneaker_size = 0;
function sizeSelction(_ele){
    let _size_no = $(".size-no");
    for(let i =0; i<_size_no.length; i++){
        if($(_size_no[i]).hasClass("size-selected")){
            $(_size_no[i]).removeClass("size-selected");
        }
    }
    selected_sneaker_size = parseInt($(_ele).text());
    $(_ele).addClass("size-selected");
    console.log("selected Sneaker Size "+ selected_sneaker_size);

}


function add_to_cart_click(_id){
    if(selected_sneaker_size === 0){
        displayMessage("warning", "Sneaker size warning!", "Please select the sneaker size you want.");
    }
    else{
        cart_add(_id);
        displayMessage("successful", "Shopping Cart", "A item has been added to the the shopping cart.");

    }
}


/*--------------------------------------------------------------------*/    
/*----------------------     mavigation page --------------------------------------------*/    
/*--------------------------------------------------------------------*/


function transferToSneakerPage( _ID){
    window.location = "sneaker.html?id=" + _ID;
    
}

function transferToSneakerCollection(_properties, _value){
    window.location ="sneaker_collection.html?properties="+_properties+ "&value="+_value;
}




/*--------------------------------------------------------------------*/    
/*----------------------     recent visited --------------------------------------------*/    
/*--------------------------------------------------------------------*/
function addToRecentvisited(_ID){
    console.log(_ID);
    let _recent = localStorage.getItem("recentVisited");
    if(_recent === null){
        _recent = new Array();
        _recent.unshift(_ID);
    }
    else{
        _recent = JSON.parse( localStorage.getItem("recentVisited"));
        //if ID is not added before
        if(!_recent.includes(_ID)){
            //if number of item visited less than 10
            if(_recent.length<12){
                _recent.unshift(_ID);
            }
            else{
                _recent.pop();
                _recent.unshift(_ID);
            }
        }
    }
            localStorage.setItem("recentVisited", JSON.stringify(_recent));

    let _recents = JSON.parse( localStorage.getItem("recentVisited"));
    
    //displaying recent visited block
    loadRecentVisited();

    console.log(_recents);
}


let recent_visited_index;
function loadRecentVisited(){
    let _recent = localStorage.getItem("recentVisited");
    let _items = JSON.parse(_recent);
    _items.shift();
    

    if(_recent === null){
        $($(".recent-visited")[0]).hide();
    }
    else{
        
        if(_items.length ==0){
            $($(".recent-visited")[0]).hide();
        }
        else{
            $($(".recent-visited")[0]).show();
            $("#recent-visited-items").text("");
            if(_items.length <= 4){
                $("#recent-prev").hide();
                $("#recent-next").hide();
                featuredProducts("#recent-visited-items", "col-4", _items);
            }
            else{
                featuredProducts("#recent-visited-items", "col-4", _items.slice(0, 4));
                recent_visited_index =0;

            }
        }
    }
        
}


function rcentVisitedNext(){
    let _recent = localStorage.getItem("recentVisited");
    let _items = JSON.parse(_recent);
    
    let _recentPageNumbers = parseInt(_items.length/4);
    if(recent_visited_index < _recentPageNumbers-1){
        recent_visited_index++;
        $("#recent-visited-items").text("");
        let _start = (recent_visited_index * 4) +1;
        featuredProducts("#recent-visited-items", "col-4", _items.slice(_start, _start + 4));
        
    }
    console.log("Clicked");
    console.log();
    
    
}

function rcentVisitedPrev(){
    let _recent = localStorage.getItem("recentVisited");
    let _items = JSON.parse(_recent);
    
    let _recentPageNumbers = parseInt(_items.length/4);
    if(recent_visited_index > 0){
        recent_visited_index--;
        $("#recent-visited-items").text("");
        let _start = (recent_visited_index * 4)+1;
        featuredProducts("#recent-visited-items", "col-4", _items.slice(_start, _start + 4));
        
    }  
}



/*--------------------------------------------------------------------*/    
/*----------------------     Message --------------------------------------------*/    
/*--------------------------------------------------------------------*/
//type value can be only "successful" or "warning"

function displayMessage(_type, _heading, _text){
    let _message = document.createElement("div");
    $(_message).addClass("message");
    
    let _message_box = document.createElement("div");
    $(_message_box).addClass("message-box");
    
    ///logo
    let _message_logo = document.createElement("img");
    console.log(_type)
    if(_type === "successful"){
        $(_message_logo).attr("src", "image/logo/4dbd9935-35af-491c-99a7-968af1853e4f_200x200.png" );
    }
    else{
        $(_message_logo).attr("src", "image/logo/fac99648-5208-4424-b213-88669673602f_200x200.png" );
    }
    _message_box.append(_message_logo);
    
    
    ///message box details
    let _message_box_details = document.createElement("div");
    $(_message_box_details).addClass("message-box-details");
    
    if(_type === "successful"){
        $(_message_box_details).css("background-color", "var(--main-color-red)" );
    }
    //Message box -heading
    let _close_message = document.createElement("div");
    $(_close_message).addClass("close-message");
    
    //////////Message-heading
    let _message_heading = document.createElement("div");
    $(_message_heading).addClass("message-heading");
    _message_heading.append(_heading);
    _close_message.append(_message_heading);
    
    ///////close icon
    let _close_icon = document.createElement("i");
    $(_close_icon).addClass("fa");
    $(_close_icon).addClass("fa-window-close");
    $(_close_icon).attr("onclick", "closeMessage()");

    _close_message.append(_close_icon);
        _message_box_details.append(_close_message);

    
    
    ///text-message 
    let _text_message = document.createElement("div");
    $(_text_message).addClass("text-message");
    _text_message.append(_text);
    _message_box_details.append(_text_message);
    
    
    ///button
    let _div = document.createElement("div");
     let _button = document.createElement("button");
    $(_button).attr("onclick", "closeMessage()");
    _button.append("OK");
    _div.append(_button);
    
    _message_box_details.append(_div);
    
    
    
    
    _message_box.append(_message_box_details);
    
    _message.append(_message_box);
    
    $('body').append(_message);
    
    
    if(_type === "successful"){
         setTimeout(()=>{
            //$(_close_message).css("display", "flex");
            $(_text_message).css("display", "flex");
            $(_text_message).css("flex-grow", "0");
            $(_text_message).css("justify-content", "center");
            $(_text_message).css("color", "var(--main-color-blue)");
             $(_message_box_details).css("animation-name", "shirnk_width");
            $(_message_box_details).css("animation-delay", "5s");
             
             setTimeout(()=>{
                 $(_text_message).css("display", "none");


             },5000)             
             setTimeout(()=>{
                    $($(".message")[0]).remove();

             },6500)

            

          //  $(_div).css("display", "flex");

        },2000)
    }else{
        setTimeout(()=>{
            $(_close_message).css("display", "flex");
            $(_text_message).css("display", "flex");
            $(_div).css("display", "flex");

            
        },2000)
         
    }
  
    
    
}


function closeMessage(){
    
     let _message_box_details = $($(".message-box-details")[0]);
        $(_message_box_details).text("");
        $(_message_box_details).css("animation-name", "shirnk_width");

    setTimeout(()=>{
            $($(".message")[0]).remove();

    }, 1500)
    
}




/*--------------------------------------------------------------------*/    
/*----------------------     Shopping-cart --------------------------------------------*/    
/*--------------------------------------------------------------------*/

function sneaker_item(_ID, _name, _style, _sizeNumber, _price, _quantity, _image){
    this.ID = _ID;
    this.NAME = _name;
    this.STYLE = _style;
    this.SIZENUMBER = _sizeNumber;
    this.PRICE = _price;
    this.QUANTITY = _quantity;
    this.IMAGE = _image;
}

function cart_add(_id){
    
    let cart_item = JSON.parse(localStorage.getItem("sneaker_world_cart"));
    if(cart_item === null){
        cart_item = new Array();
        let _selected_sneaker = data["sneaker"][_id];
        let _item = new sneaker_item(_id, _selected_sneaker["name"], _selected_sneaker["style"], selected_sneaker_size, _selected_sneaker["price"], 1, _selected_sneaker["pictures"][0]);
        cart_item.unshift(_item); 
       
    }
    else{
        let isExisted = false;
        for(let i =0; i<cart_item.length; i++){
            if(cart_item[i].ID === _id && cart_item[i].SIZENUMBER === selected_sneaker_size){
                isExisted = true;
                cart_item[i].QUANTITY = cart_item[i].QUANTITY + 1;
                break;
            }
        }
        
        if( !isExisted){
            let _selected_sneaker = data["sneaker"][_id];
        let _item = new sneaker_item(_id, _selected_sneaker["name"], _selected_sneaker["style"], selected_sneaker_size, _selected_sneaker["price"], 1, _selected_sneaker["pictures"][0]);
        cart_item.unshift(_item); 
        }
        
    }
    
    localStorage.setItem("sneaker_world_cart", JSON.stringify(cart_item));
}

function cartItem_delete(_ID, _SIZE){
    let cart_item = JSON.parse(localStorage.getItem("sneaker_world_cart"));
    
    if(cart_item !== null){
        for(let i =0; i<cart_item.length; i++){
            if(cart_item[i].ID === _ID && cart_item[i].SIZENUMBER === _SIZE ){
                cart_item.splice(i, 1);
                let _div_ID ="#" +_ID + _SIZE;
                $(_div_ID).remove();
            }
        }
        localStorage.setItem("sneaker_world_cart", JSON.stringify(cart_item));
        loadCart();

    }

}


function cartItem_Increase(_ID, _SIZE){
    let cart_item = JSON.parse(localStorage.getItem("sneaker_world_cart"));
    
    if(cart_item !== null){
        for(let i =0; i<cart_item.length; i++){
            if(cart_item[i].ID === _ID && cart_item[i].SIZENUMBER === _SIZE ){
                cart_item[i].QUANTITY += 1;
            }
        }
        localStorage.setItem("sneaker_world_cart", JSON.stringify(cart_item));
        loadCart();

    }

}

function cartItem_Decrease(_ID, _SIZE){
    let cart_item = JSON.parse(localStorage.getItem("sneaker_world_cart"));
    
    if(cart_item !== null){
        for(let i =0; i<cart_item.length; i++){
            if(cart_item[i].ID === _ID && cart_item[i].SIZENUMBER === _SIZE ){
                if(cart_item[i].QUANTITY > 0){
                    cart_item[i].QUANTITY -= 1;
                }
            }
        }
        localStorage.setItem("sneaker_world_cart", JSON.stringify(cart_item));
        loadCart();

    }

}


function createCartItem(_obj){
    
    let _item = document.createElement("div");
    let _item_ID = _obj.ID + _obj.SIZENUMBER;
    $(_item).addClass("item");
    $(_item).attr("id", _item_ID);
    let _img = document.createElement("img");
    $(_img).attr("src", _obj.IMAGE);
    _item.append(_img);
    
    let _item_details = document.createElement("div");
    $(_item_details).addClass("item-details");

    ///delete item 
    let _delete_item = document.createElement("div")
    $(_delete_item).addClass("delete-item");
    let _close_i = document.createElement("i");
    $(_close_i).addClass("fa");
    $(_close_i).addClass("fa-window-close");
    $(_close_i).attr("onclick", "cartItem_delete('" +_obj.ID +"',"+ _obj.SIZENUMBER+")");
    _delete_item.append(_close_i);
    _item_details.append(_delete_item);
    
    ////column-1
    let _column = document.createElement("div");
    $(_column).addClass("column");
    /////////////////row-1
    let _row = document.createElement("div");
    $(_row).addClass("row");
    let _label = document.createElement("div");
    $(_label).addClass("label");
    _label.append("Name");
    _row.append(_label);
    
    let _data = document.createElement("div");
    $(_data).addClass("data");
    _data.append(_obj.NAME);
    _row.append(_data);
    _column.append(_row);
    /////////////////row-2
     _row = document.createElement("div");
    $(_row).addClass("row");
    _label = document.createElement("div");
    $(_label).addClass("label");
    _label.append("Style");
    _row.append(_label);
    
     _data = document.createElement("div");
    $(_data).addClass("data");
    _data.append(_obj.STYLE);
    _row.append(_data);
    _column.append(_row);   
    
    /////////////////row-3
    _row = document.createElement("div");
    $(_row).addClass("row");
    _label = document.createElement("div");
    $(_label).addClass("label");
    _label.append("Size");
    _row.append(_label);
    
     _data = document.createElement("div");
    $(_data).addClass("data");
    _data.append(_obj.SIZENUMBER);
    _row.append(_data);
    _column.append(_row);  
    
    /////////////////row-4
    _row = document.createElement("div");
    $(_row).addClass("row");
    let view_product = document.createElement("div");
    $(view_product).addClass("view-product");
    $(view_product).attr("onclick", "transferToSneakerPage('" + _obj.ID + "')");
    view_product.append("View");
    _row.append(view_product);
    _column.append(_row);
    _item_details.append(_column);
    
    
    ////////Column-2
    _column = document.createElement("div");
    $(_column).addClass("column");
    _row = document.createElement("div");
    $(_row).addClass("row");
    let _price = document.createElement("div");
    $(_price).addClass("price");
    _price.append(_obj.PRICE);
    _row.append(_price);
    _column.append(_row);
    _item_details.append(_column);  
    
    ////////Column-3
    _column = document.createElement("div");
    $(_column).addClass("column");
    _row = document.createElement("div");
    $(_row).addClass("row");
    
    let i_increase = document.createElement("i");
    $(i_increase).addClass("fa");
    $(i_increase).addClass("fa-plus-square");
    $(i_increase).attr("onclick", "cartItem_Increase('" +_obj.ID +"',"+ _obj.SIZENUMBER+")");

    _row.append(i_increase);  
    
    let _quantity = document.createElement("div");
    $(_quantity).addClass("cart-item-quantity");
    _quantity.append(_obj.QUANTITY);
    _row.append(_quantity);
    
    let i_decrease = document.createElement("i");
    $(i_decrease).addClass("fa");
    $(i_decrease).addClass("fa-minus-square");
    $(i_decrease).attr("onclick", "cartItem_Decrease('" +_obj.ID +"',"+ _obj.SIZENUMBER+")");

    _row.append(i_decrease);
    
    _column.append(_row);
    _item_details.append(_column);
    
    
    ////column-4
    _column = document.createElement("div");
    $(_column).addClass("column");
    _row = document.createElement("div");
    $(_row).addClass("row");
    
    _label = document.createElement("div");
    $(_label).addClass("label");
    _label.append("Subtotal");
    _row.append(_label);
    
    _price = document.createElement("div");
    $(_price).addClass("price");
    _price.append((_obj.QUANTITY * _obj.PRICE).toFixed(2));
    _row.append(_price);
    
    _column.append(_row);
    _item_details.append(_column);
    
    
    _item.append(_item_details);
    
    return _item;
    
    
}

function loadCart(){
    let _cart = $($(".cart-items")[0]);
    let _div_total_item = $("#total-item");
    let _div_total_quantity = $("#total-quantity");
    let _div_total_price = $("#total-price");
    
    $(_cart).text("");
    $(_div_total_item).text("0");
    $(_div_total_quantity).text("0");
    $(_div_total_price).text("0.00");

    let cart_item = JSON.parse(localStorage.getItem("sneaker_world_cart"));
    
     let _div = document.createElement("div");
        $(_div).addClass("warning-text");
        _div.append("You have not added any item in Shopping Cart.");
    
    if(cart_item === null){
       
        _cart.append(_div);
    }
    else{
        if(cart_item.length === 0){
            _cart.append(_div);

        }
        else{
            
            let _total_item = cart_item.length;
            let _total_quantity =0;
            let _total_price =0;
            for(let i =0; i< cart_item.length; i++){
                _cart.append(createCartItem(cart_item[i]));
                _total_quantity += cart_item[i].QUANTITY;
                _total_price += cart_item[i].QUANTITY * cart_item[i].PRICE;
            }
            
            $(_div_total_item).text(_total_item);
            $(_div_total_quantity).text(_total_quantity);
            $(_div_total_price).text(_total_price.toFixed(2));
        }
        
        
    }
    
}

function cart_check_out(){
    let cart_item = JSON.parse(localStorage.getItem("sneaker_world_cart"));
    if(cart_item === null || cart_item.length === 0){
        displayMessage("warning", "Empty Cart", "There is no item in the cart.")
    }
    else{
        localStorage.setItem("sneaker_world_cart", JSON.stringify(null));
        displayMessage("successful", "Placed order", "Your order has been placed successfully.")
        loadCart();
    }
    

}


/*--------------------------------------------------------------------*/    
/*----------------------     saved-item --------------------------------------------*/    
/*--------------------------------------------------------------------*/


function saved_item_add(_id){
    
    let saved_item = JSON.parse(localStorage.getItem("sneaker_world_saved_item"));
    if(saved_item === null){
        saved_item = new Array();
        saved_item.push(_id); 
        displayMessage("successful", "Saved Item", "Your selected sneaker has been saved successfully");

       
    }
    else{
        let isExisted = false;
        for(let i =0; i<saved_item.length; i++){
            if(saved_item[i] === _id){
                isExisted = true;
                displayMessage("waring", "Saved Item", "Your selected sneaker is already saved.")
            }
        }
        
        if( !isExisted){
            saved_item.unshift(_id); 
            $("#saved-sneaker").addClass("saved");
            displayMessage("successful", "Saved Item", "Your selected sneaker has been saved successfully");
        }
        
    }
    
    localStorage.setItem("sneaker_world_saved_item", JSON.stringify(saved_item));
}





/*--------------------------------------------------------------------*/    
/*----------------------     stores --------------------------------------------*/    
/*--------------------------------------------------------------------*/

function loadStore(){
    let _shop = $($(".shop")[0])
    _shop.text("");
    
    let _stores = data["store"];
    
    for(var i in _stores){
        let _div_address = document.createElement("div");
        $(_div_address).addClass("address");
        let _div_name = document.createElement("div");
        $(_div_name).addClass("name");
        _div_name.append(_stores[i]["storeName"]);
        _div_address.append(_div_name);
        
        let _div_shopNumber = document.createElement("div");
        $(_div_shopNumber).addClass("shopNumber");
        _div_shopNumber.append(_stores[i]["shopNumber"]);
        _div_address.append(_div_shopNumber);
        
        let _div_street = document.createElement("div");
        $(_div_street).addClass("street");
        let full_address = _stores[i]["street"] +", "+ _stores[i]["suburb"]+", "+ _stores[i]["city"]+", " + _stores[i]["postCode"] +", "+ _stores[i]["country"]+".";
        _div_street.append(full_address);
        _div_address.append(_div_street);
        
        let _div_phone = document.createElement("div");
        $(_div_phone).addClass("phone");
        let _i_phone = document.createElement("i");
        $(_i_phone).addClass("fa");
        $(_i_phone).addClass("fa-phone");
        _div_phone.append(_i_phone);
        _div_phone.append(_stores[i]["Phone"]);
        _div_address.append(_div_phone);
        
        
        _shop.append(_div_address);
    }
}


function clear_selection(){
    let _address = $(".address");
    for(let i =0; i<_address.length; i++){
        if($(_address[i]).hasClass("selected")){
            $(_address[i]).removeClass("selected");
            
        }
    }
    
    
}
































