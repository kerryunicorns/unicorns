/*
 * Function to search twitter based on a term passed and output a list of results on the screen
 * 
 */
function twitterSearch(resultElName,searchTerm,searchNumPerPage,resultType,page,injectPoint){
	// check if the result element exist
	if(!$(resultElName)){
		return false;
	}
	// clear the list
	$(resultElName).empty();
	
	// check if the search term was sent
	if(!searchTerm){
		var aTweet=new Element('li',{'class':'eachResultError',html:'Error - Please enter a search term '});
		aTweet.inject($(resultElName),'top');
		return false;
	}
	// default the tweet injection point to the top of the list
	if(!injectPoint){injectPoint='top';}
	
	// encode the search term and set the other properties
	var qString='http://search.twitter.com/search.json?rpp='+searchNumPerPage+'&page='+page+'&include_entities=false&result_type='+resultType+'&q='+encodeURIComponent(searchTerm);	
	var twitterReq = new Request.JSONP({
										method: 'get',
										secure: false,
										url: qString,
										onSuccess: function(response) {
											readTweets(resultElName,response,injectPoint);
										},
										onFailure: function(responseText){
											var aTweet=new Element('li',{'class':'eachResultError',html:'Failure - cannot retrieve any result from Twitter at this time'});
											aTweet.inject($('results'),'top');
										 }					
								}).send();



	return twitterReq;
}

/*
 * Format the tweets and add them to the results container
 * resultElName = id of the tweet container element
 * response list of tweets
 * injectPoint - where in the container the new search results should appear
 */
function readTweets(resultElName,response,injectPoint){
	if(!response.results){return false;}
	for(var i=0;i<response.results.length;i++){
		// Build up the tweet container with all the tweet details
		var aTweetContainer=new Element('div',{'class':'aTweetContainer floatLeft'});								
		var aTweetAnchor=new Element('a',{'class':'aTweetAnchor','href':response.results[i].profile_image_url});
		var aTweetImg=new Element('img',{'class':'aTweetImg','src':response.results[i].profile_image_url});
		var aTweetUser=new Element('a',{'class':'aTweetUser','href':'https://twitter.com/'+response.results[i].from_user,html:'@'+response.results[i].from_user});
		// format the date
		var theDate=new Date(response.results[i].created_at);
		var displayDate=theDate.getDate()+'/'+theDate.getMonth()+'/'+theDate.getFullYear()+' '+theDate.getHours()+':'+theDate.getMinutes()+':'+theDate.getSeconds();
		var aTweetCreated=new Element('p',{'class':'aTweetCreated',html:' created:'+displayDate});
		var aTweetTxt=new Element('div',{'class':'aTweetTxt',html:response.results[i].text});
		aTweetTxt.inject(aTweetContainer,'top');
		aTweetImg.inject(aTweetAnchor,'top');
		aTweetCreated.inject(aTweetTxt,'bottom');
		aTweetUser.inject(aTweetCreated,'bottom');
		aTweetAnchor.inject(aTweetContainer,'top');
		aTweetContainer.inject($(resultElName),injectPoint);
		
		
	}
	return true;
}