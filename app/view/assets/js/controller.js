
var myModule = angular.module('myApp', ['ui.router','ngAnimate']);
myModule.controller('userCtrl',function ($scope,$http,$timeout,$location,$rootScope) {

	$scope.domain='/';
	$scope.param=function(arr){
		str="";
		angular.forEach(arr, function(value, key){
			str+=key+'='+value+'&';
		});
		str=str.substring(0,str.length-1);

		return str;
	}
	$scope.creatRoom=function(id1,id2){
		if(id1>id2){
			return id1+'_'+id2;
		}else{
			return id2+'_'+id1;
		}
	}

})

myModule.controller('loginCtrl',function($scope, $http , $state) {
	jquery_common();
	$scope.login={loginId:'',password:''};
	$scope.login_submit=function(){
		$http({
			method: 'POST',
			cache : false,
				url:$scope.domain+"login",
				data:$scope.param($scope.login),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data){
			//console.log(data)
			if(data.status.code==200){
				$state.go('home.talk');
			}
			else
				alert(data.status.msg)
		})
		.error(function(data,header,config,status){
			//window.location.href="not_found.html";
		});
	}
	$scope.login_myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login_submit();
        }
    };
    $scope.regist_myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.regist_submit();
        }
    };
	$scope.regist={name:'',password:'',loginId:''};
	$scope.regist_submit=function(){
		console.log($scope.regist)
		$http({
			method: 'POST',
			cache : false,
				url:$scope.domain+"register",
				data:$scope.param($scope.regist),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data){
			if(data.status.code==200){
				alert(data.status.msg)
				$state.go('login');
			}
			else{
				alert(data.status.msg)
			}
		})
		.error(function(data,header,config,status){
			//window.location.href="not_found.html";
		});
	}	
})

myModule.controller('homeCtrl',function($scope, $http , $state , session) {
	$scope.name=session.name;
	$scope.loginId=session.loginId;	
	$scope.message={};
	if(localStorage.getItem('messages'+session.loginId)){
    	$scope.message=JSON.parse(localStorage.getItem('messages'+session.loginId));
    }
})

myModule.controller('chatCtrl',function($scope, $http , $stateParams, $timeout , session) {
	$scope.friend_name=$stateParams.name;
	$scope.friend_id=$stateParams.id;

	if(localStorage.getItem('messages'+session.loginId)){
		if(JSON.parse(localStorage.getItem('messages'+session.loginId))[$scope.friend_id]){
			$scope.messages=JSON.parse(localStorage.getItem('messages'+session.loginId))[$scope.friend_id];
		}else{
			$scope.messages=[];
		}
	}else{
		$scope.messages=[];
	}
	
    var socket = io();
    $scope.input1='';
    $scope.name=session.name;
    var roomName=$scope.creatRoom($scope.friend_id,session.loginId)
    socket.emit('subscribe', roomName);
    $scope.send=function(){
        // socket.emit('chat message', $scope.input1);
        send_arr={
        	name:$scope.name,
        	msg:$scope.input1
        }
        socket.emit('say to someone', roomName ,send_arr);
        $scope.messages.push(send_arr);
        if(localStorage.getItem('messages'+session.loginId)){
        	var message=JSON.parse(localStorage.getItem('messages'+session.loginId));
	        message[$scope.friend_id]=$scope.messages;
	        localStorage.setItem('messages'+session.loginId,JSON.stringify(message))
        }else{
        	var message={};
	        message[$scope.friend_id]=$scope.messages;
	        localStorage.setItem('messages'+session.loginId,JSON.stringify(message))
        }   

        $scope.input1='';
    }
    // socket.on('chat message', function(msg){
    //     $timeout(function(){
    //         $scope.messages.push(msg);
    //     },1)            
    // });
    socket.on('say to someone', function(msg){
        $timeout(function(){
             $scope.messages.push(msg);
             if(localStorage.getItem('messages'+session.loginId)){
	        	var message=JSON.parse(localStorage.getItem('messages'+session.loginId));
		        message[$scope.friend_id]=$scope.messages;
		        localStorage.setItem('messages'+session.loginId,JSON.stringify(message))
	        }else{
	        	var message={};
		        message[$scope.friend_id]=$scope.messages;
		        localStorage.setItem('messages'+session.loginId,JSON.stringify(message))
	        }
        },1)
    });
    $scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.send();
        }
    };
})

myModule.controller('meCtrl',function($scope, $http , $state) {
	$scope.logout=function(){
		$http({
			method: 'GET',
			cache : false,
			url:$scope.domain+"logout"
		})
		.success(function(data){
			if(data.status.code==200){
				$state.go('login');
			}
		})
		.error(function(data,header,config,status){
			window.location.href="not_found.html";
		});
	}	
})

myModule.controller('addFriendCtrl',function($scope, $http , $state , session) {
	$scope.searchId='';
	$scope.userData=[];
	$scope.search=function(){
		if($scope.searchId!='')
		$http({
			method: 'POST',
			cache : false,
				url:$scope.domain+"searchUser",
				data:$scope.param({id:$scope.searchId}),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data){
			if(data.status.code==200){
				$scope.userData=data.data;
			}
			else{
				alert(data.status.msg)
			}
		})
		.error(function(data,header,config,status){
			//window.location.href="not_found.html";
		});
	}	
	$scope.myKeyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search();
        }
    };
    $scope.add=function(id){
		$http({
			method: 'POST',
			cache : false,
				url:$scope.domain+"addFriend",
				data:$scope.param({id:id}),
				headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		})
		.success(function(data){
			if(data.status.code==200){
				alert(data.status.msg)
			}
			else{
				alert(data.status.msg)
			}
		})
		.error(function(data,header,config,status){
			//window.location.href="not_found.html";
		});
	}
})

myModule.controller('friendCtrl',function($scope, $http , $state) {
	
	$http({
		method: 'GET',
		cache : false,
			url:$scope.domain+"friendList",
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	})
	.success(function(data){
		if(data.status.code==200){
			$scope.friendList=data.data;
		}
		else{
			alert(data.status.msg)
		}
	})
	.error(function(data,header,config,status){
		//window.location.href="not_found.html";
	});
	
	
})

myModule.controller('detailCtrl',function($scope, $http , $state , $stateParams) {
	$scope.detail_name=$stateParams.name;
	$scope.detail_id=$stateParams.id;
})