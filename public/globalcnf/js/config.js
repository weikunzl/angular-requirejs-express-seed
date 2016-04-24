define(function(){

    var menuList =[
        'invite',
        'deduct'
    ];
	return window.config={
		appName :'flowWarning',
        modules : menuList,
        host:'/globalcnf',
        userhost:'/config'
	};
})