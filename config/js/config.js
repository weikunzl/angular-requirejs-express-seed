define(function(){

    var menuList =[
        'deduct',
        'income',
        'invite',
        'inviteUrl',
        'setting',
        'withdrawal'
    ];
	return window.config={
		appName :'flowWarning',
        modules : menuList,
        host:'/config'
	};
});