myModule.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home/talk');

    $stateProvider
        .state('home', {
            url:'/home',
            views:{
            	'':{
            		templateUrl: 'main/home.html',
		    		controller: 'homeCtrl',
                    resolve: {
                        session:  function($http,$state){
                            return getSession($http,$state)
                        }
                    }
            	},
            	'@home':{
            		templateUrl: 'main/talk.html'
            	}
            }
            
        })
        .state('home.talk', {
            url:'/talk',
            views:{
            	'':{
            		templateUrl: 'main/talk.html',
                    resolve: {
                        session:  function($http,$state){
                            return getSession($http,$state)
                        }
                    }
            	}
            }
	            
        })
        .state('home.friend', {
            url:'/friend',
            views:{
                '':{
                    templateUrl: 'main/friend.html',
                    controller: 'friendCtrl'
                }
                
            }
                
        })
        .state('home.me', {
            url:'/me',
            views:{
            	'':{
            		templateUrl: 'main/me.html',
                    controller: 'meCtrl'
            	}
            	
            }
	            
        })
        .state('login', {
            url:'/login',
            views:{
                '':{
                    templateUrl: 'loginOrRegist/loginOrRegist.html'
                },
                '@login':{
                    templateUrl: 'loginOrRegist/login.html',
                    controller: 'loginCtrl'
                }
            }      
        })
        .state('regist', {
            url:'/regist',
            views:{
                '':{
                    templateUrl: 'loginOrRegist/loginOrRegist.html',
                    controller: 'loginCtrl'
                },
                '@regist':{
                    templateUrl: 'loginOrRegist/regist.html'
                }
            }      
        })
        .state('chat', {
            url:'/chat',
            params:{name:null,id:null},
            views:{
                '':{
                    templateUrl: 'main/chat.html',
                    controller: 'chatCtrl',
                    resolve: {
                        session:  function($http,$state){
                            return getSession($http,$state)
                        }
                    }
                }
            }      
        })
        .state('addFriend', {
            url:'/addFriend',
            views:{
                '':{
                    templateUrl: 'main/addFriend.html',
                    controller: 'addFriendCtrl',
                    resolve: {
                        session:  function($http,$state){
                            return getSession($http,$state)
                        }
                    }
                }
            }      
        })
        .state('detail', {
            url:'/detail',
            params:{name:null,id:null},
            views:{
                '':{
                    templateUrl: 'main/detail.html',
                    controller: 'detailCtrl'
                }
            }      
        })

}]);


function getSession($http,$state){
    return $http({
        method: 'GET',
        cache : false,
        url:"session"
    })
    .success(function(data){
        if(data.name){
        }
        else
            $state.go('login');
    })
    .error(function(data,header,config,status){
        window.location.href="not_found.html";
    }).then(function(res){return res.data});
}
